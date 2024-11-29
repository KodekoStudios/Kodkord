import type { Nullable } from "@types";
import type { APINewsChannel, ChannelType } from "discord-api-types/v10";
import { BaseGuildChannel } from "../base.channel";

/**
 * Represents a news channel (also called announcement channel) in a Discord guild.
 * News channels are used to broadcast important announcements to guild members.
 */
export class GuildNewsChannel extends BaseGuildChannel {
	/** The channel type, always `GuildAnnouncement`. */
	declare type: ChannelType.GuildAnnouncement;

	/** The raw API data for the news channel. */
	declare data: APINewsChannel;

	/**
	 * Retrieves the ID of the guild this news channel belongs to.
	 * @returns A string representing the guild ID, or `null` if unavailable.
	 */
	public get guildId(): Nullable<string> {
		return this.data.guild_id;
	}

	/**
	 * The topic of the news channel, which typically serves as a description of the channel's purpose.
	 * @returns A string representing the channel topic, or `null` if not set.
	 */
	public get topic(): Nullable<string> {
		return this.data.topic;
	}

	/**
	 * The ID of the last message sent in this news channel.
	 * @returns A string representing the last message ID, or `null` if no message has been sent.
	 */
	public get lastMessageId(): Nullable<string> {
		return this.data.last_message_id;
	}

	/**
	 * The rate limit (in seconds) applied to users for sending messages in this channel.
	 * @returns A number representing the rate limit, or `0` if no limit is set.
	 */
	public get rateLimitPerUser(): number {
		return this.data.rate_limit_per_user ?? 0;
	}
}
