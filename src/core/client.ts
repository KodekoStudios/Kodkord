import { UserManager } from "@structures/managers/user.manager";
import { APIHandler, type ApiHandlerOptions } from "./api.handler";

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
	public readonly users: UserManager;
	protected options: ClientOptions;

	/**
	 * Creates an instance of Client.
	 *
	 * @param options Options for configuring the client
	 */
	constructor(options: ClientOptions) {
		this.options = options;
		this.APIHandler = new APIHandler(options);
		this.users = new UserManager(this);
	}
}
