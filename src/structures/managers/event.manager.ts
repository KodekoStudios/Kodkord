import type { Dictionary } from "@common/dictionary";
import type { Client } from "@core/client";
import type { EventsNames, PredicateEventHandler } from "@core/events/types.d";
import { BaseManager } from "./base.manager";

export class EventManager extends BaseManager<PredicateEventHandler> {
	public declare store: Dictionary<EventsNames, PredicateEventHandler>;

	constructor(client: Client) {
		super(client, "event manager");
	}

	public get(event: EventsNames) {
		return this.store.get(event) ?? (() => null);
	}

	public set<T extends EventsNames>(event: T, predicate: PredicateEventHandler) {
		this.store.set(event, predicate);
	}
}
