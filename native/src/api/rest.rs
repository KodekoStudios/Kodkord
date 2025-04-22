use std::sync::Arc;

use napi::{
    bindgen_prelude::{FromNapiValue, ToNapiValue}, sys::{napi_env, napi_value}, Env, JsObject, NapiRaw, NapiValue, Result
};
use reqwest::{header::{HeaderMap, AUTHORIZATION, USER_AGENT}, Client};

use crate::req_field;

use super::{request::Request, scheduler::Scheduler};

#[rustfmt::skip]
pub struct RestSettings<'a> {
    pub authorization: &'a str,
    pub user_agent   : &'a str,
}

impl<'a> FromNapiValue for RestSettings<'a> {
    #[rustfmt::skip]
    unsafe fn from_napi_value(env: napi_env, value: napi_value) -> Result<Self> {
        let object        = JsObject::from_raw_unchecked(env, value);

        let authorization = req_field!(object, "authorization", &'a str)?;
        let user_agent    = req_field!(object, "user_agent"   , &'a str)?;

        Ok(RestSettings {
            authorization,
            user_agent,
        })
    }
}

impl<'a> ToNapiValue for RestSettings<'a> {
    #[rustfmt::skip]
    unsafe fn to_napi_value(env: napi_env, val: Self) -> napi::Result<napi_value> {
        let mut obj = JsObject::from_raw(env, std::ptr::null_mut())?;

        obj.set_named_property("authorization", val.authorization)?;
        obj.set_named_property("user_agent"   , val.user_agent)?;

        Ok(obj.raw())
    }
}

#[napi]
#[rustfmt::skip]
pub struct Rest{
    scheduler: Arc<Scheduler>,
    client   :     Client    ,
}

#[napi]
impl Rest {
    #[napi(constructor)]
    pub fn new(settings: RestSettings) -> Self {
        Self {
            scheduler: Arc::new(Scheduler::default()),
            client: Client::builder()
                .default_headers({
                    let mut headers = HeaderMap::new();
                    headers.insert(AUTHORIZATION, settings.authorization.parse().unwrap());
                    headers.insert(
                        USER_AGENT, 
                        format!(
                            "{} Kodkord (https://github.com/KodekoStudios/Kodkord/, 1.2.0-unstable)", 
                            settings.user_agent
                        ).trim().parse().unwrap());
                    headers
                })
                .build()
                .expect("This is your fault, kys."),
        }
    }

    #[napi(js_name = "start_scheduler")]
    pub async unsafe fn start_scheduler(&mut self) -> Result<()> {
        self.scheduler.clone().run(&self.client).await
    }

    #[napi(js_name = "stop_scheduler")]
    pub async unsafe fn stop_scheduler(&mut self) {
        self.scheduler.clone().stop().await;
    }

    #[napi]
    pub unsafe fn request(&mut self, env: Env, mut request: Request) -> Result<JsObject> {
        let (deferred, promise) = env.create_deferred()?;
        request.deferred = Some(deferred);

        let scheduler = self.scheduler.clone();
        tokio::spawn(scheduler.schedule(request, 0));

        Ok(promise)
    }
}

