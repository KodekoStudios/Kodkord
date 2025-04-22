#![feature(stmt_expr_attributes)]
#![feature(str_as_str)]
#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

pub(crate) mod macros;
pub mod api;
