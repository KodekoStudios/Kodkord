import { Rest, type RestSettings } from "@api/rest";
import { Dictionary } from "@common/dictionary";
import type { GatewayDispatchEvents, GatewayDispatchPayload } from "discord-api-types/v10";
import { Sharder } from "./sharder";

/**
 * Represents a mapping of event types to their corresponding callback functions.
 *
 * This interface extends `Dictionary`, allowing each event to have a handler function
 * that processes the payload for that event type. The event type is inferred based on
 * the generic `Event`, which defaults to `GatewayDispatchEvents`.
 *
 * @template Event The event type to which the handler applies.
 */
// @ts-expect-error
export interface Events<Event extends GatewayDispatchEvents = GatewayDispatchEvents>
	extends Dictionary<Event, (data: GatewayDispatchPayload) => unknown> {
	/**
	 * Sets a callback function for a specific event.
	 *
	 * @param event The event to bind the callback to.
	 * @param callback The function to handle the event data.
	 * @returns The instance of the `Events` interface, allowing method chaining.
	 */
	set<E extends Event>(
		event: E,
		callback: (data: Extract<GatewayDispatchPayload, { t: E }>["d"]) => unknown,
	): this;

	/**
	 * Gets the callback function associated with a specific event.
	 *
	 * @param event The event for which to retrieve the callback function.
	 * @returns The callback function for the event, or `undefined` if no handler is set.
	 */
	get<E extends Event>(
		event: E,
	): ((data: Extract<GatewayDispatchPayload, { t: E }>["d"]) => unknown) | undefined;
}

/**
 * Represents the settings required to initialize a client.
 *
 * This type extends `RestSettings` and adds an additional property `intents` to manage
 * the events the client will listen to.
 */
export type ClientSettings = RestSettings & { intents: number };

/**
 * Represents the main bot client.
 *
 * This class encapsulates the client settings, shard management, event handling, and
 * communication with the Discord API via the `Rest` class. It manages the connection
 * and allows interaction with the Discord Gateway.
 */
export class Client {
	/** The settings used to configure the client. */
	public readonly settings: ClientSettings;

	/** The sharding manager responsible for handling multiple shards. */
	public readonly shards: Sharder;

	/** The event handler for managing events. */
	public readonly events: Events;

	/** The `Rest` instance for interacting with the Discord API. */
	public readonly rest: Rest;

	/**
	 * Creates a new client instance with the provided settings.
	 *
	 * @param settings The settings used to configure the client.
	 */
	public constructor(settings: ClientSettings) {
		this.settings = settings;
		this.shards = new Sharder(this);
		this.events = new Dictionary() as Events;
		this.rest = new Rest(settings);
	}

	/** Connects the client by establishing a connection with the Discord Gateway. */
	public connect(): void {
		this.shards.connect();
	}
}
