import { Warn } from "./log";

/** A specialized extension of Map with array-like utility methods and an entry limit. */
export class Dictionary<Key, Type> extends Map<Key, Type> {
	/** The name of the dictionary, used for identification. */
	public readonly name: string;

	/** The maximum number of entries allowed in the dictionary. */
	public readonly limit: number;

	/**
	 * Creates a new `Dictionary` instance.
	 *
	 * If a limit is provided and the initial iterable exceeds the limit, the dictionary will only include entries up to the limit.
	 *
	 * @param iterable Initial entries for the dictionary.
	 * @param limit Maximum number of entries allowed. Defaults to Infinity.
	 * @param name Name of the dictionary for identification. Defaults to "unknown".
	 */
	public constructor(iterable?: Iterable<readonly [Key, Type]>, limit?: number, name?: string) {
		const EFFECTIVE_LIMIT = limit && limit > 0 ? Math.round(limit) : Number.POSITIVE_INFINITY;

		if (iterable && EFFECTIVE_LIMIT < Number.POSITIVE_INFINITY) {
			let count = 0;
			const LIMITED_ITERABLE: Iterable<readonly [Key, Type]> = {
				[Symbol.iterator]: function* () {
					for (const ITEM of iterable) {
						if (count++ >= EFFECTIVE_LIMIT) {
							break;
						}
						yield ITEM;
					}
				},
			};
			super(LIMITED_ITERABLE);
		} else {
			super(iterable);
		}

		this.limit = EFFECTIVE_LIMIT;
		this.name = name || "unknown";
	}

	/**
	 * Filters the entries of the dictionary based on the provided callback.
	 *
	 * @param callback A function to test each entry. Returns `true` to keep the entry, `false` otherwise.
	 * @returns A new `Dictionary` with the filtered entries.
	 */
	public filter(callback: (value: Type, key: Key, dict: this) => boolean): Dictionary<Key, Type> {
		return new Dictionary(
			[...this].filter(([key, value]) => callback(value, key, this)),
			this.limit,
			this.name,
		);
	}

	/**
	 * Finds the first value in the dictionary that satisfies the provided callback.
	 *
	 * @param callback A function to test each entry. Returns `true` for the desired entry.
	 * @returns The first value that satisfies the callback, or `undefined` if none do.
	 */
	public find(callback: (value: Type, key: Key, dict: this) => boolean): Type | undefined {
		for (const [KEY, VALUE] of this) {
			if (callback(VALUE, KEY, this)) {
				return VALUE;
			}
		}

		return undefined;
	}

	/**
	 * Tests whether all entries in the dictionary pass the provided callback.
	 *
	 * @param callback A function to test each entry. Returns `true` for entries that pass.
	 * @returns `true` if all entries pass the callback, otherwise `false`.
	 */
	public every(callback: (value: Type, key: Key, dict: this) => boolean): boolean {
		for (const [KEY, VALUE] of this) {
			if (!callback(VALUE, KEY, this)) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Tests whether at least one entry in the dictionary passes the provided callback.
	 *
	 * @param callback A function to test each entry. Returns `true` for entries that pass.
	 * @returns `true` if at least one entry passes the callback, otherwise `false`.
	 */
	public some(callback: (value: Type, key: Key, dict: this) => boolean): boolean {
		for (const [KEY, VALUE] of this) {
			if (callback(VALUE, KEY, this)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Reduces the dictionary's entries to a single value using the provided callback.
	 *
	 * @param callback A function to process each entry.
	 * @param initial The initial accumulator value.
	 * @returns The result of the reduction.
	 */
	public reduce<T>(
		callback: (accumulator: T, value: Type, key: Key, dict: this) => T,
		initial: T,
	): T {
		return [...this].reduce((acc, [key, value]) => callback(acc, value, key, this), initial);
	}

	/**
	 * Maps the dictionary's entries to a new `Dictionary` with transformed values.
	 *
	 * @param callback A function to transform each entry.
	 * @returns A new `Dictionary` with the mapped values.
	 */
	public map<T>(callback: (value: Type, key: Key, dict: this) => T): Dictionary<Key, T> {
		return new Dictionary(
			[...this].map(([key, value]) => [key, callback(value, key, this)] as const),
			this.limit,
			this.name,
		);
	}

	/**
	 * Adds or updates an entry in the dictionary.
	 *
	 * If the dictionary has reached its limit, the entry will not be added.
	 * 
	 * @param key The key of the entry.
	 * @param value The value of the entry.
	 * @returns The current dictionary instance.
	 */
	public override set(key: Key, value: Type): this {
		if (this.size >= this.limit) {
			console.warn(
				new Warn(
					`Dictionary > ${this.name}`,
					`Reached its limit of ${this.limit} entries.`,
				).format(),
			);

			return this;
		}

		return super.set(key, value);
	}

	/**
	 * Retrieves the first value in the dictionary.
	 *
	 * @returns The first value, or `undefined` if the dictionary is empty.
	 */
	public first(): Type | undefined {
		return this.values().next().value;
	}

	/**
	 * Retrieves the last value in the dictionary.
	 *
	 * @returns The last value, or `undefined` if the dictionary is empty.
	 */
	public last(): Type | undefined {
		return [...this.values()].at(-1);
	}

	/**
	 * Creates a shallow copy of the dictionary.
	 *
	 * @returns A new `Dictionary` instance with the same entries, limit, and name.
	 */
	public clone(): Dictionary<Key, Type> {
		return new Dictionary([...this], this.limit, this.name);
	}

	/**
	 * Calculates the number of additional entries that can be added to the dictionary.
	 *
	 * @returns The number of remaining entries before reaching the limit.
	 */
	public remaining(): number {
		return this.limit - this.size;
	}
}
