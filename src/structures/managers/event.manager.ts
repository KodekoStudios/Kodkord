import type { Dictionary } from "@common/dictionary";
import type { Client } from "@core/client";
import type { EventNames, PredicateEventHandler } from "@core/events";
import { Manager } from "./manager";

/**
 * Manages event handlers for different events.
 */
export class EventManager extends Manager<PredicateEventHandler[EventNames]> {
	/** A dictionary to storage events. */
	public declare storage: Dictionary<EventNames, PredicateEventHandler[EventNames]>;

	/**
	 * Creates a new instance of the EventManager class.
	 *
	 * @param client The client instance.
	 */
	public constructor(client: Client) {
		super(client, "EVENT MANAGER");
	}

	/**
	 * Retrieves the event handler for the specified event.
	 *
	 * @param event The name of the event.
	 * @returns The event handler function, or a default function if not found.
	 */
	// biome-ignore lint/suspicious/noExplicitAny: sowwy.
	public get(event: EventNames): (data_0: any, data_1: Client) => unknown {
		return this.storage.get(event) ?? ((): null => null);
	}

	/**
	 * Sets the event handler for the specified event.
	 *
	 * @param event The name of the event.
	 * @param predicate The event handler function.
	 */
	public set<T extends EventNames>(event: T, predicate: PredicateEventHandler[T]): void {
		this.storage.set(event, predicate);
	}
}
