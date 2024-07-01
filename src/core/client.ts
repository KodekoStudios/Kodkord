import { CommandManager } from "@structures/managers/command.manager";
import { EventManager } from "@structures/managers/event.manager";
import { UserManager } from "@structures/managers/user.manager";
import type { Message } from "@structures/message/message";
import type { ProbablyPromise } from "@types";
import type { APIUser, GatewayDispatchPayload } from "discord-api-types/v10";
import { APIHandler, type ApiHandlerOptions } from "./api.handler";
import { WebSocket } from "./web.socket";

/**
 * Options for configuring the Client.
 */
export interface ClientOptions extends ApiHandlerOptions {
	defaultPrefix?: string[];
	handlers?: {
		prefix?: (message: Message) => ProbablyPromise<string[]>;
	};
	intents?: number;
}

/**
 * A basic Discord Client for interacting with the Discord API.
 */
export class Client {
	/** The options for configuring the client. */
	public readonly options: ClientOptions;

	/** The API handler for interacting with the Discord API. */
	public readonly APIHandler: APIHandler;

	/** The WebSocket connection to the Discord gateway. */
	public readonly ws: WebSocket;

	/** The command manager for managing commands. */
	public readonly commands: CommandManager;

	/** The event manager for managing events. */
	public readonly events: EventManager;

	/** The user manager for managing users. */
	public readonly users: UserManager;

	/**
	 * The app's user object.
	 */
	public declare me: APIUser;

	/**
	 * Creates an instance of Client.
	 *
	 * @param options Options for configuring the client.
	 */
	constructor(options: ClientOptions) {
		this.options = options;

		this.APIHandler = new APIHandler(options);

		this.ws = new WebSocket(this, { token: options.token, intents: options.intents ?? 0 });
		this.ws.handleDispatch = async (packet) => await this.onPacket(packet);

		this.users = new UserManager(this);
		this.events = new EventManager(this);
		this.commands = new CommandManager(this);
	}

	// /**
	//  * Connects the client to the WebSocket.
	//  */
	// async connect() {
	// 	this.ws.connect();
	// }

	/**
	 * Handles a packet received from the WebSocket.
	 *
	 * @param packet The packet received from the WebSocket.
	 */
	async onPacket(packet: GatewayDispatchPayload) {
		if (packet.t === "READY") {
			this.me = packet.d.user;
		}

		if (packet.t === "MESSAGE_CREATE") {
			await this.commands.message(packet.d);
		}
	}
}
