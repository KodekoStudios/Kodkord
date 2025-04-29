import { WebSocket, WebSocketSettings } from "./websocket";
import { type RestSettings, Rest } from "kodkord-native";

export interface ClientSettings {
    socket: Exclude<WebSocketSettings, "events">;
    rest  : RestSettings                        ;
}

export class Client {
    public readonly socket: WebSocket;
    public readonly rest  : Rest     ;

    public constructor({ socket, rest }: ClientSettings) {
        this.socket = new WebSocket(socket);
        this.rest   = new Rest(rest)       ;
    }

    public get events() {
        return this.socket.events;
    }
}