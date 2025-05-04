// src/index.ts
export * from "kodkord-native";

// src/websocket.ts
import {
  GatewayOpcodes as b,
  GatewayVersion as u
} from "discord-api-types/v10";
import { echo as i, warn as x } from "kodkord-native";
var S = `wss://gateway.discord.gg/?v=${u}&encoding=json`;

class m {
  settings;
  events;
  inner;
  timer;
  constructor(t) {
    this.settings = t, this.events = /* @__PURE__ */ new Map;
  }
  connect() {
    this.inner = new globalThis.WebSocket(S), this.inner.addEventListener("open", () => {
      i("Web Socket", "Connected to the Discord gateway.", "Sending identify..."), this.identify();
    }), this.inner.addEventListener("close", ({ code: t, wasClean: l }) => {
      if (!l || t !== 1000)
        x("Web Socket", "Connection lost!", "An attempt will be made to reconnect", "Warning: an exponential backoff has not yet been implemented!"), this.disconnect(), this.connect();
    }), this.inner.addEventListener("message", ({ data: t }) => {
      let l = JSON.parse(t);
      switch (l.op) {
        case b.Dispatch:
          this.events.get(l.t)?.(l.d);
          break;
        case b.Heartbeat:
          this.heartbeat();
          break;
        case b.InvalidSession:
          x("Web Socket", "Invalid session.");
          break;
        case b.Reconnect:
          i("Web Socket", "Reconnecting to the Discord gateway."), this.disconnect(), this.connect();
          break;
        case b.Hello:
          this.timer = setInterval(this.heartbeat.bind(this), l.d.heartbeat_interval);
          break;
        case b.HeartbeatAck:
          i("Web Socket", "Received heartbeat acknowledgement.");
          break;
      }
    }), this.inner.addEventListener("error", (t) => {
      x("Web Socket", t.message);
    });
  }
  disconnect(t, l) {
    if (this.timer != null)
      clearInterval(this.timer);
    this.inner?.close(t ?? 1000, l), delete this.inner, delete this.timer;
  }
  send(t) {
    this.inner?.send(JSON.stringify(t));
  }
  connected() {
    return this.inner?.readyState === globalThis.WebSocket.OPEN;
  }
  disconnected() {
    return this.inner?.readyState === globalThis.WebSocket.CLOSED;
  }
  identify() {
    this.send({
      op: b.Identify,
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
    this.send({ op: b.Heartbeat, d: Date.now() });
  }
}
// src/client.ts
import { Rest as r } from "kodkord-native";

class f {
  socket;
  rest;
  constructor({ socket: t, rest: l }) {
    this.socket = new m(t), this.rest = new r(l);
  }
  get events() {
    return this.socket.events;
  }
}
export {
  m as WebSocket,
  S as WEB_SOCKET_ADDRESS,
  f as Client
};
