import type { Client } from "@core/client";

import {
	type APIChannelBase,
	type APIGuildChannel,
	ChannelType,
	type GuildChannelType,
} from "discord-api-types/v10";
import { Channel, GuildChannel } from "./base.channel";

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
 *
 * @param data The raw channel data from the API.
 * @param client The client instance for interacting with Discord.
 * @returns An appropriate channel instance.
 */
export function channelFrom(data: APIChannelBase<ChannelType>, client: Client): AnyChannel {
	// ? Well, this wasn't bad at all, but its performance can be improved using a Record<ChannelType, (...) => ...>.
	// ? I think it would also work with arrays since the keys would be numbers,
	// ? but I don't know how much of an impact the array's built-in methods
	// ? would have on performance.
	switch (data.type) {
		case ChannelType.GuildStageVoice:
			return new GuildStageVoiceChannel(
				data as APIGuildChannel<ChannelType.GuildStageVoice>,
				client,
			);

		case ChannelType.GuildMedia:
			return new GuildMediaChannel(data as APIGuildChannel<ChannelType.GuildMedia>, client);

		case ChannelType.DM:
			return new DMChannel(data as APIChannelBase<ChannelType.DM>, client);

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
				? new GuildChannel(data as APIGuildChannel<GuildChannelType>, client)
				: new Channel(data as APIChannelBase<ChannelType>, client);
	}
}

export type AnyGuildChannel =
	| GuildTextChannel
	| GuildVoiceChannel
	| GuildMediaChannel
	| GuildForumChannel
	| GuildThreadChannel
	| GuildCategoryChannel
	| GuildDirectoryChannel
	| GuildNewsChannel
	| GuildStageVoiceChannel;

export type AnyGuildTextableChannel =
	| GuildTextChannel
	| GuildVoiceChannel
	| GuildThreadChannel
	| GuildNewsChannel;

export type AnyTextableChannels = AnyGuildTextableChannel | DMChannel;

export type AnyGuildVoiceChannel = GuildVoiceChannel | GuildStageVoiceChannel;

export type AnyChannel =
	| Channel<ChannelType>
	| GuildChannel<GuildChannelType>
	| AnyGuildChannel
	| DMChannel;
