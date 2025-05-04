import {
    type GatewayDispatchPayload,
    type GatewayDispatchEvents,
    type GatewayReceivePayload,
    type GatewaySendPayload,
    GatewayOpcodes,
    GatewayVersion
} from "discord-api-types/v10";
import { echo, warn } from "kodkord-native";

export const WEB_SOCKET_ADDRESS = `wss://gateway.discord.gg/?v=${GatewayVersion}&encoding=json`;

// @ts-expect-error
export interface Events<Event extends GatewayDispatchEvents | "RAW" = GatewayDispatchEvents | "RAW">
    extends Map<Event, (data: GatewayDispatchPayload) => unknown> {
        set<E extends Event>(event: E, callback: ((
            payload: E extends "RAW"
                ? GatewayReceivePayload
                : Extract<GatewayDispatchPayload, { t: E }>["d"]
        ) => unknown) | undefined): this;

        get<E extends Event>(event: E): ((
            payload: E extends "RAW"
                ? GatewayReceivePayload
                : Extract<GatewayDispatchPayload, { t: E }>["d"]
        ) => unknown) | undefined;
}

export interface WebSocketSettings {
    intents: number;
    token  : string;
    os     : "windows" |
             "macos"   | // Puaj
             "linux"   ; // Correct answer
}

export class WebSocket {
    public readonly settings: WebSocketSettings;
    public readonly events  : Events;
    private inner?: InstanceType<typeof globalThis["WebSocket"]>;
    private timer?: Timer;

    public constructor(settings: WebSocketSettings) {
        this.settings = settings;
        this.events   = new Map();
    }

    public connect(): void {
        this.inner = new globalThis.WebSocket(WEB_SOCKET_ADDRESS);

        this.inner.addEventListener("open", () => {
            echo("Web Socket", "Connected to the Discord gateway.", "Sending identify...");
            this.identify();
        });

        this.inner.addEventListener("close", ({ code, wasClean }) => {
            if (!wasClean || code !== 1000) {
                warn(
                    "Web Socket"                                                   , 
                    "Connection lost!"                                             , 
                    "An attempt will be made to reconnect"                         , 
                    "Warning: an exponential backoff has not yet been implemented!",
                );
                this.disconnect();
                this.connect();
            }
        });

        this.inner.addEventListener("message", ({ data }) => {
            const PAYLOAD: GatewayReceivePayload = JSON.parse(data as string);

            switch (PAYLOAD.op) {
                case GatewayOpcodes.Dispatch:
                    this.events.get(PAYLOAD.t)?.(PAYLOAD.d);
                    break;

                case GatewayOpcodes.Heartbeat:
                    this.heartbeat();
                    break;

                case GatewayOpcodes.InvalidSession:
                    warn("Web Socket", "Invalid session.");
                    break;

                case GatewayOpcodes.Reconnect:
                    echo("Web Socket", "Reconnecting to the Discord gateway.");
                    this.disconnect();
                    this.connect();
                    break;

                case GatewayOpcodes.Hello:
                    this.timer = setInterval(this.heartbeat.bind(this), PAYLOAD.d.heartbeat_interval);
                    break;

                case GatewayOpcodes.HeartbeatAck:
                    echo("Web Socket", "Received heartbeat acknowledgement.");
                    break;
            }
        });

        this.inner.addEventListener("error", (error) => {
            warn("Web Socket", error.message);
        });
    }

    public disconnect(code?: number, reason?: string): void {
        if (this.timer != undefined) clearInterval(this.timer);
        this.inner?.close(code ?? 1000, reason);
        delete this.inner;
        delete this.timer;
    }

    public send(message: GatewaySendPayload): void {
        this.inner?.send(JSON.stringify(message));
    }

    /**
     * Checks if the Web Socket is connected.
     * @returns `true` if the Web Socket is connected, `false` otherwise.
     */
    public connected(): boolean {
        return this.inner?.readyState === globalThis.WebSocket.OPEN;
    }

    /**
     * Checks if the Web Socket is disconnected.
     * @returns `true` if the Web Socket is disconnected, `false` otherwise.
     */
    public disconnected(): boolean {
        return this.inner?.readyState === globalThis.WebSocket.CLOSED;
    }

    public identify(): void {
        this.send({
            op: GatewayOpcodes.Identify,
            d: {
                intents: this.settings.intents,
                token  : this.settings.token,
                properties: {
                    browser: "Kodkord",
                    device : "Kodkord",
                    os     : this.settings.os,
                },
            },
        });
    }

    private heartbeat(): void {
        this.send({ op: GatewayOpcodes.Heartbeat, d: Date.now() });
    }
}