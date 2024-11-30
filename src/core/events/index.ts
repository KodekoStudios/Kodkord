import type { ArgumentTypes } from "@types";

// //

import { GUILD_CREATE } from "./guild.event";
import { MESSAGE_CREATE } from "./message.event";

// //

export const RawEvents = { MESSAGE_CREATE, GUILD_CREATE };

// //

export type ClientEvents = {
	[EventName in keyof typeof RawEvents]: ReturnType<(typeof RawEvents)[EventName]>;
};

export type EventNames = Extract<keyof ClientEvents, string>;

export type PredicateEventHandler = {
	[K in EventNames]: (...data: ArgumentTypes<(typeof RawEvents)[K]>) => void;
};
