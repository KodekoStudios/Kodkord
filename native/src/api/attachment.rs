use napi::bindgen_prelude::Buffer;

/// Represents a file attachment to be sent via REST API calls in N-API.
///
/// This struct is exposed to JavaScript as an object (`#[napi(object)]`),
/// allowing JS code to pass binary data and metadata seamlessly to Rust.
#[napi(object)]
pub struct Attachment {
    /// The form field name under which this file will be uploaded.
    ///
    /// Typically this is `"file"` or `"files[0]"`, matching Discord's multipart API.
    ///
    /// This string must be a valid ASCII identifier without spaces.
    pub field: String,

    /// The desired filename as it should appear to the end user.
    ///
    /// Must include an extension if the server relies on it to infer MIME type.
    ///
    /// Examples: `"photo.png"`,  `"document.pdf"`.
    pub name: String,

    /// Optional MIME type of the file. If provided, this exact string
    /// will be sent in the multipart header `Content-Type:`.
    ///
    /// Common values:
    /// - `"application/json"`
    /// - `"text/plain"`
    /// - `"image/png"`
    ///
    /// If omitted, the client may fall back to "application/octet-stream".
    #[napi(js_name = "content_type")]
    pub content_type: Option<String>,

    /// Raw file contents as a `Buffer` (`Vec<u8>` under the hood).
    /// This holds the entire binary payload in memory; large files will
    /// allocate accordngily. In JavaScript, you can pass a `Buffer`, `Uint8Array`,
    /// or `ArrayBuffer` here.
    pub data: Buffer,
}

// impl std::fmt::Debug for Attachment {
//     #[rustfmt::skip]
//     fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
//         f.debug_struct("Attachment")
//             .field("content_type", &self.content_type )
//             .field("field"       , &self.field        )
//             .field("name"        , &self.name         )
//             .field("data"        , &self.data.to_vec())
//             .finish()
//     }
// }
