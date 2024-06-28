import { EventManager, type EventNames } from "@structures/managers/event.manager";
import { UserManager } from "@structures/managers/user.manager";
import { APIHandler, type ApiHandlerOptions } from "./api.handler";
import { WebSocket } from "./web.socket";

/**
 * Options for configuring the Client.
 */
export interface ClientOptions extends ApiHandlerOptions {
	intents?: number;
}

/**
 * A basic Discord Client for interacting with the Discord API.
 */
export class Client {
	public readonly APIHandler: APIHandler;
	public readonly ws: WebSocket;

	public readonly users: UserManager;
	public readonly events: EventManager<EventNames>;

	protected options: ClientOptions;

	/**
	 * Creates an instance of Client.
	 *
	 * @param options Options for configuring the client
	 */
	constructor(options: ClientOptions) {
		this.options = options;
		this.APIHandler = new APIHandler(options);
		this.ws = new WebSocket({ token: options.token, intents: options.intents ?? 0 });
		this.users = new UserManager(this);
		this.events = new EventManager(this);
	}

	/**
	 * Connects the client to the WebSocket.
	 */
	async connect() {
		this.ws.connect();
	}
}
