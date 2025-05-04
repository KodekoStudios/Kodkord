var { defineProperty: S, getOwnPropertyNames: g, getOwnPropertyDescriptor: z } = Object, k = Object.prototype.hasOwnProperty, r = (t, l, i) => {
  for (let b of g(l))
    if (!k.call(t, b) && b !== "default")
      S(t, b, {
        get: () => l[b],
        enumerable: !0
      });
  if (i) {
    for (let b of g(l))
      if (!k.call(i, b) && b !== "default")
        S(i, b, {
          get: () => l[b],
          enumerable: !0
        });
    return i;
  }
};
var v = /* @__PURE__ */ new WeakMap, F = (t) => {
  var l = v.get(t), i;
  if (l)
    return l;
  if (l = S({}, "__esModule", { value: !0 }), t && typeof t === "object" || typeof t === "function")
    g(t).map((b) => !k.call(l, b) && S(l, b, {
      get: () => t[b],
      enumerable: !(i = z(t, b)) || i.enumerable
    }));
  return v.set(t, l), l;
};
var n = (t, l) => {
  for (var i in l)
    S(t, i, {
      get: l[i],
      enumerable: !0,
      configurable: !0,
      set: (b) => l[i] = () => b
    });
};

// src/index.ts
var u = {};
n(u, {
  WebSocket: () => f,
  WEB_SOCKET_ADDRESS: () => R,
  Client: () => p
});
module.exports = F(u);
r(u, require("kodkord-native"), module.exports);

// src/websocket.ts
var W = {};
n(W, {
  WebSocket: () => f,
  WEB_SOCKET_ADDRESS: () => R
});
var x = require("discord-api-types/v10"), m = require("kodkord-native"), R = `wss://gateway.discord.gg/?v=${x.GatewayVersion}&encoding=json`;

class f {
  settings;
  events;
  inner;
  timer;
  constructor(t) {
    this.settings = t, this.events = /* @__PURE__ */ new Map;
  }
  connect() {
    this.inner = new globalThis.WebSocket(R), this.inner.addEventListener("open", () => {
      m.echo("Web Socket", "Connected to the Discord gateway.", "Sending identify..."), this.identify();
    }), this.inner.addEventListener("close", ({ code: t, wasClean: l }) => {
      if (!l || t !== 1000)
        m.warn("Web Socket", "Connection lost!", "An attempt will be made to reconnect", "Warning: an exponential backoff has not yet been implemented!"), this.disconnect(), this.connect();
    }), this.inner.addEventListener("message", ({ data: t }) => {
      let l = JSON.parse(t);
      switch (l.op) {
        case x.GatewayOpcodes.Dispatch:
          this.events.get(l.t)?.(l.d);
          break;
        case x.GatewayOpcodes.Heartbeat:
          this.heartbeat();
          break;
        case x.GatewayOpcodes.InvalidSession:
          m.warn("Web Socket", "Invalid session.");
          break;
        case x.GatewayOpcodes.Reconnect:
          m.echo("Web Socket", "Reconnecting to the Discord gateway."), this.disconnect(), this.connect();
          break;
        case x.GatewayOpcodes.Hello:
          this.timer = setInterval(this.heartbeat.bind(this), l.d.heartbeat_interval);
          break;
        case x.GatewayOpcodes.HeartbeatAck:
          m.echo("Web Socket", "Received heartbeat acknowledgement.");
          break;
      }
    }), this.inner.addEventListener("error", (t) => {
      m.warn("Web Socket", t.message);
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
      op: x.GatewayOpcodes.Identify,
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
    this.send({ op: x.GatewayOpcodes.Heartbeat, d: Date.now() });
  }
}
// src/client.ts
var q = {};
n(q, {
  Client: () => p
});
var j = require("kodkord-native");

class p {
  socket;
  rest;
  constructor({ socket: t, rest: l }) {
    this.socket = new f(t), this.rest = new j.Rest(l);
  }
  get events() {
    return this.socket.events;
  }
}
