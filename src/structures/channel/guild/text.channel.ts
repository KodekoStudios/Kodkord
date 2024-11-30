import type { Nullable } from "@types";
import type { APITextChannel, ChannelType } from "discord-api-types/v10";
import { GuildChannel } from "../base.channel";

/**
 * Represents a text channel in a Discord guild.
 * Text channels are used for general chat and communication within a guild.
 */
export class GuildTextChannel extends GuildChannel<ChannelType.GuildText> {
	/** The raw API data for the text channel. */
	public declare readonly data: APITextChannel;

	/**
	 * Retrieves the ID of the guild this text channel belongs to.
	 * @returns A string representing the guild ID, or `null` if unavailable.
	 */
	public get guildId(): Nullable<string> {
		return this.data.guild_id;
	}

	/**
	 * The topic of the text channel, which typically serves as a description or purpose for the channel.
	 * @returns A string representing the channel topic, or `null` if not set.
	 */
	public get topic(): Nullable<string> {
		return this.data.topic;
	}

	/**
	 * The ID of the last message sent in this text channel.
	 * @returns A string representing the last message ID, or `null` if no message has been sent.
	 */
	public get lastMessageId(): Nullable<string> {
		return this.data.last_message_id;
	}

	/**
	 * The rate limit (in seconds) applied to users for sending messages in this text channel.
	 * @returns A number representing the rate limit, or `0` if no limit is set.
	 */
	public get rateLimitPerUser(): number {
		return this.data.rate_limit_per_user ?? 0;
	}
}
