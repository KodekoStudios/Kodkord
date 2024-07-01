import { Base } from "@structures/base";
import type { Nullable } from "@types";
import type { APIGuildChannel, ChannelType, Snowflake } from "discord-api-types/v10";

/**
 * Represents a base channel with common properties for all channel types.
 */
export abstract class BaseChannel<T extends APIGuildChannel<ChannelType>> extends Base<T> {
	/**
	 * The name of the channel.
	 */
	public get name(): string {
		return this.data.name;
	}

	/**
	 * The ID of the guild that owns this channel.
	 */
	public get guildId(): Nullable<Snowflake> {
		return this.data.guild_id;
	}

	/**
	 * Whether the channel is marked as NSFW (Not Safe For Work).
	 */
	public get nsfw(): boolean {
		return this.data.nsfw ?? false;
	}

	/**
	 * The position of the channel in the list of channels within the guild.
	 */
	public get position(): number {
		return this.data.position;
	}

	/**
	 * The Id of the parent category channel, if this channel is a child of a category.
	 */
	public get parentId(): Snowflake | null {
		return this.data.parent_id ?? null;
	}
}
