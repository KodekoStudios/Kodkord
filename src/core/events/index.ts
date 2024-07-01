import type { Client } from "@core/client";
import { MESSAGE_CREATE } from "./message.event";

export const RawEvents = { MESSAGE_CREATE };

export type ClientEvents = {
	[EventName in keyof typeof RawEvents]: ReturnType<(typeof RawEvents)[EventName]>;
};

export type EventNames = Extract<keyof ClientEvents, string>;

export type PredicateEventHandler = {
	[K in EventNames]: (...data: [Awaited<ClientEvents[K]>, Client]) => unknown;
};
