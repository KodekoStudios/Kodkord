# Kodkord

A small, ultra‑fast REST Client for Discord built with Rust using napi‑rs. Exposes a single `Rest` class to JavaScript/TypeScript, with built‑in rate‑limit handling and optional file attachments.

## Installation

```bash
# Using npm
npm install kodkord

# Or with Bun
bun add kodkord
```

## Example

```ts
import { Method, Rest } from "kodkord";

const rest = new Rest({
  authorization: `Bot ${process.env.TOKEN}`,
  user_agent   : "DummyBot/1.0"
});

rest.start_scheduler();

const result = await rest.request({ 
    method: Method.GET,
    route : "/users/@me"
});
console.log(result);

await rest.stop_scheduler(); // this kill the scheduler 
                             // and stops the runtime.
```

## File Attachments

To send a file, include an `attachments` array on your request:

```ts
await rest.request({
    method: Method.POST,
    route : "/channels/123/messages",
    body  : JSON.stringify({
                content: "Here's my avatar",
                embeds: [{
                    image: {
                        url: `attachment://avatar.ong`  // Must be the same as attachmen.name
                    }
                }]
            }),
    attachments: [{
        content_type: "image/png"                  ,
        name        : "avatar.png"                 ,
        field       : "file"                       ,
        data        : await Bun.file("avatar.png")
                            .arrayBuffer()
    }]
});
```

Under the hood it uses `multipart/form-data` and handles Discord’s rate limits for you.

---

## 🛠️ License

MIT © Kodkord Team