/**
 * Makes specified properties of a type required.
 *
 * @template Type The original type.
 * @template Keys The keys of the properties to make required.
 */
export type MakeRequired<Type, Keys extends keyof Type> = Type & {
	// For each key in the original type, if the key is in the specified keys, make it required.
	[Key in Keys]-?: Type[Key];
};

/**
 * Represents a type that can be nullable or undefined.
 *
 * @template Type The underlying type.
 */
export type Nullable<Type> = Type | null | undefined;
