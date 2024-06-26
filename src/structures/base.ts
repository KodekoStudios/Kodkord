import type { Client } from "@core/client";
import type { Snowflake } from "discord-api-types/v10";

export abstract class Base<Data extends object> {
	public readonly client: Client;
	public readonly data: Data;

	constructor(data: Data, client: Client) {
		this.client = client;
		this.data = data;
	}

	public get id(): Snowflake {
		return "id" in this.data ? (this.data.id as Snowflake) : "";
	}
}
