import { RestSettings, Rest } from 'kodkord-native';
export * from 'kodkord-native';
import * as discord_api_types_v10 from 'discord-api-types/v10';
import { GatewayDispatchEvents, GatewayDispatchPayload, GatewayReceivePayload, GatewaySendPayload } from 'discord-api-types/v10';

declare const WEB_SOCKET_ADDRESS = "wss://gateway.discord.gg/?v=10&encoding=json";
interface Events<Event extends GatewayDispatchEvents | "RAW" = GatewayDispatchEvents | "RAW"> extends Map<Event, (data: GatewayDispatchPayload) => unknown> {
    set<E extends Event>(event: E, callback: ((payload: E extends "RAW" ? GatewayReceivePayload : Extract<GatewayDispatchPayload, {
        t: E;
    }>["d"]) => unknown) | undefined): this;
    get<E extends Event>(event: E): ((payload: E extends "RAW" ? GatewayReceivePayload : Extract<GatewayDispatchPayload, {
        t: E;
    }>["d"]) => unknown) | undefined;
}
interface WebSocketSettings {
    intents: number;
    token: string;
    os: "windows" | "macos" | // Puaj
    "linux";
}
declare class WebSocket {
    readonly settings: WebSocketSettings;
    readonly events: Events;
    private inner?;
    private timer?;
    constructor(settings: WebSocketSettings);
    connect(): void;
    disconnect(code?: number, reason?: string): void;
    send(message: GatewaySendPayload): void;
    private identify;
    private heartbeat;
}

interface ClientSettings {
    socket: Exclude<WebSocketSettings, "events">;
    rest: RestSettings;
}
declare class Client {
    readonly socket: WebSocket;
    readonly rest: Rest;
    constructor({ socket, rest }: ClientSettings);
    get events(): Events<discord_api_types_v10.GatewayDispatchEvents | "RAW">;
}

export { Client, WEB_SOCKET_ADDRESS, WebSocket };
export type { ClientSettings, Events, WebSocketSettings };
