import type { Client } from "@core/client";
import type { ArgumentTypes } from "@types";
import * as GuildEvents from "./guild.event";
import * as MessageEvents from "./message.event";
import * as UserEvents from "./user.event";

/** Consolidates all raw events into a single object. */
export const RAW_EVENTS = { ...GuildEvents, ...MessageEvents, ...UserEvents };

/** Maps event names to their respective return types. */
export type ClientEvents = {
	[EventName in keyof typeof RAW_EVENTS]: ReturnType<(typeof RAW_EVENTS)[EventName]>;
};

/** Extracts string-based event names from ClientEvents. */
export type EventNames = Extract<keyof ClientEvents, string>;

/** Represents a handler for raw event arguments. */
export type RawEventHandler = {
	[K in EventNames]: (...data: ArgumentTypes<(typeof RAW_EVENTS)[K]>) => unknown;
};

/** Represents a handler for resolved event data with client context. */
export type ResolverEventHandler = {
	[K in EventNames]: (...data: [Awaited<ClientEvents[K]>, Client]) => unknown;
};
