import type { Nullable } from "@types";
import { type APINewsChannel, ChannelType } from "discord-api-types/v10";
import { ReadonlyChannel } from "../channel";
import { GuildChannel } from "../guild.channel";

/**
 * Represents a news channel (also called announcement channel) in a Discord guild.
 * News channels are used to broadcast important announcements to guild members.
 */
export class GuildNewsChannel extends GuildChannel<ChannelType.GuildAnnouncement> {
	/** The raw API data for the news channel. */
	public declare readonly data: APINewsChannel;

	/**
	 * Retrieves the Id of the guild this news channel belongs to.
	 *
	 * @returns A string representing the guild Id, or `null` if unavailable.
	 */
	public get guildId(): Nullable<string> {
		return this.data.guild_id;
	}

	/**
	 * The topic of the news channel, which typically serves as a description of the channel's purpose.
	 *
	 * @returns A string representing the channel topic, or `null` if not set.
	 */
	public get topic(): Nullable<string> {
		return this.data.topic;
	}

	/**
	 * The Id of the last message sent in this news channel.
	 *
	 * @returns A string representing the last message Id, or `null` if no message has been sent.
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

	static {
		// @ts-expect-error
		ReadonlyChannel.Channels[ChannelType.GuildAnnouncement] = GuildNewsChannel;
	}
}
