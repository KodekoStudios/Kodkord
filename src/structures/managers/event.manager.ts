import type { Dictionary } from "@common/dictionary";
import type { Client } from "@core/client";
import type { EventNames, PredicateEventHandler } from "@core/events";
import { BaseManager } from "./base.manager";

/**
 * Manages event handlers for different events.
 */
export class EventManager extends BaseManager<PredicateEventHandler[EventNames]> {
	/**
	 * The dictionary that stores the event handlers.
	 */
	public declare store: Dictionary<EventNames, PredicateEventHandler[EventNames]>;

	/**
	 * Creates a new instance of the EventManager class.
	 *
	 * @param client The client instance.
	 */
	constructor(client: Client) {
		super(client, "EVENT MANAGER");
	}

	/**
	 * Retrieves the event handler for the specified event.
	 *
	 * @param event The name of the event.
	 * @returns The event handler function, or a default function if not found.
	 */
	public get(event: EventNames) {
		return this.store.get(event) ?? (() => null);
	}

	/**
	 * Sets the event handler for the specified event.
	 *
	 * @param event The name of the event.
	 * @param predicate The event handler function.
	 */
	public set<T extends EventNames>(event: T, predicate: PredicateEventHandler[T]) {
		this.store.set(event, predicate);
	}
}
