#![feature(stmt_expr_attributes)]
#![feature(str_as_str)]
#![deny(clippy::all)]

use macros::{log_impl, ANSICodes};
use napi::{CallContext, JsObject, Result};

#[macro_use]
extern crate napi_derive;

pub mod api;
pub(crate) mod macros;
pub(crate) mod str;

#[module_exports]
fn init(mut exports: JsObject) -> Result<()> {
    exports.create_named_method("note", note)?;
    exports.create_named_method("echo", echo)?;
    exports.create_named_method("warn", warn)?;
    exports.create_named_method("fail", fail)?;

    Ok(())
}

#[js_function(1000)]
#[rustfmt::skip]
pub fn note(ctx: CallContext) -> Result<()> {
    let mut args = ctx.get_all()
        .drain(0..ctx.length)
        .map(|unk| Ok(unk.coerce_to_string()?.into_utf8()?.into_owned()?))
        .collect::<Result<Vec<String>>>()?;

    log_impl(
        "Note",
        &args.remove(0),
        &args.iter().flat_map(|s| s.split('\n').map(str::to_string).collect::<Vec<String>>())
             .collect::<Vec<String>>(),
        ANSICodes::BgBlue,
        &mut std::io::stdout(),
    );

    Ok(())
}

#[js_function(1000)]
#[rustfmt::skip]
pub fn echo(ctx: CallContext) -> Result<()> {
    let mut args = ctx.get_all()
        .drain(0..ctx.length)
        .map(|unk| Ok(unk.coerce_to_string()?.into_utf8()?.into_owned()?))
        .collect::<Result<Vec<String>>>()?;

    log_impl(
        "Echo",
        &args.remove(0),
        &args.iter().flat_map(|s| s.split('\n').map(str::to_string).collect::<Vec<String>>())
             .collect::<Vec<String>>(),
        ANSICodes::BgMagenta,
        &mut std::io::stdout(),
    );

    Ok(())
}

#[js_function(1000)]
#[rustfmt::skip]
pub fn warn(ctx: CallContext) -> Result<()> {
    let mut args = ctx.get_all()
        .drain(0..ctx.length)
        .map(|unk| Ok(unk.coerce_to_string()?.into_utf8()?.into_owned()?))
        .collect::<Result<Vec<String>>>()?;

    log_impl(
        "Warn",
        &args.remove(0),
        &args.iter().flat_map(|s| s.split('\n').map(str::to_string).collect::<Vec<String>>())
             .collect::<Vec<String>>(),
        ANSICodes::BgYellow,
        &mut std::io::stderr(),
    );

    Ok(())
}

#[js_function(1000)]
#[rustfmt::skip]
pub fn fail(ctx: CallContext) -> Result<()> {
    let mut args = ctx.get_all()
        .drain(0..ctx.length)
        .map(|unk| Ok(unk.coerce_to_string()?.into_utf8()?.into_owned()?))
        .collect::<Result<Vec<String>>>()?;

    log_impl(
        "Fail",
        &args.remove(0),
        &args.iter().flat_map(|s| s.split('\n').map(str::to_string).collect::<Vec<String>>())
             .collect::<Vec<String>>(),
        ANSICodes::BgRed,
        &mut std::io::stderr(),
    );

    Ok(())
}
