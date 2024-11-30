import type { Dictionary } from "@common/dictionary";
import type { Client } from "@core/client";
import { Message } from "@structures/message/message";
import type { GatewayMessageCreateDispatchData } from "discord-api-types/v10";
import { BaseManager } from "./base.manager";

/**
 * Represents a command to be executed when invoked.
 */
export interface Command {
	/** The name of the command. */
	name: string;

	/** The function to execute when the command is invoked. */
	run: (message: Message) => void;
}

/**
 * Manages and handles client commands.
 */
export class CommandManager extends BaseManager<Command> {
	/** A dictionary to storage registered commands by their names. */
	declare storage: Dictionary<string, Command>;

	/**
	 * Constructs a new instance of the CommandManager class.
	 *
	 * @param client The client instance that this manager belongs to.
	 */
	constructor(client: Client) {
		super(client, "COMMAND MANAGER");
	}

	/**
	 * Registers a new command in the command storage.
	 *
	 * @param command The command to be registered.
	 */
	async set(command: Command) {
		this.storage.set(command.name, command);
	}

	/**
	 * Handles incoming messages from Discord to detect and process commands.
	 *
	 * @param rawMessage The raw message data received from the Discord gateway.
	 */
	async message(rawMessage: GatewayMessageCreateDispatchData) {
		const client = this.client;
		const message = new Message(rawMessage, this.client);

		// Get default prefixes and dynamically handle custom prefix resolution.
		const prefixes = client.options.defaultPrefix ?? [];
		if (client.options.handlers?.prefix) {
			const customPrefixes = await client.options.handlers.prefix(message);
			prefixes.push(...customPrefixes);
		}

		// Sort prefixes to match the longest prefix first.
		const prefix = prefixes
			.sort((a, b) => b.length - a.length)
			.find((x) => rawMessage.content.startsWith(x));

		// Exit if no valid prefix is found.
		if (!prefix) {
			return;
		}

		// Extract the command from the message content by removing the prefix.
		const content = rawMessage.content.slice(prefix.length).trimStart();
		this.debugger?.debug("Command Detected.", `Content: ${content}`, `Prefix: ${prefix}`);

		// Attempt to retrieve and execute the corresponding command.
		this.storage.get(content.split(/\s+/)[0])?.run(message);
	}
}
