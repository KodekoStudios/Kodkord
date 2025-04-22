/// Helper macro to extract a required field from a `JsObject`, returning an error if missing.
///
/// - `$obj`: the `JsObject` to read from.
/// - `$key`: the property name as a string literal.
/// - `$ty`: the expected Rust type implementing `FromNapiValue`.
#[macro_export]
macro_rules! req_field {
    ($obj:expr, $key:literal, $ty:ty) => {
        $obj.get::<&str, $ty>($key)?
            .ok_or_else(|| napi::Error::from_reason(concat!("Missing `", $key, "` field")))
    };
}

/// Helper macro to extract an optional field from a `JsObject`.
///
/// - Returns `Result<Option<$ty>, Error>`.
#[macro_export]
macro_rules! opt_field {
    ($obj:expr, $key:literal, $ty:ty) => {
        $obj.get::<&str, $ty>($key)
    };
}
