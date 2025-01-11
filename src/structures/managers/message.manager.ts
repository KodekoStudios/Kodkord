import type { Client } from "@core/client";
import type { Snowflake } from "discord-api-types/globals";
import { type APIMessage, type MessageType, Routes } from "discord-api-types/v10";
import { Message } from "../message/message";
import { Manager } from "./manager";

export class MessageManager extends Manager<Message<MessageType>> {
	public constructor(client: Client) {
		super(client, "MESSAGE MANAGER");
	}

	public get(messageId: Snowflake): Message<MessageType> | undefined {
		return this.storage.get(messageId);
	}

	public has(messageId: Snowflake): boolean {
		return this.storage.has(messageId);
	}

	public remove(userId: Snowflake): boolean {
		return this.storage.delete(userId);
	}

	public filter(predicate: (message: Message<MessageType>) => boolean): Message<MessageType>[] {
		return [...this.storage.values()].filter(predicate);
	}

	public clear(): void {
		this.storage.clear();
	}

	public async refetch(onError: (error: Error) => void): Promise<Message<MessageType>[]> {
		const MESSAGES = await Promise.all(
			[...this.storage.values()].map(async (message) => {
				try {
					return await this.fetch(message.channelId, message.id);
				} catch (error) {
					// Call the onError callback if provided
					if (onError) {
						onError(error as Error);
					}
					return undefined; // or handle the error as needed
				}
			}),
		);

		return MESSAGES.filter((message): message is Message => message !== undefined); // Filter out undefined results
	}

	public async fetch(
		channelId: Snowflake,
		messageId: Snowflake,
		force = false,
	): Promise<Message<MessageType>> {
		// Check if the message is already in the storage and not forced to fetch
		if (!force && this.storage.has(messageId)) {
			return this.storage.get(messageId) as Message;
		}

		try {
			const API_MESSAGE = await this.client.APIHandler.get<APIMessage>(
				Routes.channelMessage(channelId, messageId),
			);
			const MESSAGE = new Message<MessageType>(API_MESSAGE, this.client);
			this.storage.set(MESSAGE.id, MESSAGE);
			return MESSAGE;
		} catch (error) {
			this.logger.throw(`Failed to fetch user with Id ${messageId}`, (error as Error).message);
			throw new Error(`Failed to fetch user with ID ${messageId}: ${(error as Error).message}`); // Improved error handling, this is tecnically unreachable.
		}
	}
}
