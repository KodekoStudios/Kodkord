/* tslint:disable */
/* eslint-disable */

/* Editing this by hand is horrible... */
/* - Kaffee                            */

/**
 * Represents a file attachment to be sent via REST API calls.
 *
 * This struct is exposed to JavaScript as an object (`#[napi(object)]`),
 * allowing JavaScript code to pass binary data and metadata seamlessly to Rust.
 */
export interface Attachment {
  /**
   * The form field name under which this file will be uploaded.
   *
   * Typically this is `"file"` or `"files[0]"`, matching Discord's multipart API.
   *
   * This string must be a valid ASCII identifier without spaces.
   */
  field: string;

  /**
   * The desired filename as it should appear to the end user.
   *
   * Must include an extension if the server relies on it to infer MIME type.
   *
   * Examples: `"photo.png"`,  `"document.pdf"`.
   */
  name: string;

  /**
   * Optional MIME type of the file. If provided, this exact string
   * will be sent in the multipart header `Content-Type:`.
   *
   * Common values:
   * - `"application/json"`
   * - `"text/plain"`
   * - `"image/png"`
   *
   * If omitted, the client may fall back to "application/octet-stream".
   */

  content_type?: string;

  /**
   * Raw file contents as a `Buffer` (`Vec<u8>` under the hood).
   * This holds the entire binary payload in memory; large files will
   * allocate accordngily. In JavaScript, you can pass a `Buffer`, `Uint8Array`,
   * or `ArrayBuffer` here.
   */
  data: Buffer;
}

export const enum Method {
  DELETE = 0,
  PATCH  = 1,
  POST   = 2,
  GET    = 3,
  PUT    = 4
}

export interface Request {
  version?: number;
  method  : Method;
  route   : string;
  reason ?: string;
  query  ?: string;
  body   ?: string;
}

export interface RestSettings {
  authorization: string,
  user_agent   : string,
}

export interface Bucket {
  nearl_limit: boolean;
  reset_at   : bigint ;
  id         : string ;
}

export declare class Rest {
  /**
   * Create a new Rest client.
   * 
   * @param settings.authorization — Your Bearer/Bot token header
   * @param settings.user_agent    — Custom User‑Agent header
   */
  public constructor(settings: RestSettings): Rest;

  /**
   * Schedule a Rest request.
   * 
   * Returns a Promise that resolves with deserialized JSON.
   */
  public request<T = unknown>(request: Request): Promise<T>

  /**
   * Start the internal rate‑limit scheduler.
   * You can fire off `request()` calls without awaiting,
   * then await this to drain or shut down.
   */
  public start_scheduler(): Promise<void>

  /** Stop the scheduler but don't clean up. */
  public stop_scheduler() : Promise<void>
}
