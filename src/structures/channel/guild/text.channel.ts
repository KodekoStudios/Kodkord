import type { Nullable } from "@types";
import type { APITextChannel } from "discord-api-types/v10";
import { BaseChannel } from "../base.channel";

/**
 * Represents a text channel in a Discord guild.
 */
export class GuildTextChannel extends BaseChannel<APITextChannel> {
	/**
	 * The topic of the text channel.
	 */
	public get topic(): Nullable<string> {
		return this.data.topic;
	}

	/**
	 * The ID of the last message sent in this channel.
	 */
	public get lastMessageId(): Nullable<string> {
		return this.data.last_message_id;
	}

	/**
	 * The rate limit per user for sending messages in this channel, in seconds.
	 */
	public get rateLimitPerUser(): number {
		return this.data.rate_limit_per_user ?? 0;
	}
}
