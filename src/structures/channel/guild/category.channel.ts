import type { Nullable } from "@types";
import {
	type APIGuildCategoryChannel,
	type APIOverwrite,
	ChannelType,
} from "discord-api-types/v10";
import { ReadonlyChannel } from "../channel";
import { GuildChannel } from "../guild.channel";

/**
 * Represents a category channel within a guild.
 * A category channel can contain other channels as its children.
 */
export class GuildCategoryChannel extends GuildChannel<ChannelType.GuildCategory> {
	/** The raw API data for the guild category channel. */
	public declare readonly data: APIGuildCategoryChannel;

	/**
	 * Retrieves the name of the category channel.
	 *
	 * @returns The name as a string.
	 */
	// declare get name(): string;

	/**
	 * Retrieves the position of the category channel in the channel list.
	 *
	 * @returns The position as a number, or null if unavailable.
	 */
	public get position(): Nullable<number> {
		return this.data.position;
	}

	/**
	 * Retrieves the Id of the guild where this category channel belongs.
	 *
	 * @returns The guild Id as a string, or null if unavailable.
	 */
	public get guildId(): Nullable<string> {
		return this.data.guild_id;
	}

	/**
	 * Retrieves the Id of the parent channel, if any.
	 *
	 * @returns The parent channel Id as a string, or null if unavailable.
	 */
	public get parentId(): Nullable<string> {
		return this.data.parent_id;
	}

	/**
	 * Retrieves the permission overwrites for the category channel.
	 *
	 * @returns An array of permission overwrites.
	 */
	public get permissionOverwrites(): APIOverwrite[] | undefined {
		return this.data.permission_overwrites;
	}

	/**
	 * Checks whether the category channel is marked as NSFW (Not Safe For Work).
	 *
	 * @returns True if the channel is NSFW, false otherwise, or null if unavailable.
	 */
	public get nsfw(): Nullable<boolean> {
		return this.data.nsfw;
	}

	/**
	 * Retrieves the flags for the category channel.
	 *
	 * @returns The flags as a number, or null if unavailable.
	 */
	public get flags(): Nullable<number> {
		return this.data.flags;
	}

	static {
		// @ts-expect-error
		ReadonlyChannel.Channels[ChannelType.GuildCategory] = GuildCategoryChannel;
	}
}
