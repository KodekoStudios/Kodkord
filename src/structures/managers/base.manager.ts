import { Dictionary } from "@common/dictionary";
import { Logger } from "@common/logger";
import type { Client } from "@core/client";
import type { Snowflake } from "discord-api-types/globals";

export abstract class BaseManager<T> {
	protected readonly client: Client;
	readonly logger: Logger;
	readonly storage: Dictionary<Snowflake, T>;

	constructor(client: Client, name: string) {
		this.client = client;
		this.logger = new Logger({ from: name });
		this.storage = new Dictionary(undefined, undefined, name);
	}
}
