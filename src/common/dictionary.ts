import { Warn } from "./log";

export class Dictionary<Key, Type> extends Map<Key, Type> {
	public readonly name: string;
	public readonly limit: number;

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

	public filter(callback: (value: Type, key: Key, dict: this) => boolean): Dictionary<Key, Type> {
		return new Dictionary(
			[...this].filter(([key, value]) => callback(value, key, this)),
			this.limit,
			this.name,
		);
	}

	public find(callback: (value: Type, key: Key, dict: this) => boolean): Type | undefined {
		for (const [KEY, VALUE] of this) {
			if (callback(VALUE, KEY, this)) {
				return VALUE;
			}
		}

		return undefined;
	}

	public every(callback: (value: Type, key: Key, dict: this) => boolean): boolean {
		for (const [KEY, VALUE] of this) {
			if (!callback(VALUE, KEY, this)) {
				return false;
			}
		}

		return true;
	}

	public some(callback: (value: Type, key: Key, dict: this) => boolean): boolean {
		for (const [KEY, VALUE] of this) {
			if (callback(VALUE, KEY, this)) {
				return true;
			}
		}

		return false;
	}

	public reduce<T>(
		callback: (accumulator: T, value: Type, key: Key, dict: this) => T,
		initial: T,
	): T {
		return [...this].reduce((acc, [key, value]) => callback(acc, value, key, this), initial);
	}

	public map<T>(callback: (value: Type, key: Key, dict: this) => T): Dictionary<Key, T> {
		return new Dictionary(
			[...this].map(([key, value]) => [key, callback(value, key, this)] as const),
			this.limit,
			this.name,
		);
	}

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

	public first(): Type | undefined {
		return this.values().next().value;
	}

	public last(): Type | undefined {
		return [...this.values()].at(-1);
	}

	public clone(): Dictionary<Key, Type> {
		return new Dictionary([...this], this.limit, this.name);
	}

	public remaining(): number {
		return this.limit - this.size;
	}
}
