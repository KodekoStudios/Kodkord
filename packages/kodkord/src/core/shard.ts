import { WebSocket, type WebSocketSettings } from "@api/ws";
import { Panic, Trace, Warn } from "@common/log";
import type { Client } from "./client";

/** Shard configuration settings, based on partial WebSocket settings. */
export type ShardSettings = Partial<WebSocketSettings>;

/**
 * Represents a single shard for handling Discord Gateway connections.
 * 
 * The Shard class manages an individual connection to Discord's Gateway for a specific
 * subset of guilds, based on Discord's sharding mechanism. It encapsulates the lifecycle
 * of the WebSocket connection, including connection, disconnection, and error handling.
 */
export class Shard {
	/** The WebSocket instance responsible for managing the Gateway connection. */
	public readonly websocket: WebSocket;

	/** Reference to the parent client that created this shard. */
	public readonly client: Client;

	/** The Id of this shard. */
	public readonly id: number;

	/**
	 * Calculates the shard Id for a given guild based on Discord's sharding formula.
	 * 
	 * @param guildId The Id of the guild as a string.
	 * @param shards The total number of shards.
	 * @returns The shard Id that is responsible for the given guild.
	 */
	public static calculateId(guildId: string, shards: number): number {
		return Number((BigInt(guildId) >> 22n) % BigInt(shards));
	}

	/**
	 * Creates a new Shard instance.
	 * 
	 * @param client The parent client responsible for creating this shard.
	 * @param id The Id of the shard.
	 * @param settings Optional shard-specific settings that override the client's default WebSocket settings.
	 */
	public constructor(client: Client, id: number, settings?: ShardSettings) {
		this.websocket = new WebSocket({
			token: client.settings.token,
			intents: client.settings.intents,
			device: settings?.device ?? "kodkord",
			os: settings?.os ?? "linux",
			events: settings?.events ?? client.events,
		});
		this.client = client;
		this.id = id;
	}

	/**
	 * Connects the shard to Discord's Gateway.
	 * 
	 * - If the shard is already connected, logs a warning and does nothing.
	 * - Otherwise, attempts to establish a connection and logs the status.
	 */
	public connect(): void {
		if (this.websocket.connected()) {
			new Warn(`Shard #${this.id}`, "Attempted to connect to an already connected shard.").warn();
			return;
		}

		try {
			this.websocket.connect();
			new Trace(`Shard #${this.id}`, "Connected to the gateway.").warn();
		} catch (error) {
			new Panic(
				`Shard #${this.id}`,
				"Failed to connect to the gateway.",
				(error as Error).message,
			).panic();
		}
	}

	/**
	 * Disconnects the shard from Discord's Gateway.
	 * 
	 * - If the shard is not connected, logs a warning and does nothing.
	 * - Otherwise, attempts to cleanly close the connection and logs the status.
	 */
	public disconnect(): void {
		if (!this.websocket.connected()) {
			new Warn(
				`Shard #${this.id}`,
				"Attempted to disconnect from an already disconnected shard.",
			).trace();
			return;
		}

		try {
			this.websocket.disconnect();
			new Trace(`Shard #${this.id}`, "Disconnected from the gateway.").warn();
		} catch (error) {
			new Panic(
				`Shard #${this.id}`,
				"Failed to disconnect from the gateway.",
				(error as Error).message,
			).panic();
		}
	}

	/**
	 * Returns the REST client associated with this shard.
	 * 
	 * This provides access to the client's REST interface for making API requests.
	 * 
	 * @returns The REST client instance from the parent client.
	 */
	public get rest(): Client["rest"] {
		return this.client.rest;
	}
}
