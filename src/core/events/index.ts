import type { ArgumentTypes } from "@types";

// //

import { GUILD_CREATE } from "./guild.event";
import { MESSAGE_CREATE } from "./message.event";

export const RAW_EVENTS = { MESSAGE_CREATE, GUILD_CREATE };

export type ClientEvents = {
	[EventName in keyof typeof RAW_EVENTS]: ReturnType<(typeof RAW_EVENTS)[EventName]>;
};

export type EventNames = Extract<keyof ClientEvents, string>;

export type PredicateEventHandler = {
	[K in EventNames]: (...data: ArgumentTypes<(typeof RAW_EVENTS)[K]>) => void;
};
