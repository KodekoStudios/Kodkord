import type { Dictionary } from "@common/dictionary";
import type { Client } from "@core/client";
import type { GatewayDispatchEvents } from "discord-api-types/v10";
import { BaseManager } from "./base.manager";

type ToPayload<Event extends string> = Event extends `${infer Prefix}_${infer Middle}_${infer Rest}`
	? `Gateway${Capitalize<Lowercase<Prefix>>}${Capitalize<Lowercase<Middle>>}${Capitalize<Lowercase<Rest>>}Dispatch`
	: Event extends `${infer Prefix}_${infer Rest}`
		? `Gateway${Capitalize<Lowercase<Prefix>>}${Capitalize<Lowercase<Rest>>}Dispatch`
		: never;

type EventPayloadMap = {
	[K in keyof typeof GatewayDispatchEvents as (typeof GatewayDispatchEvents)[K]]: ToPayload<
		(typeof GatewayDispatchEvents)[K]
	>;
};

export type EventNames = keyof EventPayloadMap;

export type EventData = {
	[K in keyof EventPayloadMap]: EventPayloadMap[K];
};

export class EventManager<T extends EventNames> extends BaseManager<
	(data: EventData[T]) => unknown
> {
	public declare store: Dictionary<string, (data: EventData[T]) => unknown>;

	constructor(client: Client) {
		super(client, "event manager");
	}

	public get(event: EventNames) {
		return this.store.get(event) ?? (() => null);
	}

	public set(event: T, predicate: (data: EventData[T]) => unknown) {
		this.store.set(event, predicate);
	}
}
