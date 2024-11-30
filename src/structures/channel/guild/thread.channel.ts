import type { Nullable } from "@types";
import type { APIGuildCategoryChannel, APIThreadChannel, ChannelType } from "discord-api-types/v10";
import { GuildChannel } from "../guild.channel";

/**
 * Represents a thread channel in a Discord guild.
 * Thread channels allow users to have discussions separate from the main chat.
 */
export class GuildThreadChannel extends GuildChannel<
	ChannelType.PublicThread | ChannelType.PrivateThread | ChannelType.AnnouncementThread
> {
	/** The raw API data for the thread channel. */
	public declare readonly data: APIThreadChannel;

	/**
	 * Retrieves the name of the thread channel.
	 * @returns A string representing the name of the channel.
	 */
	public override get name(): string {
		return this.data.name;
	}

	/**
	 * Retrieves the member data associated with this thread.
	 * @returns The member data from the thread, potentially containing information about the user's participation.
	 */
	public get member(): APIThreadChannel["member"] {
		// This would be a new Member instance in a more complete implementation.
		return this.data.member;
	}

	/**
	 * Retrieves the position of the thread channel in the guild's channel hierarchy.
	 * @returns A nullable number representing the position or `null` if not set.
	 */
	public get position(): Nullable<number> {
		return this.data.position;
	}

	/**
	 * Retrieves the ID of the guild this thread channel belongs to.
	 * @returns A string representing the guild ID, or `null` if unavailable.
	 */
	public get guildId(): Nullable<string> {
		return this.data.guild_id;
	}

	/**
	 * Retrieves the ID of the owner of the thread.
	 * @returns A string representing the owner ID, or `null` if unavailable.
	 */
	public get ownerId(): Nullable<string> {
		return this.data.owner_id;
	}

	/**
	 * Retrieves the ID of the parent channel this thread belongs to.
	 * @returns A string representing the parent channel ID, or `null` if unavailable.
	 */
	public get parentId(): Nullable<string> {
		return this.data.parent_id;
	}

	/**
	 * Retrieves the permission overwrites for this thread channel.
	 * @returns The permission overwrites associated with the channel.
	 */
	public get permissionOverwrites(): APIGuildCategoryChannel["permission_overwrites"] {
		return this.data.permission_overwrites;
	}

	/**
	 * Checks whether the thread is marked as NSFW (Not Safe For Work).
	 * @returns A nullable boolean indicating if the thread is NSFW.
	 */
	public get nsfw(): Nullable<boolean> {
		return this.data.nsfw;
	}

	/**
	 * Retrieves the flags associated with the thread channel.
	 * @returns A nullable number representing the flags or `null` if not set.
	 */
	public get flags(): Nullable<number> {
		return this.data.flags;
	}

	/**
	 * Retrieves metadata about the thread.
	 * @returns The metadata associated with the thread.
	 */
	public get threadMetadata(): APIThreadChannel["thread_metadata"] {
		return this.data.thread_metadata;
	}

	/**
	 * Retrieves the rate limit per user for sending messages in this thread.
	 * @returns A number representing the rate limit per user in seconds, or `0` if no rate limit is set.
	 */
	public get rateLimitPerUser(): number {
		return this.data.rate_limit_per_user ?? 0;
	}

	/**
	 * Retrieves the ID of the last message sent in the thread.
	 * @returns A string representing the last message ID, or `null` if no messages have been sent.
	 */
	public get lastMessageId(): Nullable<string> {
		return this.data.last_message_id;
	}

	/**
	 * Retrieves the number of messages in the thread.
	 * @returns A number representing the total number of messages, or `0` if none.
	 */
	public get messageCount(): number {
		return this.data.message_count ?? 0;
	}

	/**
	 * Retrieves the number of members participating in the thread.
	 * @returns A number representing the member count, or `0` if none.
	 */
	public get memberCount(): number {
		return this.data.member_count ?? 0;
	}

	/**
	 * Retrieves the tags applied to the thread.
	 * @returns A list of applied tags for this thread.
	 */
	public get appliedTags(): APIThreadChannel["applied_tags"] {
		return this.data.applied_tags;
	}

	/**
	 * Retrieves the timestamp of the last pinned message in the thread.
	 * @returns A nullable `Date` object representing the last pin timestamp, or `null` if not pinned.
	 */
	public get lastPinTimestamp(): Nullable<Date> {
		return this.data.last_pin_timestamp ? new Date(this.data.last_pin_timestamp) : null;
	}
}
