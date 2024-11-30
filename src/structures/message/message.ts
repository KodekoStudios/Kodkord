import { Base } from "@structures/base";
import type { APIMessage, APIUser } from "discord-api-types/v10";

/**
 * Represents a base message.
 * @template T The type of the underlying API message.
 */
export abstract class Message extends Base<APIMessage> {
	/**
	 * Gets the content of the message.
	 */
	public get content(): string {
		return this.data.content;
	}

	/**
	 * Gets the author of the message.
	 */
	public get author(): APIUser {
		return this.data.author;
	}

	/**
	 * Gets the ID of the channel where the message was sent.
	 */
	public get channelId(): string {
		return this.data.channel_id;
	}
}
