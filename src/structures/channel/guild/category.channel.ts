import type { Nullable } from "@types";
import type { APIGuildCategoryChannel, ChannelType } from "discord-api-types/v10";
import { BaseGuildChannel } from "../base.channel";

/**
 * Represents a category channel within a guild.
 * A category channel can contain other channels as its children.
 */
export class GuildCategoryChannel extends BaseGuildChannel {
	/** The channel type, always `GuildCategory`. */
	declare type: ChannelType.GuildCategory;

	/** The raw API data for the guild category channel. */
	declare data: APIGuildCategoryChannel;

	/**
	 * The name of the category channel.
	 * @returns The name as a string.
	 */
	public get name(): string {
		return this.data.name;
	}

	/**
	 * The position of the category in the channel list.
	 * @returns A number representing the position, or `null` if not available.
	 */
	public get position(): Nullable<number> {
		return this.data.position;
	}

	/**
	 * The ID of the guild this category belongs to.
	 * @returns A string representing the guild ID, or `null` if not available.
	 */
	public get guildId(): Nullable<string> {
		return this.data.guild_id;
	}

	/**
	 * The ID of the parent channel, if this category is nested under another.
	 * @returns A string representing the parent channel ID, or `null` if not available.
	 */
	public get parentId(): Nullable<string> {
		return this.data.parent_id;
	}

	/**
	 * The permission overwrites for this category.
	 * @returns An array of permission overwrites.
	 */
	public get permissionOverwrites(): APIGuildCategoryChannel["permission_overwrites"] {
		return this.data.permission_overwrites;
	}

	/**
	 * Whether the category is marked as NSFW (Not Safe For Work).
	 * @returns `true` if NSFW, `false` if not, or `null` if the information is unavailable.
	 */
	public get nsfw(): Nullable<boolean> {
		return this.data.nsfw;
	}

	/**
	 * The flags set for this category channel.
	 * @returns A number representing the flags, or `null` if not available.
	 */
	public get flags(): Nullable<number> {
		return this.data.flags;
	}
}
