import { Dictionary } from "@common/dictionary";
import { Panic } from "@common/log";
import type { Client } from "./client";
import { Shard, type ShardSettings } from "./shard";

export class Sharder extends Dictionary<number, Shard> {
	public readonly client: Client;

	public constructor(client: Client) {
		super(undefined, undefined, "Sharder");
		this.client = client;
	}

	public create(id: number, settings?: ShardSettings): Shard {
		if (this.has(id)) {
			new Panic("Sharder", `Shard #${id} already exists.`).panic();
			return this.get(id) as Shard;
		}

		const SHARD = new Shard(this.client, id, settings);
		this.set(id, SHARD);

		return SHARD;
	}

	public reashard(shards: number): void {
		if (shards < this.size) {
			new Panic(
				"Sharder",
				`Cannot reshard to a lower shard count (${shards}) than the current count (${this.size})`,
			).panic();
			return;
		}

		for (let i = this.size; i < shards; i++) {
			this.create(i);
		}
	}

	public forceIdentify(id: number): void {
		const SHARD = this.has(id) ? (this.get(id) as Shard) : this.create(id);

		if (SHARD.websocket.disconnected()) {
			SHARD.connect();
		}

		SHARD.websocket.identify();
	}

	public connect(): void {
		for (const SHARD of this.values()) {
			SHARD.connect();
		}
	}

	public reconnet(): void {
		for (const SHARD of this.values()) {
			SHARD.disconnect();
			SHARD.connect();
		}
	}

	public disconnect(): void {
		for (const SHARD of this.values()) {
			SHARD.disconnect();
		}
	}
}
