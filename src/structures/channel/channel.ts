import type { Client } from "@core/client";
import { Base } from "@structures/base";
import { Message } from "@structures/message/message";
import {
	type APIChannelBase,
	type APIMessage,
	ChannelType,
	type GuildChannelType,
	type RESTPatchAPIChannelJSONBody,
	type RESTPostAPIChannelMessageJSONBody,
	Routes,
} from "discord-api-types/v10";
import type { DMChannel } from "./dm.channel";
import type { GuildChannel } from "./guild.channel";
import type { GuildCategoryChannel } from "./guild/category.channel";
import type { GuildDirectoryChannel } from "./guild/directory.channel";
import type { GuildForumChannel } from "./guild/forum.channel";
import type { GuildMediaChannel } from "./guild/media.channel";
import type { GuildNewsChannel } from "./guild/news.channel";
import type { GuildStageVoiceChannel } from "./guild/stage.channel";
import type { GuildTextChannel } from "./guild/text.channel";
import type { GuildThreadChannel } from "./guild/thread.channel";
import type { GuildVoiceChannel } from "./guild/voice.channel";

export type AnyGuildTextableChannel =
	| GuildTextChannel
	| GuildVoiceChannel
	| GuildThreadChannel
	| GuildNewsChannel;

export type AnyGuildVoiceChannel = GuildVoiceChannel | GuildStageVoiceChannel;

export type AnyGuildChannel =
	| AnyGuildTextableChannel
	| GuildMediaChannel
	| GuildForumChannel
	| GuildCategoryChannel
	| GuildDirectoryChannel
	| GuildStageVoiceChannel;

export type AnyTextableChannels = AnyGuildTextableChannel | DMChannel;

export type AnyChannel =
	| Channel<ChannelType>
	| GuildChannel<GuildChannelType>
	| AnyGuildChannel
	| DMChannel;

/**
 * Class for channels that are non-editable.
 *
 * @template T The specific channel type.
 */
export abstract class ReadonlyChannel<T extends ChannelType> extends Base<APIChannelBase<T>> {
	public static Channels: Record<ChannelType, typeof Channel> = {} as Record<
		ChannelType,
		typeof Channel
	>;
	/**
	 * Factory function to create a channel instance based on the provided API data and client.
	 *
	 * @param data The raw channel data from the API.
	 * @param client The client instance for interacting with Discord.
	 * @returns An appropriate channel instance.
	 */
	public static from<T extends ChannelType>(data: APIChannelBase<T>, client: Client): AnyChannel {
		// @ts-expect-error
		return new ReadonlyChannel.Channels[data.type](data, client);
	}

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
		return this.type !== ChannelType.GuildCategory && this.type !== ChannelType.GuildForum;
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
 * Represents a channel.
 */
export abstract class Channel<T extends ChannelType> extends ReadonlyChannel<T> {
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

	public async postMessage(payload: RESTPostAPIChannelMessageJSONBody): Promise<Message> {
		if (this.isCategory()) {
			throw new Error("Cannot send messages in categoties");
		}

		const RESPONSE = await this.client.APIHandler.post<APIMessage>(
			Routes.channelMessages(this.id),
			{ body: payload },
		);

		return new Message(RESPONSE, this.client);
	}
}
