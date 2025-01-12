import { Trace, Warn } from "@common/log";
import type { Events } from "@core/client";
import { GatewayOpcodes, type GatewayReceivePayload, GatewayVersion } from "discord-api-types/v10";
import WS from "ws";

export const WEB_SOCKET_ADDRESS = `wss://gateway.discord.gg/?v=${GatewayVersion}&encoding=json`;

export interface WebSocketSettings {
	token: string;
	intents: number;
	device: string;
	os: "windows" | "linux" | "macos";
	events: Events;
}

export class WebSocket {
	// biome-ignore lint/correctness/noUndeclaredVariables: Timer is a Bun type.
	private heartbeatInterval?: Timer;
	private ws?: WS;

	public readonly settings: WebSocketSettings;

	public constructor(settings: WebSocketSettings) {
		this.settings = settings;
	}

	public connect(): void {
		this.ws = new WS(WEB_SOCKET_ADDRESS);

		this.ws.on("open", () => {
			new Trace("Web Socket", "Connected to the Discord gateway.").trace();
			this.identify();
		});

		this.ws.on("message", (data) => {
			const PAYLOAD = JSON.parse(data.toString()) as GatewayReceivePayload;

			switch (PAYLOAD.op) {
				case GatewayOpcodes.Dispatch:
					this.settings.events.get(PAYLOAD.t)?.(PAYLOAD.d);
					break;

				case GatewayOpcodes.Heartbeat:
					this.heartbeat();
					break;

				case GatewayOpcodes.InvalidSession:
					new Warn("Web Socket", "Invalid session.").warn();
					break;

				case GatewayOpcodes.Reconnect:
					new Trace("Web Socket", "Reconnecting to the Discord gateway.").trace();
					this.disconnect();
					this.connect();
					break;

				case GatewayOpcodes.Hello:
					this.heartbeatInterval = setInterval(
						() => this.heartbeat(),
						PAYLOAD.d.heartbeat_interval,
					);
					break;

				case GatewayOpcodes.HeartbeatAck:
					new Trace("Web Socket", "Received heartbeat acknowledgement.").trace();
					break;
			}
		});

		this.ws.on("close", () => {
			new Warn(
				"Web Socket",
				"Connection to the Discord gateway was closed.",
				"The connection will be attempted to be reestablished...",
			).warn();

			// TODO: Exponential backoff.
			this.disconnect();
			this.connect();
		});

		this.ws.on("error", (error: Error) => {
			new Warn("Web Socket", error.message).warn();
		});
	}

	public disconnect(): void {
		if (this.heartbeatInterval !== undefined) {
			clearInterval(this.heartbeatInterval);
		}

		this.ws?.removeAllListeners();
		this.ws?.close();

		this.ws = undefined;

		new Trace("Web Socket", "Disconnected from the Discord gateway.").trace();
	}

	public identify(): void {
		this.ws?.send(
			JSON.stringify({
				op: 2,
				d: {
					token: this.settings.token,
					intents: this.settings.intents,
					properties: {
						$os: this.settings.os,
						$device: this.settings.device,
					},
				},
			}),
		);
	}

	private heartbeat(): void {
		this.ws?.send(
			JSON.stringify({
				op: 1,
				d: Date.now(),
			}),
		);
	}

	public disconnected(): boolean {
		return this.ws?.readyState === WS.CLOSED;
	}

	public connected(): boolean {
		return this.ws?.readyState === WS.OPEN;
	}
}
