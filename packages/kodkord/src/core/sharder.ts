import { Dictionary } from "@common/dictionary";
import { Panic } from "@common/log";

import type { Client } from "./client";

import { type ShardSettings, Shard } from "./shard";

/**
 * The Sharder class manages multiple shards for connecting to Discord's Gateway.
 *
 * It extends a `Dictionary` to map shard ids to their respective `Shard` instances. This
 * class provides utilities to create, manage, and control the lifecycle of shards, enabling
 * efficient sharding for large bots.
 */
export class Sharder extends Dictionary<number, Shard> {
	/** The client instance that owns this sharder. */
	public readonly client: Client;

	/**
	 * Creates a new Sharder instance.
	 *
	 * @param client The client that owns the sharder and its shards.
	 */
	public constructor(client: Client) {
		super(undefined, undefined, "Sharder");
		this.client = client;
	}

	/**
	 * Creates a new shard with the given Id.
	 *
	 * - If a shard with the specified Id already exists, logs a panic and returns the existing shard.
	 * - Otherwise, it creates a new shard, stores it in the dictionary, and returns it.
	 *
	 * @param id The Id of the shard to create.
	 * @param settings Optional settings to override default shard configurations.
	 * @returns The newly created or existing shard.
	 */
	public create(id: number, settings?: ShardSettings): Shard {
		if (this.has(id)) {
			new Panic("Sharder", `Shard #${id} already exists.`).panic();
			return this.get(id) as Shard;
		}

		const SHARD = new Shard(this.client, id, settings);
		this.set(id, SHARD);

		return SHARD;
	}

	/**
	 * Adjusts the number of shards dynamically.
	 *
	 * - If the new shard count is less than the current count, logs a panic and does nothing.
	 * - Otherwise, creates additional shards as needed to match the new count.
	 *
	 * @param shards The new number of shards.
	 */
	public reashard(shards: number): void {
		if (shards < this.size) {
			new Panic(
				"Sharder",
				`Cannot reshard to a lower shard count (${shards}) than the current count (${this.size})`
			).panic();
			return;
		}

		for (let i = this.size; i < shards; i++) {
			this.create(i);
		}
	}

	/**
	 * Forces a specific shard to identify and reconnect to the Gateway.
	 *
	 * - If the shard doesn't exist, it creates the shard first.
	 * - If the shard is disconnected, it connects and identifies the shard.
	 *
	 * @param id The Id of the shard to force identification for.
	 */
	public forceIdentify(id: number): void {
		const SHARD = this.has(id)
			? (this.get(id) as Shard)
			: this.create(id);

		if (SHARD.websocket.disconnected()) {
			SHARD.connect();
		}

		SHARD.websocket.identify();
	}

	/**
	 * Connects all shards to Discord's Gateway.
	 *
	 * Iterates over all stored shards and invokes their `connect` method.
	 */
	public connect(): void {
		for (const SHARD of this.values()) {
			SHARD.connect();
		}
	}

	/**
	 * Reconnects all shards to Discord's Gateway.
	 *
	 * - Disconnects each shard.
	 * - Reconnects each shard.
	 */
	public reconnet(): void {
		for (const SHARD of this.values()) {
			SHARD.disconnect();
			SHARD.connect();
		}
	}

	/**
	 * Disconnects all shards from Discord's Gateway.
	 *
	 * Iterates over all stored shards and invokes their `disconnect` method.
	 */
	public disconnect(): void {
		for (const SHARD of this.values()) {
			SHARD.disconnect();
		}
	}
}
