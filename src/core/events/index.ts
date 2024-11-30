import type { Client } from "@core/client";
import { MESSAGE_CREATE } from "./message.event";

export const RAW_EVENTS = { MESSAGE_CREATE };

export type ClientEvents = {
	[EventName in keyof typeof RAW_EVENTS]: ReturnType<(typeof RAW_EVENTS)[EventName]>;
};

export type EventNames = Extract<keyof ClientEvents, string>;

export type PredicateEventHandler = {
	[K in EventNames]: (...data: [Awaited<ClientEvents[K]>, Client]) => unknown;
};
