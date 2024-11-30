import type { Dictionary } from "@common/dictionary";
import type { Client } from "@core/client";
import { Message } from "@structures/message/message";
import type { GatewayMessageCreateDispatchData } from "discord-api-types/v10";
import { Manager } from "./manager";

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
export class CommandManager extends Manager<Command> {
	/** A dictionary to storage registered commands by their names. */
	public declare storage: Dictionary<string, Command>;

	/**
	 * Constructs a new instance of the CommandManager class.
	 *
	 * @param client The client instance that this manager belongs to.
	 */
	public constructor(client: Client) {
		super(client, "COMMAND MANAGER");
	}

	/**
	 * Registers a new command in the command storage.
	 *
	 * @param command The command to be registered.
	 */
	public set(command: Command): void {
		this.storage.set(command.name, command);
	}

	/**
	 * Handles incoming messages from Discord to detect and process commands.
	 *
	 * @param rawMessage The raw message data received from the Discord gateway.
	 */
	public async message(rawMessage: GatewayMessageCreateDispatchData): Promise<void> {
		const CLIENT = this.client;
		const MESSAGE = new Message(rawMessage, this.client);

		// Get default prefixes and dynamically handle custom prefix resolution.
		const PREFIXES = CLIENT.options.defaultPrefix ?? [];
		if (CLIENT.options.handlers?.prefix) {
			const CUSTOM_PREFIXES = await CLIENT.options.handlers.prefix(MESSAGE);
			PREFIXES.push(...CUSTOM_PREFIXES);
		}

		// Sort prefixes to match the longest prefix first.
		const PREFIX = PREFIXES.sort((a, b) => b.length - a.length).find((x) =>
			rawMessage.content.startsWith(x),
		);

		// Exit if no valid prefix is found.
		if (!PREFIX) {
			return;
		}

		// Extract the command from the message content by removing the prefix.
		const CONTENT = rawMessage.content.slice(PREFIX.length).trimStart();
		this.logger.debug("Command Detected.", `Content: ${CONTENT}`, `Prefix: ${PREFIX}`);

		// Attempt to retrieve and execute the corresponding command.
		this.storage.get(CONTENT.split(/\s+/)[0])?.run(MESSAGE);
	}
}
