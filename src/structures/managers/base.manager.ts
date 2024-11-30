import { Dictionary } from "@common/dictionary";
import { Logger } from "@common/logger";
import type { Client } from "@core/client";
import type { Snowflake } from "discord-api-types/globals";

export abstract class BaseManager<T> {
	protected readonly client: Client;
	readonly logger: Logger;
	readonly debugger?: Logger;
	readonly storage: Dictionary<Snowflake, T>;

	constructor(client: Client, name: string) {
		this.client = client;
		this.logger = new Logger({ from: name });
		this.debugger = client.options.debug ? new Logger({ prefix: "DEBUG", from: name }) : undefined;
		this.storage = new Dictionary(undefined, undefined, name);
	}
}
