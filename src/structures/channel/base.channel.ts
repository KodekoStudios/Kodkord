import { Base } from "@structures/base";
import type { Nullable } from "@types";
import type { APIGuildChannel, ChannelType, Snowflake } from "discord-api-types/v10";

/**
 * Abstract class representing a base guild channel.
 * Provides common properties shared across all types of channels in a guild.
 *
 * @template T The specific type of channel (e.g., text, voice, category) extending from `APIGuildChannel`.
 */
export abstract class BaseChannel<T extends APIGuildChannel<ChannelType>> extends Base<T> {
	/**
	 * Retrieves the name of the channel.
	 *
	 * @returns The channel's name.
	 */
	public get name(): string {
		return this.data.name;
	}

	/**
	 * Retrieves the ID of the guild this channel belongs to.
	 *
	 * @returns The guild ID, or `null` if the channel is not part of a guild.
	 */
	public get guildId(): Nullable<Snowflake> {
		return this.data.guild_id;
	}

	/**
	 * Indicates whether the channel is marked as NSFW (Not Safe For Work).
	 *
	 * @returns `true` if the channel is NSFW, `false` otherwise.
	 */
	public get nsfw(): boolean {
		return this.data.nsfw ?? false;
	}

	/**
	 * Retrieves the position of this channel in the guild's channel list.
	 *
	 * @returns The position of the channel.
	 */
	public get position(): number {
		return this.data.position;
	}

	/**
	 * Retrieves the ID of the parent category channel, if this channel is nested under a category.
	 *
	 * @returns The ID of the parent category, or `null` if there is no parent.
	 */
	public get parentId(): Snowflake | null {
		return this.data.parent_id ?? null;
	}
}
