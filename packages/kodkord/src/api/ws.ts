import type { Events } from "@core/client";

import { type GatewayReceivePayload, GatewayOpcodes, GatewayVersion } from "discord-api-types/v10";
import { Trace, Warn } from "@common/log";
import WS from "ws";

/**
 * The WebSocket address for connecting to the Discord Gateway.
 */
export const WEB_SOCKET_ADDRESS = `wss://gateway.discord.gg/?v=${GatewayVersion}&encoding=json`;

/**
 * Settings required for establishing a WebSocket connection to the Discord Gateway.
 */
export interface WebSocketSettings {
	/** The bot's authentication token. */
	token: string;

	/** The bitwise value representing the Gateway intents. */
	intents: number;

	/** The device name to be sent in the identify payload. */
	device: string;

	/** The operating system of the host machine. */
	os: "windows" | "linux" | "macos";

	/** Event handlers for incoming Gateway events. */
	events: Events;
}

/**
 * Manages the WebSocket connection to the Discord Gateway.
 *
 * The `WebSocket` class handles the low-level communication with the Discord Gateway,
 * including sending the initial identify payload, responding to heartbeats, and
 * processing incoming Gateway events. It ensures the connection remains active and
 * will automatically attempt to reconnect in case of disconnections.
 */
export class WebSocket {
	/**
	 * The interval timer used to send heartbeats to the Gateway.
	 *
	 * This ensures the connection stays alive.
	 */
	// Biome-ignore lint/correctness/noUndeclaredVariables: Timer is a Bun type.
	private heartbeatInterval?: Timer;

	/** The underlying WebSocket connection instance. */
	private ws?: WS;

	/** Configuration settings for the WebSocket connection. */
	public readonly settings: WebSocketSettings;

	/**
	 * Creates a new `WebSocket` instance.
	 *
	 * @param settings The settings required to establish a WebSocket connection.
	 */
	public constructor(settings: WebSocketSettings) {
		this.settings = settings;
	}

	/**
	 * Establishes a WebSocket connection to the Discord Gateway.
	 *
	 * - Sets up event listeners for handling incoming messages, connection lifecycle events, and errors.
	 * - Automatically sends the identify payload upon successful connection.
	 * - Begins sending periodic heartbeats upon receiving the "Hello" event from the Gateway.
	 */
	public connect(): void {
		this.ws = new WS(WEB_SOCKET_ADDRESS);

		this.ws.on("open", () => {
			new Trace("Web Socket", "Connected to the Discord gateway.").trace();
			this.identify();
		});

		this.ws.on("message", (data) => {
			// eslint-disable-next-line @typescript-eslint/no-base-to-string
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
						() => {
							this.heartbeat();
						},
						PAYLOAD.d.heartbeat_interval
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
				"The connection will be attempted to be reestablished..."
			).warn();

			// !TODO: Exponential backoff.
			this.disconnect();
			this.connect();
		});

		this.ws.on("error", (error: Error) => {
			new Warn("Web Socket", error.message).warn();
		});
	}

	/**
	 * Disconnects the WebSocket connection and clears resources.
	 *
	 * - Stops the heartbeat interval.
	 * - Removes all event listeners from the WebSocket instance.
	 * - Closes the WebSocket connection.
	 */
	public disconnect(): void {
		if (this.heartbeatInterval !== undefined) {
			clearInterval(this.heartbeatInterval);
		}

		this.ws?.removeAllListeners();
		this.ws?.close();

		this.ws = undefined;

		new Trace("Web Socket", "Disconnected from the Discord gateway.").trace();
	}

	/**
	 * Sends the identify payload to the Discord Gateway.
	 *
	 * This payload contains the bot's token, intents, and client properties. It is required
	 * to authenticate the connection and begin receiving events.
	 */
	public identify(): void {
		this.ws?.send(
			JSON.stringify({
				op: 2,
				d: {
					token: this.settings.token,
					intents: this.settings.intents,
					properties: {
						$os: this.settings.os,
						$device: this.settings.device
					}
				}
			})
		);
	}

	/**
	 * Sends a heartbeat payload to the Discord Gateway.
	 *
	 * The heartbeat is sent to indicate the connection is still active. Discord requires
	 * regular heartbeats to prevent the connection from being closed.
	 */
	private heartbeat(): void {
		this.ws?.send(
			JSON.stringify({
				op: 1,
				d: Date.now()
			})
		);
	}

	/**
	 * Checks if the WebSocket connection is disconnected.
	 *
	 * @returns `true` if the WebSocket connection is closed, otherwise `false`.
	 */
	public disconnected(): boolean {
		return this.ws?.readyState === WS.CLOSED;
	}

	/**
	 * Checks if the WebSocket connection is established.
	 *
	 * @returns `true` if the WebSocket connection is open, otherwise `false`.
	 */
	public connected(): boolean {
		return this.ws?.readyState === WS.OPEN;
	}
}
