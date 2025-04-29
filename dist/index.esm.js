// src/index.ts
export * from "kodkord-native";

// src/websocket.ts
import {
  GatewayOpcodes as n,
  GatewayVersion as o
} from "discord-api-types/v10";
import { echo as i, warn as s } from "kodkord-native";
var r = `wss://gateway.discord.gg/?v=${o}&encoding=json`;

class a {
  settings;
  events;
  inner;
  timer;
  constructor(e) {
    this.settings = e, this.events = /* @__PURE__ */ new Map;
  }
  connect() {
    this.inner = new globalThis.WebSocket(r), this.inner.addEventListener("open", () => {
      i("Web Socket", "Connected to the Discord gateway.", "Sending identify..."), this.identify();
    }), this.inner.addEventListener("close", ({ code: e, wasClean: t }) => {
      if (!t || e !== 1000)
        s("Web Socket", "Connection lost!", "An attempt will be made to reconnect", "Warning: an exponential backoff has not yet been implemented!"), this.disconnect(), this.connect();
    }), this.inner.addEventListener("message", ({ data: e }) => {
      let t = JSON.parse(e);
      switch (t.op) {
        case n.Dispatch:
          this.events.get(t.t)?.(t.d);
          break;
        case n.Heartbeat:
          this.heartbeat();
          break;
        case n.InvalidSession:
          s("Web Socket", "Invalid session.");
          break;
        case n.Reconnect:
          i("Web Socket", "Reconnecting to the Discord gateway."), this.disconnect(), this.connect();
          break;
        case n.Hello:
          this.timer = setInterval(this.heartbeat.bind(this), t.d.heartbeat_interval);
          break;
        case n.HeartbeatAck:
          i("Web Socket", "Received heartbeat acknowledgement.");
          break;
      }
    }), this.inner.addEventListener("error", (e) => {
      s("Web Socket", e.message);
    });
  }
  disconnect(e, t) {
    if (this.timer != null)
      clearInterval(this.timer);
    this.inner?.close(e ?? 1000, t), delete this.inner, delete this.timer;
  }
  send(e) {
    this.inner?.send(JSON.stringify(e));
  }
  identify() {
    this.send({
      op: n.Identify,
      d: {
        intents: this.settings.intents,
        token: this.settings.token,
        properties: {
          browser: "Kodkord",
          device: "Kodkord",
          os: this.settings.os
        }
      }
    });
  }
  heartbeat() {
    this.send({ op: n.Heartbeat, d: Date.now() });
  }
}
// src/client.ts
import { Rest as c } from "kodkord-native";

class d {
  socket;
  rest;
  constructor({ socket: e, rest: t }) {
    this.socket = new a(e), this.rest = new c(t);
  }
  get events() {
    return this.socket.events;
  }
}
export {
  a as WebSocket,
  r as WEB_SOCKET_ADDRESS,
  d as Client
};
