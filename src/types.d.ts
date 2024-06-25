export type MakeRequired<T, K extends keyof T> = T & {
	[P in K]-?: T[P];
};

export type Nullable<T> = T | null | undefined;
