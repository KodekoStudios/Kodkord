use napi::{
    bindgen_prelude::FromNapiValue,
    sys::{self, napi_env, napi_get_value_string_utf8, napi_value},
    Result,
};

#[rustfmt::skip]
pub enum Str {
    Tiny   { buf: [u8;  16], len: u8 },
    Small  { buf: [u8;  32], len: u8 },
    Medium { buf: [u8;  64], len: u8 },
    Large  { buf: [u8; 128], len: u8 },
    Huge   { buf: [u8; 256], len: u8 },

    // fallbacks
    Heap(Box<str>),
    Empty,
}

#[rustfmt::skip]
impl Str {
    pub fn from_str(s: &str) -> Self {
        let bytes = s.as_bytes();
        let len   = bytes.len() ;

        match len {
            0 => Self::Empty,

            1..=16  => {
                let mut buf = [0u8; 16];
                buf[..len].copy_from_slice(bytes);
                Self::Tiny { buf, len: len as u8 }
            }

            17..=32 => {
                let mut buf = [0u8; 32];
                buf[..len].copy_from_slice(bytes);
                Self::Small { buf, len: len as u8 }
            }

            33..=64 => {
                let mut buf = [0u8; 64];
                buf[..len].copy_from_slice(bytes);
                Self::Medium { buf, len: len as u8 }
            }

            65..=128 => {
                let mut buf = [0u8; 128];
                buf[..len].copy_from_slice(bytes);
                Self::Large { buf, len: len as u8 }
            }

            129..=256 => {
                let mut buf = [0u8; 256];
                buf[..len].copy_from_slice(bytes);
                Self::Huge { buf, len: len as u8 }
            }

            _ => Self::Heap(s.into()),
        }
    }

    #[inline(always)]
    pub fn as_str_optional(&self) -> Option<&str> {
        self.get_utf8_slice()
    }

    #[inline(always)]
    pub fn as_str(&self) -> &str {
        self.get_utf8_slice().unwrap_or("")
    }

    #[inline(always)]
    pub fn is_empty(&self) -> bool {
        matches!(self, Self::Empty)
    }

    fn get_utf8_slice(&self) -> Option<&str> {
           match self {
            Str::Tiny   { buf, len } => std::str::from_utf8(&buf[..*len as usize]).ok(),
            Str::Small  { buf, len } => std::str::from_utf8(&buf[..*len as usize]).ok(),
            Str::Medium { buf, len } => std::str::from_utf8(&buf[..*len as usize]).ok(),
            Str::Large  { buf, len } => std::str::from_utf8(&buf[..*len as usize]).ok(),
            Str::Huge   { buf, len } => std::str::from_utf8(&buf[..*len as usize]).ok(),
            Str::Heap(s) => Some(s.as_ref()),
            Str::Empty   => None,
        }
    }
}

#[rustfmt::skip]
impl FromNapiValue for Str {
    unsafe fn from_napi_value(env: napi_env, value: napi_value) -> Result<Self> {
        let mut str_size: usize = 0;

        let status = napi_get_value_string_utf8(env, value, std::ptr::null_mut(), 0, &mut str_size);
        if status != sys::Status::napi_ok {
            return Err(napi::Error::new(
                napi::Status::from(status),
                "Failed to get string size",
            ));
        }

        let mut static_buf = [0u8; 512];
        let mut dyn_buf    = Vec::new();
        let mut status = 0i32;
        let mut copied = 0;
        let slice = if str_size <= 512 {
            status = napi_get_value_string_utf8(env, value, static_buf.as_mut_ptr() as *mut i8, str_size + 1, &mut copied);
            &static_buf[..copied]
        } else {
            napi_get_value_string_utf8(env, value, dyn_buf.as_mut_ptr() as *mut i8, dyn_buf.len(), &mut copied);
            dyn_buf.truncate(copied);
            dyn_buf.as_slice()
        };

        if status != sys::Status::napi_ok {
            return Err(napi::Error::new(
                napi::Status::from(status),
                "Failed to get string content",
            ));
        }

        let s = std::str::from_utf8(slice).map_err(|_| {
            napi::Error::new(napi::Status::InvalidArg, "Invalid UTF-8 received from napi")
        })?;

        Ok(Str::from_str(s))
    }
}
