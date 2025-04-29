use crate::{opt_field, req_field, str::str::Str};

use super::attachment::Attachment;
use napi::{
    bindgen_prelude::{FromNapiValue, ToNapiValue},
    sys::{napi_env, napi_value},
    Env, JsDeferred, JsObject, NapiRaw, NapiValue, Result,
};
use reqwest::RequestBuilder;
use serde_json::Value;

/// Macro to define the `Method` enum and its conversion to `reqwest::Method`.
///
/// `$v` represents each HTTP method variant (e.g. GET, POST).
///
/// The macro expands to:
/// 1. A `#[napi] pub enum Method { ... }` for JavaScript bindings.
/// 2. An `impl From<Method> for reqwest::Method` mapping each variant.
macro_rules! define_method {
    ($($v:ident),* $(,)?) => {
        #[napi]
        pub enum Method {
            $($v),*
        }

        impl From<Method> for reqwest::Method {
            fn from(m: Method) -> Self {
                match m {
                    $( Method::$v => reqwest::Method::$v ),*
                }
            }
        }
    }
}

define_method!(DELETE, PATCH, POST, GET, PUT);

/// Alias for a deferred promise resolving to `Data` in an async context.
///
/// Wraps a JavaScript `Deferred` with a boxed closure resolver: `FnOnce(Env) -> Result<Data>`.
pub type Deferred<Data> = JsDeferred<Data, Box<dyn FnOnce(Env) -> Result<Data> + Send + 'static>>;

/// Represent
/// 
/// s an in-flight REST request, constructed from JavaScript arguments.
#[rustfmt::skip]
pub struct Request {
    pub method     : Method                 ,
    pub route      : Str                    ,
    pub attachments: Option<Vec<Attachment>>,
    pub deferred   : Option<Deferred<Value>>,
    pub reason     : Str                    ,
    pub query      : Str                    ,
    pub body       : Str                    ,
}

impl FromNapiValue for Request {
    #[rustfmt::skip]
    unsafe fn from_napi_value(env: napi_env, value: napi_value) -> Result<Self> {
        let request     = JsObject::from_raw_unchecked(env, value);

        let attachments = opt_field!(request, "attachments", Vec<Attachment>)?;
        let method      = req_field!(request, "method"     , Method         )?;
        let route       = req_field!(request, "route"      , Str            )?;
        let reason      = opt_field!(request, "reason"     , Str            )?.unwrap_or(Str::Empty);
        let query       = opt_field!(request, "query"      , Str            )?.unwrap_or(Str::Empty);
        let body        = opt_field!(request, "body"       , Str            )?.unwrap_or(Str::Empty);

        Ok(Request {
            method,
            route,
            attachments,
            deferred: None,
            reason,
            query,
            body,
        })
    }
}

impl ToNapiValue for Request {
    #[rustfmt::skip]
    unsafe fn to_napi_value(env: napi_env, request: Self) -> Result<napi_value> {
        let mut object = JsObject::from_raw(env, std::ptr::null_mut())?;

        object.set_named_property("method"     , request.method         )?;
        object.set_named_property("route"      , request.route .as_str())?;
        object.set_named_property("attachments", request.attachments    )?;
        object.set_named_property("reason"     , request.reason.as_str())?;
        object.set_named_property("query"      , request.query .as_str())?;
        object.set_named_property("body"       , request.body  .as_str())?;

        Ok(object.raw())
    }
}

pub trait RequestBuilderExt
where
    Self: Sized,
{
    fn header_opt(self, name: &str, val: Option<&str>) -> Self;
    fn json_opt(self, body: Option<&str>) -> Result<Self>;
}

impl RequestBuilderExt for RequestBuilder {
    fn header_opt(self, name: &str, val: Option<&str>) -> Self {
        match val {
            Some(v) => self.header(name, v),
            None => self,
        }
    }

    fn json_opt(self, body: Option<&str>) -> Result<Self> {
        match body {
            Some(s) => {
                let v: Value =
                    serde_json::from_str(s).map_err(|e| napi::Error::from_reason(e.to_string()))?;
                Ok(self.json(&v))
            }
            None => Ok(self),
        }
    }
}

// impl std::fmt::Debug for Request {
//     #[rustfmt::skip]
//     fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
//         f.debug_struct("Request")
//             .field("version"    , &self.version                      )
//             .field("method"     , &reqwest::Method::from(self.method))
//             .field("route"      , &self.route                        )
//             .field("attachments", &self.attachments                  )
//             .field("reason"     , &self.reason                       )
//             .field("query"      , &self.query                        )
//             .field("body"       , &self.body                         )
//             .finish()
//     }
// }
