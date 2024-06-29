export * from "./message.hook";

import type * as RawEvents from "./index";

export type ClientEvents = {
	[X in keyof typeof RawEvents]: ReturnType<(typeof RawEvents)[X]>;
};
