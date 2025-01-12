import { WebSocket, type WebSocketSettings } from "@api/ws";
import { Panic, Trace, Warn } from "@common/log";
import type { Client } from "./client";

export type ShardSettings = Partial<WebSocketSettings>;

export class Shard {
	public readonly websocket: WebSocket;
	public readonly client: Client;
	public readonly id: number;

	public static calculateId(guildId: string, shards: number): number {
		return Number((BigInt(guildId) >> 22n) % BigInt(shards));
	}

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

	public get rest(): Client["rest"] {
		return this.client.rest;
	}
}
