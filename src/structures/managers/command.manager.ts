import type { Dictionary } from "@common/dictionary";
import type { Client } from "@core/client";
import { Message } from "@structures/message/message";
import type { GatewayMessageCreateDispatchData } from "discord-api-types/v10";
import { BaseManager } from "./base.manager";

interface Command {
	name: string;
	execute: (message: Message) => void;
}

/**
 * Manages commands for the client.
 */
export class CommandManager extends BaseManager<Command> {
	/** The dictionary to store commands. */
	declare store: Dictionary<string, Command>;

	/**
	 * Creates a new instance of the CommandManager class.
	 *
	 * @param client The client instance.
	 */
	constructor(client: Client) {
		super(client, "COMMAND MANAGER");
	}

	async set(command: Command) {
		this.store.set(command.name, command);
	}

	/**
	 * Handles incoming messages and detects commands.
	 *
	 * @param rawMessage The raw message data from the gateway.
	 */
	async message(rawMessage: GatewayMessageCreateDispatchData) {
		const client = this.client;

		const message = new Message(rawMessage, this.client);

		const prefixes = client.options.defaultPrefix ?? [];
		if (client.options.handlers?.prefix) {
			prefixes.push(...(await client.options.handlers.prefix(message)));
		}

		const sorted_prefixes = prefixes.sort((a, b) => b.length - a.length);
		const prefix = sorted_prefixes.find((x) => rawMessage.content.startsWith(x));

		if (!(prefix !== undefined && rawMessage.content.startsWith(prefix))) {
			return;
		}

		const content = rawMessage.content.slice(prefix.length).trimStart();

		this.logger.inform("Command Detected.\n", `Content: ${content}\n`, `Prefix: ${prefix}`)

		const command = this.store.get(content);

		if (command) {
			command.execute(message);
		}

	}
}