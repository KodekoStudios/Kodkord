import { Logger } from "@common/logger";
import {
	GatewayDispatchEvents,
	type GatewayDispatchPayload,
	type GatewayHello,
	GatewayOpcodes,
	type GatewayReceivePayload,
	GatewayVersion,
} from "discord-api-types/v10";
import WS from "ws";
import type { Client } from "./client";
import { RAW_EVENTS } from "./events";

/** The WebSocket URL for the Discord gateway connection. */
export const WEB_SOCKET_ADDRESS = `wss://gateway.discord.gg/?v=${GatewayVersion}&encoding=json`;

/** Enum for various operating systems. */
export enum OperatingSystem {
	Windows = "windows",
	Linux = "linux",
	MacOS = "macos",
}

/**
 * Configuration options for establishing a WebSocket connection to Discord.
 */
export interface WebSocketOptions {
	/** The token for authenticating with the Discord API. */
	token: string;

	/** The bitmask representing the intents for the WebSocket connection. */
	intents: number;

	/** The name of the device, defaults to "kodcord"). */
	device?: string;

	/** The operating system of the client device, defaults to "linux". */
	os?: OperatingSystem;
}

/**
 * Represents a WebSocket connection to the Discord gateway for real-time communication.
 */
export class WebSocket {
	private declare ws: WS;
	private logger: Logger;
	private token: string;
	private device: string;
	private os: OperatingSystem;

	/** The client instance associated with this WebSocket connection. */
	public readonly client: Client;

	/** The bitmask representing the enabled intents for the WebSocket connection. */
	public readonly intents: number;

	// biome-ignore lint/correctness/noUndeclaredVariables: Timer is not declared in the NodeJS namespace cuz it's a Bun type.
	private heartbeatInterval?: NodeJS.Timeout | Timer;

	/**
	 * Constructs a new WebSocket instance.
	 *
	 * @param client The client instance managing this WebSocket connection.
	 * @param options Configuration options for the WebSocket connection.
	 */
	public constructor(
		client: Client,
		{ token, intents, device = "kodcord", os = OperatingSystem.Linux }: WebSocketOptions,
	) {
		this.client = client;
		this.logger = new Logger({ from: "WEB SOCKET" });
		this.token = token;
		this.intents = intents;
		this.device = device;
		this.os = os;
	}

	/**
	 * Establishes the WebSocket connection to the Discord gateway and handles events such as 'open', 'message', 'close', and 'error'.
	 */
	public connect(): void {
		this.ws = new WS(WEB_SOCKET_ADDRESS);

		this.ws.on("open", () => {
			this.logger.debug("WebSocket connected.");
			this.identify();
		});

		this.ws.on("message", (data: WS.Data) => {
			this.handleMessage(data.toString());
		});

		this.ws.on("close", () => {
			// Message to Aaron:
			//  Fuck your Aarón, I made your job.
			this.logger.debug(
				"WebSocket connection closed.",
				"The connection will be attempted to be reestablished...",
			);
			this.reconnect();
		});

		this.ws.on("error", (error: Error) => {
			this.logger.throw(error.message);
		});
	}

	/**
	 * Disconnects the WebSocket connection, clears listeners, and stops the heartbeat.
	 */
	public disconnect(): void {
		this.logger.debug("Disconnecting WebSocket...");

		if (this.heartbeatInterval) {
			clearInterval(this.heartbeatInterval);
		}

		this.ws.removeAllListeners();
		this.ws.close();

		this.logger.debug("WebSocket disconnected.");
	}

	/**
	 * Attempts to reconnect the WebSocket after a disconnect event.
	 * Uses a delay before attempting to reconnect.
	 */
	private reconnect(): void {
		this.logger.debug("Reconnecting WebSocket...");
		setTimeout(() => this.connect(), 5000); // Exponential backoff can be implemented here
	}

	/**
	 * Sends an identification payload to authenticate and establish the WebSocket session with Discord.
	 * Called automatically when the WebSocket connection is opened.
	 */
	private identify(): void {
		this.ws.send(
			JSON.stringify({
				op: 2,
				d: {
					token: this.token,
					intents: this.intents,
					properties: {
						$os: this.os,
						$browser: "Kodcord",
						$device: this.device,
					},
				},
			}),
		);
	}

	/**
	 * Processes incoming WebSocket messages from Discord.
	 * Determines the type of message received and routes it to the appropriate handler.
	 *
	 * @param message The raw WebSocket message received from Discord.
	 */
	private handleMessage(message: string): void {
		const PAYLOAD = JSON.parse(message) as GatewayReceivePayload;

		if (PAYLOAD.t) {
			this.logger.debug(
				`Received Event {underline:${PAYLOAD.t}}`,
				JSON.stringify(PAYLOAD, null, 2),
			);
		}

		switch (PAYLOAD.op) {
			case GatewayOpcodes.Dispatch:
				if (PAYLOAD.t === GatewayDispatchEvents.Ready) {
					this.logger.debug(
						`Connected as ${PAYLOAD.d.user.username}#${PAYLOAD.d.user.discriminator}`,
					);
				}

				this.handleDispatch(PAYLOAD);
				break;

			case GatewayOpcodes.Hello:
				this.handleHello(PAYLOAD);
				break;

			// Message to Aaron:
			//  Add more cases as needed.
			//  You can refer to the Discord Gateway documentation for more information.
			//  https://discord.com/developers/docs/topics/gateway

			default:
				this.logger.warn(`Unhandled WebSocket opcode: ${PAYLOAD.op}`);
				break;
		}
	}

	/**
	 * Handles 'Dispatch' payloads from Discord, which represent various events.
	 * Dispatches events to the client's event handlers (e.g., 'MESSAGE_CREATE', 'GUILD_CREATE').
	 *
	 * @param payload The 'Dispatch' payload received from Discord.
	 */
	public handleDispatch({ d, t }: GatewayDispatchPayload): void {
		switch (t) {
			case GatewayDispatchEvents.MessageCreate:
				this.client.events.get("MESSAGE_CREATE")?.(
					RAW_EVENTS.MESSAGE_CREATE(this.client, d),
					this.client,
				);
				break;

			default:
				break;
		}
	}

	/**
	 * Handles the 'Hello' payload from Discord, which includes the heartbeat interval.
	 * Sends heartbeat messages at regular intervals to maintain the WebSocket connection.
	 *
	 * @param payload The 'Hello' payload containing the heartbeat interval.
	 */
	private handleHello({ d: { heartbeat_interval } }: GatewayHello): void {
		this.heartbeatInterval = setInterval(() => {
			this.ws.send(JSON.stringify({ op: GatewayOpcodes.Heartbeat, d: null }));
		}, heartbeat_interval);
	}
}
