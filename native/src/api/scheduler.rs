use super::{
    bucket::Bucket,
    request::{Request, RequestBuilderExt},
};
use crate::str::interner::INTERNER;
use napi::Result;
use reqwest::{Client, StatusCode};
use rustc_hash::FxHashMap;
use std::sync::Arc;
use tokio::{
    sync::{Mutex, Notify, RwLock},
    time::{sleep_until, Duration, Instant},
};
use tokio_util::time::DelayQueue;

macro_rules! now_as_millis {
    () => {
        std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_millis() as u64
    };
}

macro_rules! header_str {
    ($headers:expr, $key:expr) => {
        $headers.get($key).and_then(|v| v.to_str().ok())
    };
}

#[derive(Default)]
#[rustfmt::skip]
pub struct Scheduler {
    pub buckets: RwLock<FxHashMap<&'static str, Bucket>>      ,
    pub routes : RwLock<FxHashMap<&'static str, &'static str>>,
    pub queue  : Mutex<DelayQueue<Request>>                   ,
    notify     : Arc<Notify>                                  ,
    stop       : Arc<Notify>                                  ,
}

impl Scheduler {
    #[rustfmt::skip]
    pub async fn schedule(self: Arc<Self>, request: Request, delay: u64) {
        self.queue.lock().await.insert(request, Duration::from_millis(delay));
        self.notify.notify_one();
    }

    pub async fn stop(self: Arc<Self>) {
        self.notify.notify_one();
        self.stop.notify_one();
    }

    #[rustfmt::skip]
    pub async fn run(self: Arc<Self>, client: &Client) -> Result<()> {
        loop {
            let maybe_deadline = {
                let dq = self.queue.lock().await;
                dq.peek().map(|key| dq.deadline(&key))
            };

            let sleep_fut = match maybe_deadline {
                Some(when) => sleep_until(when),
                None => sleep_until(Instant::now() + Duration::from_millis(100)),
            };

            tokio::select! {
                _ = self.notify.notified() => continue,
                _ = self.stop.notified()   => break   ,
                _ = sleep_fut              => {}
            }

            let expired = {
                let mut dq = self.queue.lock().await;
                dq.peek().map(|key| dq.remove(&key))
            };

            match expired {
                Some(expired) => {
                    let mut request = expired.into_inner();
                    let now = now_as_millis!();

                    let bucket_key = {
                        let routes = self.routes.read().await;
                        routes.get(request.route.as_str()).cloned().unwrap_or("unknown")
                    };

                    let bucket_id = INTERNER.intern(bucket_key).await;

                    let mut buckets = self.buckets.write().await;
                    let bucket = buckets
                        .entry(bucket_id)
                        .or_insert_with(|| Bucket::new(bucket_id));

                    match bucket.maybe_delay(now) {
                        Some(delay) => {
                            drop(buckets);
                            self.clone().schedule(request, delay).await;
                            continue;
                        }
                        None => {}
                    }

                    drop(buckets);

                    let url     = format!("https://discord.com/api/{}", request.route.as_str());
                    let builder = client.request(request.method.into(), url)
                                        .header_opt("X-Audit-Log-Reason", request.reason.as_str_optional())
                                        .json_opt(request.body.as_str_optional())?;

                    let response = match builder.send().await {
                        Ok(response) => response,
                        Err(_) => {
                            self.clone().schedule(request, now).await;
                            continue;
                        }
                    };

                    let headers = response.headers();

                    let remaining   = header_str!(headers, "X-RateLimit-Remaining");
                    let retry_after = header_str!(headers, "Retry-After")
                        .and_then(|h| h.parse().ok())
                        .unwrap_or(1000);

                    if response.status() == StatusCode::TOO_MANY_REQUESTS {
                        let mut buckets = self.buckets.write().await;

                        buckets.entry(bucket_id)
                            .and_modify(|bucket| {
                                bucket.near_limit = true;
                                bucket.reset_at   = retry_after + now;
                            })
                            .or_insert_with(|| Bucket {
                                near_limit: true,
                                reset_at:   retry_after + now,
                                id:         bucket_id,
                            });
                        drop(buckets);

                        self.clone().schedule(request, retry_after).await;
                        continue;
                    }

                    if let Some(new_bucket_id) = header_str!(headers, "X-RateLimit-Bucket") {
                        if new_bucket_id != bucket_id {
                            let interned   = INTERNER.intern(new_bucket_id).await;
                            let mut routes = self.routes.write().await;
                            routes.insert(INTERNER.intern(request.route.as_str()).await, interned);
                        }
                    }

                    let mut buckets = self.buckets.write().await;
                    let bucket = buckets
                        .entry(bucket_id)
                        .or_insert_with(|| Bucket::new(bucket_id));

                    if matches!(remaining.map(str::trim), Some("0")) {
                        bucket.near_limit = true;
                        bucket.reset_at   = retry_after + now;
                    } else if bucket.near_limit {
                        bucket.near_limit = false;
                    }

                    let deferred = request.deferred.take().expect("deferred always set");

                    let text = match response.text().await {
                        Err(error) => {
                            let _ = deferred.reject(napi::Error::from_reason(error.to_string()));
                            continue;
                        }
                        Ok(text) => text,
                    };

                    let json = if text.trim().is_empty() {
                        serde_json::Value::Null
                    } else {
                        match serde_json::from_str::<serde_json::Value>(&text) {
                            Err(error) => {
                                let _ = deferred.reject(napi::Error::from_reason(error.to_string()));
                                continue;
                            }
                            Ok(value) => value,
                        }
                    };

                    let _ = deferred.resolve(Box::new(move |_| Ok(json)));
                }

                None => continue,
            }
        }

        Ok(())
    }
}
