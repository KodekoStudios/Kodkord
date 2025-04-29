var { defineProperty: r, getOwnPropertyNames: l, getOwnPropertyDescriptor: S } = Object, p = Object.prototype.hasOwnProperty, c = (e, t, i) => {
  for (let n of l(t))
    if (!p.call(e, n) && n !== "default")
      r(e, n, {
        get: () => t[n],
        enumerable: !0
      });
  if (i) {
    for (let n of l(t))
      if (!p.call(i, n) && n !== "default")
        r(i, n, {
          get: () => t[n],
          enumerable: !0
        });
    return i;
  }
};
var v = /* @__PURE__ */ new WeakMap, m = (e) => {
  var t = v.get(e), i;
  if (t)
    return t;
  if (t = r({}, "__esModule", { value: !0 }), e && typeof e === "object" || typeof e === "function")
    l(e).map((n) => !p.call(t, n) && r(t, n, {
      get: () => e[n],
      enumerable: !(i = S(e, n)) || i.enumerable
    }));
  return v.set(e, t), t;
};
var h = (e, t) => {
  for (var i in t)
    r(e, i, {
      get: t[i],
      enumerable: !0,
      configurable: !0,
      set: (n) => t[i] = () => n
    });
};

// src/index.ts
var o = {};
h(o, {
  WebSocket: () => d,
  WEB_SOCKET_ADDRESS: () => b,
  Client: () => y
});
module.exports = m(o);
c(o, require("kodkord-native"), module.exports);

// src/websocket.ts
var k = {};
h(k, {
  WebSocket: () => d,
  WEB_SOCKET_ADDRESS: () => b
});
var s = require("discord-api-types/v10"), a = require("kodkord-native"), b = `wss://gateway.discord.gg/?v=${s.GatewayVersion}&encoding=json`;

class d {
  settings;
  events;
  inner;
  timer;
  constructor(e) {
    this.settings = e, this.events = /* @__PURE__ */ new Map;
  }
  connect() {
    this.inner = new globalThis.WebSocket(b), this.inner.addEventListener("open", () => {
      a.echo("Web Socket", "Connected to the Discord gateway.", "Sending identify..."), this.identify();
    }), this.inner.addEventListener("close", ({ code: e, wasClean: t }) => {
      if (!t || e !== 1000)
        a.warn("Web Socket", "Connection lost!", "An attempt will be made to reconnect", "Warning: an exponential backoff has not yet been implemented!"), this.disconnect(), this.connect();
    }), this.inner.addEventListener("message", ({ data: e }) => {
      let t = JSON.parse(e);
      switch (t.op) {
        case s.GatewayOpcodes.Dispatch:
          this.events.get(t.t)?.(t.d);
          break;
        case s.GatewayOpcodes.Heartbeat:
          this.heartbeat();
          break;
        case s.GatewayOpcodes.InvalidSession:
          a.warn("Web Socket", "Invalid session.");
          break;
        case s.GatewayOpcodes.Reconnect:
          a.echo("Web Socket", "Reconnecting to the Discord gateway."), this.disconnect(), this.connect();
          break;
        case s.GatewayOpcodes.Hello:
          this.timer = setInterval(this.heartbeat.bind(this), t.d.heartbeat_interval);
          break;
        case s.GatewayOpcodes.HeartbeatAck:
          a.echo("Web Socket", "Received heartbeat acknowledgement.");
          break;
      }
    }), this.inner.addEventListener("error", (e) => {
      a.warn("Web Socket", e.message);
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
      op: s.GatewayOpcodes.Identify,
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
    this.send({ op: s.GatewayOpcodes.Heartbeat, d: Date.now() });
  }
}
// src/client.ts
var w = {};
h(w, {
  Client: () => y
});
var g = require("kodkord-native");

class y {
  socket;
  rest;
  constructor({ socket: e, rest: t }) {
    this.socket = new d(e), this.rest = new g.Rest(t);
  }
  get events() {
    return this.socket.events;
  }
}
