use napi::{
    bindgen_prelude::ToNapiValue, sys::{napi_env, napi_value}, JsObject, NapiRaw, NapiValue, Result
};

/// A rate-limit bucket for the Discord API.
///
/// Tracks whether the bucket is near its rate limit and
/// when it will reset, identified by a unique string `id`.
pub struct Bucket {
    /// `true` if the bucket has reached or is approaching its rate limit.
    pub near_limit: bool,

    /// UNIX timestamp (in milliseconds) indicating when the bucket resets.
    pub reset_at: u64,

    /// Static identifier for this rate-limit bucket.
    pub id: &'static str,
}

impl Bucket {
    /// Constructs a new `Bucket` with default state:
    /// - `near_limit` = `false`
    /// - `reset_at` = `0` (immediately reset)
    /// - `id` set to the provided identifier
    pub fn new(id: &'static str) -> Self {
        Self {
            near_limit: false,
            reset_at: 0,
            id,
        }
    }

    pub fn maybe_delay(&self, now: u64) -> Option<u64> {
        if self.near_limit && now < self.reset_at {
            Some(self.reset_at - now)
        } else {
            None
        }
    }
}

impl ToNapiValue for Bucket {
    #[rustfmt::skip]
    unsafe fn to_napi_value(env: napi_env, bucket: Self) -> Result<napi_value> {
        // Initialize a new empty JavaScript object
        let mut object = JsObject::from_raw(env, std::ptr::null_mut())?;
        
        // Populate the JavaScript object with each field of Bucket
        object.set_named_property("near_limit", bucket.near_limit)?;
        object.set_named_property("reset_at"  , bucket.reset_at  )?;
        object.set_named_property("id"        , bucket.id        )?;

        // Return the underlying napi_value for the object
        Ok(object.raw())
    }
}
