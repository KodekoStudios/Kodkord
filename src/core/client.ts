import { Logger } from "@common/logger";
import { ChannelManager } from "@structures/managers/channel.manager";
import { CommandManager } from "@structures/managers/command.manager";
import { EventManager } from "@structures/managers/event.manager";
import { UserManager } from "@structures/managers/user.manager";
import type { Message } from "@structures/message/message";
import { User } from "@structures/user/user";
import type { ProbablyPromise } from "@types";
import type { GatewayDispatchPayload } from "discord-api-types/v10";
import { APIHandler, type ApiHandlerOptions } from "./api.handler";
import { ShardManager } from "./sharding/shard.manager";

/**
 * Configuration options for the Discord Client.
 */
export interface ClientOptions extends ApiHandlerOptions {
	/** The default command prefix(es) used by the client. */
	defaultPrefix?: string[];

	/** Custom handlers for the client, such as prefix resolution. */
	handlers?: {
		/** Function to determine the prefix based on the message content. */
		prefix?: (message: Message) => ProbablyPromise<string[]>;
	};

	/** The bitmask representing the intents for the WebSocket connection. */
	intents?: number;
}

/**
 * A Discord Client that interacts with the Discord API for sending and receiving data.
 */
export class Client {
	/** The logger used for logging messages. */
	public readonly logger: Logger;

	/** The options used to configure the client. */
	public readonly options: ClientOptions;

	/** The API handler used for making requests to the Discord API. */
	public readonly APIHandler: APIHandler;

	/** The WebSocket connection to Discord's gateway for real-time events. */
	public declare ws: ShardManager;

	/** The command manager responsible for managing client commands. */
	public commands: CommandManager;

	/** The event manager responsible for managing event listeners and dispatching events. */
	public readonly events: EventManager;

	/** The user manager responsible for managing user-related operations. */
	public readonly users: UserManager;

	/** The channel manager responsible for managing channel-related operations. */
	public readonly channels: ChannelManager;

	/** The current user (bot or application) associated with this client. */
	public declare me: User;

	/**
	 * The bot's ID.
	 */
	public declare botId: string;

	/**
	 * The bot's application ID.
	 */
	public declare applicationId: string;

	/**
	 * Constructs a new instance of the Client class.
	 *
	 * @param options Configuration options for the client.
	 */
	public constructor(options: ClientOptions) {
		this.options = options;

		this.APIHandler = new APIHandler(options);

		this.users = new UserManager(this);
		this.channels = new ChannelManager(this);
		this.events = new EventManager(this);
		this.commands = new CommandManager(this);

		this.logger = new Logger({ from: "CLIENT" });
	}

	/**
	 * Handles incoming packets received from the WebSocket connection.
	 * Processes events like 'READY' and 'MESSAGE_CREATE'.
	 *
	 * @param _shardId The ID of the shard that received the packet.
	 * @param packet The dispatch payload received from Discord.
	 */
	protected async onPacket(shardId: number, packet: GatewayDispatchPayload): Promise<void> {
		if (packet.t === "READY") {
			this.me = new User(packet.d.user, this);
			// this.applicationId = packet.d.application.id;
			// this.botId = packet.d.user.id;

			// this.options.debug
			// 	? this.logger.debug(`#${shardId}[${packet.d.user.username}](${this.botId}) is online...`)
			// 	: null;

			// await this.events.get(packet.t)(packet.d, this);
		}

		if (packet.t === "MESSAGE_CREATE") {
			await this.events.get(packet.t)(packet.d, this); // 🔥🔥
			await this.commands.message(packet.d);
		}
	}

	/**
	 * Connects the client to the Discord gateway via WebSocket.
	 * Initiates real-time communication and starts event processing.
	 */
	public async connect(): Promise<void> {
		this.ws = new ShardManager({
			token: this.options.token,
			intents: this.options.intents ?? 0,
			info: await this.APIHandler.get("/gateway/bot"),
			handlePayload: async (shardId, packet): Promise<void> => await this.onPacket(shardId, packet),
		});

		await this.ws.spawnShards();
	}
}
