import type { Client } from "@core/client";
import { Base } from "@structures/base";
import {
	type APIChannelBase,
	type APIGuildChannel,
	ChannelType,
	type RESTPatchAPIChannelJSONBody,
} from "discord-api-types/v10";
import type { AllChannels, AllGuildTextableChannels, AllTextableChannels } from "./channel";
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
 * @template T - The specific channel type.
 */
export class BaseNoEditableChannel<T extends ChannelType> extends Base<
	APIChannelBase<ChannelType>
> {
	declare type: T;

	/**
	 * Determine the intent of the channel based on its ID.
	 * @param id - The channel ID.
	 * @returns The intent of the channel, either "DirectMessages" or "Guilds".
	 */
	static __intent__(id: string): "DirectMessages" | "Guilds" {
		return id === "@me" ? "DirectMessages" : "Guilds";
	}

	/** The URL to the channel. */
	get url(): string {
		return `https://discord.com/channels/${this.id}`;
	}

	/**
	 * Fetches the latest channel data.
	 * @param force - Whether to bypass caching and fetch fresh data.
	 * @returns The fetched channel data.
	 */
	fetch(force = false) {
		return this.client.channels.fetch(this.id, force);
	}

	/**
	 * Deletes the channel.
	 * @param reason - Optional reason for deleting the channel.
	 * @returns A promise resolving when the channel is deleted.
	 */
	delete(reason?: string) {
		return this.client.channels.delete(this.id, { reason });
	}

	/**
	 * Converts the channel to a string representation.
	 * @returns The string representation of the channel.
	 */
	override toString(): string {
		return `<#${this.id}>`;
	}

	// Type checks for channel categorization
	isStage(): this is GuildStageVoiceChannel {
		return this.type === ChannelType.GuildStageVoice;
	}

	isMedia(): this is GuildMediaChannel {
		return this.type === ChannelType.GuildMedia;
	}

	isDM(): this is DMChannel {
		return [ChannelType.DM, ChannelType.GroupDM].includes(this.type);
	}

	isForum(): this is GuildForumChannel {
		return this.type === ChannelType.GuildForum;
	}

	isThread(): this is GuildThreadChannel {
		return [
			ChannelType.PublicThread,
			ChannelType.PrivateThread,
			ChannelType.AnnouncementThread,
		].includes(this.type);
	}

	isDirectory(): this is GuildDirectoryChannel {
		return this.type === ChannelType.GuildDirectory;
	}

	isVoice(): this is GuildVoiceChannel {
		return this.type === ChannelType.GuildVoice;
	}

	isTextGuild(): this is GuildTextChannel {
		return this.type === ChannelType.GuildText;
	}

	isCategory(): this is GuildCategoryChannel {
		return this.type === ChannelType.GuildCategory;
	}

	isNews(): this is GuildNewsChannel {
		return this.type === ChannelType.GuildAnnouncement;
	}

	isTextable(): this is AllTextableChannels {
		return "messages" in this;
	}

	isGuildTextable(): this is AllGuildTextableChannels {
		return !this.isDM() && this.isTextable();
	}

	isThreadOnly(): this is GuildForumChannel | GuildMediaChannel {
		return this.isForum() || this.isMedia();
	}

	/**
	 * Checks if the channel matches one of the specified types.
	 * @param channelTypes - The types to check against.
	 * @returns Whether the channel matches one of the specified types.
	 */
	is<T extends ChannelType[]>(channelTypes: T): this is Extract<AllChannels, { type: T[number] }> {
		return channelTypes.includes(this.type);
	}
}

/**
 * Represents a base channel.
 */
export class BaseChannel<T extends ChannelType> extends BaseNoEditableChannel<T> {
	declare client: Client;

	/**
	 * Edits the channel.
	 *
	 * @param body The body to edit the channel with.
	 * @param reason The reason for editing the channel.
	 * @returns The edited channel.
	 */
	edit(body: RESTPatchAPIChannelJSONBody, reason?: string) {
		return this.client.channels.edit(this.id, body, {
			reason,
			guildId: "guildId" in this ? (this.guildId as string) : "@me",
		});
	}
}

/**
 * Represents a base guild channel.
 */
export class BaseGuildChannel extends BaseChannel<ChannelType> {
	constructor(data: APIGuildChannel<ChannelType>, client: Client) {
		const { permission_overwrites, ...rest } = data;
		super(rest, client);
	}

	/**
	 * The permission overwrites for the channel.
	 * @param position The position of the overwrite.
	 * @param reason The reason for this action.
	 * @returns The updated channel object.
	 */
	setPosition(position: number, reason?: string) {
		return this.edit({ position }, reason);
	}

	/**
	 * Sets the name of the channel.
	 * @param name The new name of the channel.
	 * @param reason The reason for this action.
	 * @returns The updated channel object.
	 */
	setName(name: string, reason?: string) {
		return this.edit({ name }, reason);
	}

	/**
	 * Sets the parent of the channel.
	 * @param parent_id The new parent of the channel.
	 * @param reason The reason for this action.
	 * @returns The updated channel object.
	 */
	setParent(parent_id: string | null, reason?: string) {
		return this.edit({ parent_id }, reason);
	}
}
