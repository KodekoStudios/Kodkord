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

#[rustfmt::skip]
pub enum ANSICodes {
	Reset     = 0,
	Bold      = 1,
    Dim       = 2,
	BgRed     = 41,
	BgYellow  = 43,
	BgBlue    = 44,
	BgMagenta = 45,
}

#[inline(always)]
#[rustfmt::skip]
pub const fn ansi(code: ANSICodes) -> &'static str {
    match code {
        ANSICodes::Reset     => "\x1b[0m",
        ANSICodes::Bold      => "\x1b[1m",
        ANSICodes::Dim       => "\x1b[2m",
        ANSICodes::BgRed     => "\x1b[41m",
        ANSICodes::BgYellow  => "\x1b[43m",
        ANSICodes::BgBlue    => "\x1b[44m",
        ANSICodes::BgMagenta => "\x1b[45m",
    }
}

#[rustfmt::skip]
pub fn log_impl(
    level       : &str,
    header      : &str,
    lines       : &[String],
    header_color: ANSICodes,
    out         : &mut dyn std::io::Write,
) {
    let time  = chrono::Local::now().format("%d/%m/%y %H:%M:%S.%3f").to_string();

    let reset = ansi(ANSICodes::Reset);
    let bold  = ansi(ANSICodes::Bold );
    let dim   = ansi(ANSICodes::Dim  );
    let hdr   = ansi(header_color    );

    let head  = format!("{hdr} Kodkord {reset}  {hdr} {level} {reset}  {bold}{header}{reset}");
    
    let width: usize = std::env::var("COLUMNS").ok().and_then(|s| s.parse().ok()).unwrap_or(80);
    let sep = "-".repeat(
        width.saturating_sub(head.len() - 24)
             .saturating_sub(time.len())
    );

    writeln!(out, "\n{head}  {dim}{sep}  {time}{reset}").ok();

    for line in lines {
        writeln!(out, "{dim}   {line}{reset}").ok();
    }

    out.flush().ok();
}

#[macro_export]
macro_rules! note {
    ($hdr:expr $(, $m:expr)* $(,)?) => {{
        let mut msgs = Vec::new();
        $(
            msgs.push($m.to_string());
        )*
        $crate::log_impl(
            "Note",
            $hdr,
            &msgs,
            $crate::ANSICodes::BgBlue,
            &mut std::io::stdout(),
        );
    }};
}

#[macro_export]
macro_rules! echo {
    ($hdr:expr $(, $m:expr)* $(,)?) => {{
        let mut msgs = Vec::new();
        $(
            msgs.push($m.to_string());
        )*
        $crate::log_impl(
            "Echo",
            $hdr,
            &msgs,
            $crate::ANSICodes::BgMagenta,
            &mut std::io::stdout(),
        );
    }};
}

#[macro_export]
macro_rules! warn {
    ($hdr:expr $(, $m:expr)* $(,)?) => {{
        let mut msgs = Vec::new();
        $(
            msgs.push($m.to_string());
        )*
        $crate::log_impl(
            "Warn",
            $hdr,
            &msgs,
            $crate::ANSICodes::BgYellow,
            &mut std::io::stderr(),
        );
    }};
}

#[macro_export]
macro_rules! fail {
    ($hdr:expr $(, $m:expr)* $(,)?) => {{
        let mut msgs = Vec::new();
        $(
            msgs.push($m.to_string());
        )*
        $crate::log_impl(
            "Fail",
            $hdr,
            &msgs,
            $crate::ANSICodes::BgRed,
            &mut std::io::stderr(),
        );
    }};
}
