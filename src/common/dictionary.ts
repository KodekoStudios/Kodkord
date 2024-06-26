import type { Nullable } from "@types";
import { Logger } from "./logger";

/**
 * Represents a dictionary-like collection that extends Map.
 * Provides additional functionality for logging and size limit management.
 *
 * @template Key The type of keys in the dictionary.
 * @template Value The type of values in the dictionary.
 */
export class Dictionary<Key, Value> extends Map<Key, Value> {
	/** Logger instance used for logging warnings and errors. */
	protected logger: Logger;

	/** The maximum number of entries the dictionary can hold. */
	public readonly limit: number;

	private readonly name: string;

	/**
	 * Constructs a new instance of Dictionary.
	 *
	 * @param iterable Optional initial values to populate the dictionary.
	 * @param limit Optional maximum number of entries the dictionary can hold.
	 * @param name Optional name or identifier for the dictionary instance (used in warning messages).
	 */
	constructor(
		iterable?: Nullable<Iterable<readonly [Key, Value]>>,
		limit?: Nullable<number>,
		name?: Nullable<string>,
	) {
		limit = limit && limit > 0 ? Math.round(limit) : Number.POSITIVE_INFINITY;

		if (iterable) {
			const array = Array.from(iterable);
			if (array.length > limit) iterable = array.slice(0, limit);
		}

		super(iterable);
		this.logger = new Logger({ from: "dictionary" });
		this.limit = limit;
		this.name = name ?? "unknown";
	}

	/**
	 * Sets the value for the specified key in the dictionary.
	 * Overrides the native Map's set method to include size limit checking.
	 *
	 * @param key The key to set in the dictionary.
	 * @param value The value to associate with the key.
	 * @returns The updated Dictionary instance.
	 */
	public override set(key: Key, value: Value): this {
		if (this.has(key)) return super.set(key, value);

		if (this.size === this.limit) {
			this.logger.warn(
				`The Dictionary "${this.name}" has reached it's limit (${this.size}/${this.limit}). Cannot add more items.`,
			);
			return this;
		}

		return super.set(key, value);
	}

	/**
	 * Retrieves the remaining capacity of the dictionary.
	 * Calculates the difference between the limit and the current size.
	 *
	 * @readonly
	 */
	public get remaining(): number {
		return this.limit - this.size;
	}
}
