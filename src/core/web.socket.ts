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
import { RawEvents } from "./events";

/**
 * The address for the WebSocket connection to the Discord gateway.
 */
export const WebSocketAddress = `wss://gateway.discord.gg/?v=${GatewayVersion}&encoding=json`;

/**
 * Enum for different operating systems.
 */
export enum OperatingSystem {
	Windows = "windows",
	Linux = "linux",
	MacOS = "macos",
}

/**
 * Options for configuring the WebSocket connection.
 */
export interface WebSocketOptions {
	/**
	 * The Discord app token.
	 */
	token: string;

	/**
	 * The intents for the WebSocket connection.
	 */
	intents: number;

	/**
	 * The device name (default is "kodcord").
	 */
	device?: string;

	/**
	 * The operating system of the device running the app (default is "linux").
	 */
	os?: OperatingSystem;
}

/**
 * Represents a WebSocket connection to the Discord gateway.
 */
export class WebSocket {
	private declare ws: WS;
	private logger: Logger;
	private token: string;
	private device: string;
	private os: OperatingSystem;

	/** The client instance for interacting with the Discord API. */
	public readonly client: Client;

	/**
	 * The number of intents for the WebSocket.
	 */
	public readonly intents: number;

	/**
	 * Creates a new WebSocket instance.
	 *
	 * @param options The options for configuring the WebSocket connection.
	 * @param options.token The Discord app token.
	 * @param options.intents The intents for the WebSocket connection.
	 * @param options.device The device name (default is "kodcord").
	 * @param options.os The operating system of the device running the app (default is "linux").
	 */
	constructor(
		client: Client,
		{ token, intents, device = "kodcord", os = OperatingSystem.Linux }: WebSocketOptions,
	) {
		this.client = client;
		this.logger = new Logger({ from: "web socket" });
		this.token = token;
		this.intents = intents;
		this.device = device;
		this.os = os;
	}

	/**
	 * Establishes a WebSocket connection to the Discord gateway.
	 *
	 * Initiates the connection and handles events such as 'open', 'message', 'close', and 'error'.
	 */
	public connect(): void {
		this.ws = new WS(WebSocketAddress);

		this.ws.on("open", () => {
			this.logger.debug("WebSocket connected.");
			this.identify();
		});

		this.ws.on("message", (data: WS.Data) => {
			this.handleMessage(data.toString());
		});

		this.ws.on("close", () => {
			// Message to Aaron:
			//  You may want to handle the reconnection logic here.
			//  If you want it, just do it.
			//  My recommendation is to limit the number of attempts to reconnect.

			this.logger.debug("WebSocket connection closed.");
		});

		this.ws.on("error", (error: Error) => {
			this.logger.error(error.message);
		});
	}

	/**
	 * Disconnects the WebSocket connection.
	 */
	public disconnect(): void {
		this.logger.debug("Disconnecting WebSocket...");

		this.ws.removeAllListeners();
		this.ws.close();

		this.logger.debug("WebSocket disconnected.");
	}

	/**
	 * Sends an identify payload to authenticate and initialize the connection.
	 * This method is called once the WebSocket connection is established.
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
						$browser: "kodcord",
						$device: this.device,
					},
				},
			}),
		);
	}

	/**
	 * Handles incoming messages received through the WebSocket connection.
	 * Parses and processes different types of payload messages (e.g., 'Dispatch', 'Hello').
	 *
	 * @param message The raw message received from the WebSocket.
	 */
	private handleMessage(message: string) {
		const payload = JSON.parse(message) as GatewayReceivePayload;

		payload.t && this.logger.debug("Received Event:", payload.t);

		switch (payload.op) {
			case GatewayOpcodes.Dispatch:
				if (payload.t === GatewayDispatchEvents.Ready) {
					this.logger.debug(
						`Connected as ${payload.d.user.username}#${payload.d.user.discriminator}`,
					);
				}

				this.handleDispatch(payload);
				break;

			case GatewayOpcodes.Hello:
				this.handleHello(payload);
				break;

			// Message to Aaron:
			//  Add more cases as needed.
			//  You can refer to the Discord Gateway documentation for more information.
			//  https://discord.com/developers/docs/topics/gateway

			default:
				break;
		}
	}

	/**
	 * Handles the 'Dispatch' payload type, which represents an event sent by Discord.
	 * Differentiates and processes various event types (e.g., 'MESSAGE_CREATE', 'GUILD_CREATE').
	 *
	 * @param payload The 'Dispatch' payload received from Discord.
	 */
	public handleDispatch({ d, t }: GatewayDispatchPayload) {
		switch (t) {
			case GatewayDispatchEvents.MessageCreate:
				this.client.events.get("MESSAGE_CREATE")?.(
					RawEvents.MESSAGE_CREATE(this.client, d),
					this.client,
				);
				break;

			default:
				break;
		}
	}

	/**
	 * Handles the 'Hello' payload type, which provides heartbeat information.
	 * Sends periodic heartbeat messages to maintain the WebSocket connection.
	 *
	 * @param payload The 'Hello' payload received from Discord.
	 */
	private handleHello({ d: { heartbeat_interval } }: GatewayHello) {
		setInterval(() => {
			this.ws.send(JSON.stringify({ op: 1, d: null }));
		}, heartbeat_interval);
	}
}
