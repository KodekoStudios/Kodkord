import type { Nullable } from "@types";
import type {
	APIGuildCategoryChannel,
	APIGuildForumChannel,
	ChannelType,
	SortOrderType,
} from "discord-api-types/v10";
import { BaseGuildChannel } from "../base.channel";

/**
 * Represents a forum channel in a guild.
 * Forum channels are used to organize discussions into threads, making them ideal for long-form conversations.
 */
export class GuildForumChannel extends BaseGuildChannel {
	/** The channel type, always `GuildForum`. */
	declare type: ChannelType.GuildForum;

	/** The raw API data for the forum channel. */
	declare data: APIGuildForumChannel;

	/**
	 * Retrieves the name of the forum channel.
	 * @returns A string representing the channel's name.
	 */
	public get name(): string {
		return this.data.name;
	}

	/**
	 * The position of this channel in the guild's channel list.
	 * @returns A number representing the position, or `null` if unavailable.
	 */
	public get position(): Nullable<number> {
		return this.data.position;
	}

	/**
	 * Retrieves the ID of the guild this forum channel belongs to.
	 * @returns A string representing the guild ID, or `null` if unavailable.
	 */
	public get guildId(): Nullable<string> {
		return this.data.guild_id;
	}

	/**
	 * The ID of the parent category, if this channel is nested within another.
	 * @returns A string representing the parent channel ID, or `null` if unavailable.
	 */
	public get parentId(): Nullable<string> {
		return this.data.parent_id;
	}

	/**
	 * The permission overwrites set for this channel.
	 * @returns An array of permission overwrites.
	 */
	public get permissionOverwrites(): APIGuildCategoryChannel["permission_overwrites"] {
		return this.data.permission_overwrites;
	}

	/**
	 * Whether the channel is marked as NSFW (Not Safe For Work).
	 * @returns `true` if NSFW, `false` otherwise, or `null` if unavailable.
	 */
	public get nsfw(): Nullable<boolean> {
		return this.data.nsfw;
	}

	/**
	 * The flags set for this channel, used for additional channel configurations.
	 * @returns A number representing the flags, or `null` if unavailable.
	 */
	public get flags(): Nullable<number> {
		return this.data.flags;
	}

	/**
	 * The rate limit (in seconds) per user for creating threads in this channel.
	 * @returns A number representing the rate limit, or `0` if no limit is set.
	 */
	public get rateLimitPerUser(): number {
		return this.data.rate_limit_per_user ?? 0;
	}

	/**
	 * The ID of the last message sent in this channel, if applicable.
	 * @returns A string representing the last message ID, or `null` if unavailable.
	 */
	public get lastMessageId(): Nullable<string> {
		return this.data.last_message_id;
	}

	/**
	 * The topic of this forum channel, often used as a description or purpose.
	 * @returns A string representing the topic, or `null` if unavailable.
	 */
	public get topic(): Nullable<string> {
		return this.data.topic;
	}

	/**
	 * The default auto-archive duration (in minutes) for threads in this forum channel.
	 * @returns A number representing the duration, or `null` if unavailable.
	 */
	public get defaultAutoArchiveDuration(): Nullable<number> {
		return this.data.default_auto_archive_duration;
	}

	/**
	 * The default rate limit (in seconds) per user for posting in threads within this channel.
	 * @returns A number representing the rate limit, or `null` if unavailable.
	 */
	public get defaultThreadRateLimitPerUser(): Nullable<number> {
		return this.data.default_thread_rate_limit_per_user;
	}

	/**
	 * The default sort order for threads in this forum channel.
	 * @returns A `SortOrderType` representing the sort order, or `null` if not set.
	 */
	public get defaultSortOrder(): Nullable<SortOrderType> {
		return this.data.default_sort_order;
	}

	/**
	 * The default reaction emoji for threads in this forum channel.
	 * This is used to encourage or guide user engagement.
	 * @returns The emoji data, or `null` if not set.
	 */
	public get defaultReactionEmoji(): Nullable<APIGuildForumChannel["default_reaction_emoji"]> {
		return this.data.default_reaction_emoji;
	}
}
