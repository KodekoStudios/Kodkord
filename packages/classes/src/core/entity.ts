import type { Rest } from "kodkord";

/**
 * Class that represents a base entity for API objects.
 */
export class Entity<Raw> {
	/** The `Rest` instance for interacting with the Discord API. */
	public readonly rest: Rest;

	/** Raw data from the API response, read-only to prevent unnecessary mutations. */
	public readonly raw: Raw;

	/**
	 * Creates an instance of the Entity.
	 *
	 * @param raw The raw data from the API response.
	 */
	public constructor(rest: Rest, raw: Raw) {
		this.rest = rest;
		this.raw = raw;
	}
}
