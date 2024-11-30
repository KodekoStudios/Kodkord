import type { Client } from "@core/client";
import type { Snowflake } from "discord-api-types/v10";

/**
 * Represents a base class for other classes in the application.
 *
 * @template Data The type of data associated with the class.
 */
export abstract class Base<Data extends object> {
	/** The client object. */
	public readonly client: Client;

	/** The data associated with the class. */
	public readonly data: Data;

	/**
	 * Creates an instance of the Base class.
	 *
	 * @param data The data associated with the class.
	 * @param client The client object.
	 */
	public constructor(data: Data, client: Client) {
		this.client = client;
		this.data = data;
	}

	/**
	 * Gets the Id of the data.
	 *
	 * @returns The Id of the data.
	 */
	public get id(): Snowflake {
		return "id" in this.data ? (this.data.id as Snowflake) : "";
	}
}
