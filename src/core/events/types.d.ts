import type { Client } from "@core/client";
import type { ClientEvents } from "./hooks";

export type EventsNames = Extract<keyof ClientEvents, string>;

export type PredicateEventHandler = {
	[K in keyof ClientEvents]: (...data: [Awaited<ClientEvents[K]>, Client, number]) => unknown;
};
