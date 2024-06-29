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
	public readonly APIHandler: APIHandler;
	public readonly ws: WebSocket;

	public readonly users: UserManager;
	public readonly events: EventManager;
	public readonly commands: CommandManager;

	public declare me: APIUser;

	readonly options: ClientOptions;

	/**
	 * Creates an instance of Client.
	 *
	 * @param options Options for configuring the client
	 */
	constructor(options: ClientOptions) {
		this.options = options;

		this.APIHandler = new APIHandler(options);

		this.ws = new WebSocket({ token: options.token, intents: options.intents ?? 0 });
		this.ws.handleDispatch = async (packet) => await this.onPacket(packet);

		this.users = new UserManager(this);
		this.events = new EventManager(this);
		this.commands = new CommandManager(this);
	}

	/**
	 * Connects the client to the WebSocket.
	 */
	async connect() {
		this.ws.connect();
	}

	async onPacket(packet: GatewayDispatchPayload) {
		if (packet.t === "READY") {
			this.me = packet.d.user;
		}

		if (packet.t === "MESSAGE_CREATE") {
			await this.commands.message(packet.d);
		}
	}
}
