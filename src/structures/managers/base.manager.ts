import { Dictionary } from "@common/dictionary";
import type { Client } from "@core/client";
import type { Snowflake } from "discord-api-types/globals";

export abstract class BaseManager<T> {
	protected readonly client: Client;
	public readonly store: Dictionary<Snowflake, T>;

	constructor(client: Client, name: string) {
		this.client = client;
		this.store = new Dictionary(undefined, undefined, name);
	}
}
