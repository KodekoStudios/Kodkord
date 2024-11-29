import type { Client } from "@core/client";

import { type APIChannelBase, type APIGuildChannel, ChannelType } from "discord-api-types/v10";
import { BaseChannel, BaseGuildChannel } from "./base.channel";

import { DMChannel } from "./dm.channel";
import { GuildCategoryChannel } from "./guild/category.channel";
import { GuildDirectoryChannel } from "./guild/directory.channel";
import { GuildForumChannel } from "./guild/forum.channel";
import { GuildMediaChannel } from "./guild/media.channel";
import { GuildNewsChannel } from "./guild/news.channel";
import { GuildStageVoiceChannel } from "./guild/stage.channel";
import { GuildTextChannel } from "./guild/text.channel";
import { GuildThreadChannel } from "./guild/thread.channel";
import { GuildVoiceChannel } from "./guild/voice.channel";

/**
 * Factory function to create a channel instance based on the provided API data and client.
 * @param data - The raw channel data from the API.
 * @param client - The client instance for interacting with Discord.
 * @returns An appropriate channel instance.
 */
export function channelFrom(data: APIChannelBase<ChannelType>, client: Client) {
	switch (data.type) {
		case ChannelType.GuildStageVoice:
			return new GuildStageVoiceChannel(
				data as APIGuildChannel<ChannelType.GuildStageVoice>,
				client,
			);
		case ChannelType.GuildMedia:
			return new GuildMediaChannel(data as APIGuildChannel<ChannelType.GuildMedia>, client);
		case ChannelType.DM:
			return new DMChannel(data, client);
		case ChannelType.GuildForum:
			return new GuildForumChannel(data as APIGuildChannel<ChannelType.GuildForum>, client);
		case ChannelType.AnnouncementThread:
		case ChannelType.PrivateThread:
		case ChannelType.PublicThread:
			return new GuildThreadChannel(
				data as APIGuildChannel<
					ChannelType.PublicThread | ChannelType.PrivateThread | ChannelType.AnnouncementThread
				>,
				client,
			);
		case ChannelType.GuildDirectory:
			return new GuildDirectoryChannel(data as APIGuildChannel<ChannelType.GuildDirectory>, client);
		case ChannelType.GuildVoice:
			return new GuildVoiceChannel(data as APIGuildChannel<ChannelType.GuildVoice>, client);
		case ChannelType.GuildText:
			return new GuildTextChannel(data as APIGuildChannel<ChannelType.GuildText>, client);
		case ChannelType.GuildCategory:
			return new GuildCategoryChannel(data as APIGuildChannel<ChannelType.GuildCategory>, client);
		case ChannelType.GuildAnnouncement:
			return new GuildNewsChannel(data as APIGuildChannel<ChannelType.GuildAnnouncement>, client);
		default:
			// Handle guild-specific or base channels generically
			return "guild_id" in data
				? new BaseGuildChannel(data as APIGuildChannel<ChannelType>, client)
				: new BaseChannel(data as APIChannelBase<ChannelType>, client);
	}
}

export type AllGuildChannels =
	| GuildTextChannel
	| GuildVoiceChannel
	| GuildMediaChannel
	| GuildForumChannel
	| GuildThreadChannel
	| GuildCategoryChannel
	| GuildDirectoryChannel
	| GuildNewsChannel
	| GuildStageVoiceChannel;

export type AllTextableChannels =
	| GuildTextChannel
	| GuildVoiceChannel
	| DMChannel
	| GuildThreadChannel
	| GuildNewsChannel;

export type AllGuildTextableChannels =
	| GuildTextChannel
	| GuildVoiceChannel
	| GuildThreadChannel
	| GuildNewsChannel;

export type AllGuildVoiceChannels = GuildVoiceChannel | GuildStageVoiceChannel;

export type AllChannels =
	| BaseChannel<ChannelType>
	| BaseGuildChannel
	| AllGuildChannels
	| DMChannel;
