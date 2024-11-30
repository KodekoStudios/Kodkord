import type { Client } from "@core/client";
import { Base } from "@structures/base";
import {
	type APIChannelBase,
	type APIGuildChannel,
	ChannelType,
	type GuildChannelType,
	type RESTPatchAPIChannelJSONBody,
} from "discord-api-types/v10";
import type { AnyChannel, AnyGuildTextableChannel, AnyTextableChannels } from "./channel";
import type { DMChannel } from "./dm.channel";
import type { GuildCategoryChannel } from "./guild/category.channel";
import type { GuildDirectoryChannel } from "./guild/directory.channel";
import type { GuildForumChannel } from "./guild/forum.channel";
import type { GuildMediaChannel } from "./guild/media.channel";
import type { GuildNewsChannel } from "./guild/news.channel";
import type { GuildStageVoiceChannel } from "./guild/stage.channel";
import type { GuildTextChannel } from "./guild/text.channel";
import type { GuildThreadChannel } from "./guild/thread.channel";
import type { GuildVoiceChannel } from "./guild/voice.channel";

/**
 * Base class for channels that are not editable.
 *
 * @template T The specific channel type.
 */
export class ReadonlyChannel<T extends ChannelType> extends Base<APIChannelBase<T>> {
	/**
	 * Determine the intent of the channel based on its Id.
	 *
	 * @param id The channel Id.
	 * @returns The intent of the channel, either "DirectMessages" or "Guilds".
	 */
	public static getIntent(id: string): "DirectMessages" | "Guilds" {
		return id === "@me" ? "DirectMessages" : "Guilds";
	}

	/** The type associated with this channel. */
	public get type(): ChannelType {
		return this.data.type;
	}

	public get name(): APIChannelBase<T>["name"] {
		return this.data.name;
	}

	/** The URL to the channel. */
	public get url(): string {
		return `https://discord.com/channels/${this.id}`;
	}

	/**
	 * Fetches the latest channel data.
	 *
	 * @param force Whether to bypass caching and fetch fresh data.
	 * @returns The fetched channel data.
	 */
	public fetch(force = false): Promise<AnyChannel> {
		return this.client.channels.fetch(this.id, force);
	}

	/**
	 * Deletes the channel.
	 *
	 * @param reason Optional reason for deleting the channel.
	 * @returns A promise resolving when the channel is deleted.
	 */
	public delete(reason?: string): Promise<AnyChannel> {
		return this.client.channels.delete(this.id, reason);
	}

	// I fking don't know how to document this, bleh.
	// /**
	//  * Converts the channel to a string representation.
	//  *
	//  * @returns The string representation of the channel.
	//  */
	public mention(): string {
		return `<#${this.id}>`;
	}

	// Type checks for channel categorization
	public isStage(): this is GuildStageVoiceChannel {
		return this.type === ChannelType.GuildStageVoice;
	}

	public isMedia(): this is GuildMediaChannel {
		return this.type === ChannelType.GuildMedia;
	}

	public isDM(): this is DMChannel {
		// ! Below I give an explanation of why not to do this.
		// ! return [ChannelType.DM, ChannelType.GroupDM].includes(this.type);
		return this.type === ChannelType.DM || this.type === ChannelType.GroupDM;
	}

	public isForum(): this is GuildForumChannel {
		return this.type === ChannelType.GuildForum;
	}

	public isThread(): this is GuildThreadChannel {
		// ! Aaron pls don't do this!!
		// ! These Enum values range from 10 to 12.
		// ! Can be checked with O(1) complexity
		// ! and directly in the CPU without invoking
		// ! additional functions.
		// ! return [
		// ! 	ChannelType.PublicThread,
		// ! 	ChannelType.PrivateThread,
		// ! 	ChannelType.AnnouncementThread,
		// ! ].includes(this.type);
		return this.type >= 10 && this.type <= 12;
	}

	public isDirectory(): this is GuildDirectoryChannel {
		return this.type === ChannelType.GuildDirectory;
	}

	public isVoice(): this is GuildVoiceChannel {
		return this.type === ChannelType.GuildVoice;
	}

	public isTextGuild(): this is GuildTextChannel {
		return this.type === ChannelType.GuildText;
	}

	public isCategory(): this is GuildCategoryChannel {
		return this.type === ChannelType.GuildCategory;
	}

	public isNews(): this is GuildNewsChannel {
		return this.type === ChannelType.GuildAnnouncement;
	}

	public isTextable(): this is AnyTextableChannels {
		return "messages" in this;
	}

	public isGuildTextable(): this is AnyGuildTextableChannel {
		return !this.isDM() && this.isTextable();
	}

	public isThreadOnly(): this is GuildForumChannel | GuildMediaChannel {
		return this.isForum() || this.isMedia();
	}

	/**
	 * Checks if the channel matches one of the specified types.
	 *
	 * @param channelTypes The types to check against.
	 * @returns Whether the channel matches one of the specified types.
	 */
	public is<T extends ChannelType[]>(
		channelTypes: T,
	): this is Extract<AnyChannel, { type: T[number] }> {
		return channelTypes.includes(this.type);
	}
}

/**
 * Represents a base channel.
 */
export class Channel<T extends ChannelType> extends ReadonlyChannel<T> {
	/**
	 * Edits the channel.
	 *
	 * @param body The body to edit the channel with.
	 * @param reason The reason for editing the channel.
	 * @returns The edited channel.
	 */
	public edit(body: RESTPatchAPIChannelJSONBody, reason?: string): Promise<this> {
		// return this.client.channels.edit(this.id, body, {
		// 	guildId: "guildId" in this ? (this.guildId as string) : "@me",
		// 	reason,
		// });
		return this.client.channels.edit(this.id, body, reason) as Promise<this>;
	}
}

/**
 * Represents a base guild channel.
 */
export class GuildChannel<T extends GuildChannelType> extends Channel<T> {
	public constructor(data: APIGuildChannel<T>, client: Client) {
		const { permission_overwrites, ...REST } = data;
		super(REST, client);
	}

	/**
	 * Sets the position of the channel.
	 *
	 * @param position The new position.
	 * @param reason The reason for this action.
	 * @returns The updated channel object.
	 */
	public setPosition(position: number, reason?: string): Promise<this> {
		return this.edit({ position }, reason);
	}

	/**
	 * Sets the name of the channel.
	 *
	 * @param name The new name of the channel.
	 * @param reason The reason for this action.
	 * @returns The updated channel object.
	 */
	public setName(name: string, reason?: string): Promise<this> {
		return this.edit({ name }, reason);
	}

	/**
	 * Sets the parent of the channel.
	 *
	 * @param parentId The new parent of the channel.
	 * @param reason The reason for this action.
	 * @returns The updated channel object.
	 */
	public setParent(parentId: string | null, reason?: string): Promise<this> {
		return this.edit({ parent_id: parentId }, reason);
	}
}
