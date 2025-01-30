import {
	type RESTPostAPIChannelMessageJSONBody,
	type RESTPatchAPIChannelJSONBody,
	type MessageType,
	type APIChannel,
	type APIMessage,
	type Snowflake,
	ChannelType,
	Routes
} from "discord-api-types/v10";
import { Entity } from "@entity";
import { Warn } from "kodkord";

import { Message } from "./message";

/**
 * Represents a Discord channel.
 *
 * @template Type The specific type of the channel.
 */
export class Channel<Type extends ChannelType> extends Entity<{ type: Type } & APIChannel> {

	/**
	 * Fetches a specific message from the channel.
	 *
	 * @param id The ID of the message to fetch.
	 * @returns A promise resolving to a {@link Message} instance, or `undefined` if the operation fails.
	 */
	public async fetchMessage(id: string): Promise<Message<MessageType> | undefined> {
		try {
			return new Message(
				this.rest,
				await this.rest.get<APIMessage>(Routes.channelMessage(this.raw.id, id))
			);
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to fetch message on channel with id ${this.raw.id}`,
				(error as Error).message
			).warn();
		}
	}

	/**
	 * Posts a message in the channel.
	 *
	 * @param body The message payload to send.
	 * @returns A promise resolving to a {@link Message} instance, or `undefined` if the operation fails.
	 */
	public async postMessage(
		body: RESTPostAPIChannelMessageJSONBody
	): Promise<Message<MessageType> | undefined> {
		try {
			return new Message(
				this.rest,
				await this.rest.post<APIMessage>(Routes.channelMessages(this.raw.id), {
					body
				})
			);
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to post message on channel with id ${this.raw.id}`,
				(error as Error).message
			).warn();
		}
	}

	/**
	 * Fetches the latest data for the channel from the Discord API.
	 *
	 * @returns A promise resolving to an updated {@link Channel} instance, or `undefined` if the operation fails.
	 */
	public async fetch(): Promise<Channel<Type> | undefined> {
		try {
			const API_CHANNEL = await this.rest.get<APIChannel>(Routes.channel(this.raw.id));
			return new Channel(this.rest, API_CHANNEL) as Channel<Type>;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to fetch channel with id ${this.raw.id}`,
				(error as Error).message
			).warn();
		}
	}

	/**
	 * Modifies the channel's data in the Discord API.
	 *
	 * @param body The data to update for the channel.
	 * @param reason The reason for modifying the channel (optional).
	 * @returns A promise resolving to `true` if the channel was successfully modified, or `false` if it failed.
	 */
	public async modify(body: RESTPatchAPIChannelJSONBody, reason?: string): Promise<boolean> {
		try {
			await this.rest.patch<APIChannel>(Routes.channel(this.raw.id), {
				body,
				reason
			});
			return true;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to modify channel with id ${this.raw.id}`,
				(error as Error).message
			).warn();
			return false;
		}
	}

	/**
	 * Deletes the channel.
	 *
	 * @returns A promise resolving to `true` if the channel was successfully deleted, or `false` if it failed.
	 */
	public async delete(): Promise<boolean> {
		try {
			await this.rest.delete<APIChannel>(Routes.channel(this.raw.id));
			return true;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to delete channel with id ${this.raw.id}`,
				(error as Error).message
			).warn();
			return false;
		}
	}

	/**
	 * Returns a string to mention the channel in Discord.
	 *
	 * @returns A string representing the channel mention.
	 */
	public mention(): string {
		return `<#!${this.raw.id}>`;
	}


	/**
	 * Deletes multiple messages in bulk from the channel.
	 *
	 * @param ids An array of message IDs to delete.
	 * @returns A promise resolving to `true` if the messages were successfully deleted, or `false` if it failed.
	 */
	public async bulkDelete(ids: Snowflake[]): Promise<boolean> {
		try {
			await this.rest.post(Routes.channelBulkDelete(this.raw.id), {
				body: {
					messages: ids
				}
			});
			return true;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to delete messages in bulk on channel with id ${this.raw.id}`,
				(error as Error).message
			).warn();
			return false;
		}
	}

	/** Determines if this channel is a guild text channel. */
	public isGuildText(): this is Channel<ChannelType.GuildText> {
		return this.raw.type === ChannelType.GuildText;
	}

	/** Determines if this channel is a direct message channel. */
	public isDM(): this is Channel<ChannelType.DM> {
		return this.raw.type === ChannelType.DM;
	}

	/** Determines if this channel is a guild voice channel. */
	public isGuildVoice(): this is Channel<ChannelType.GuildVoice> {
		return this.raw.type === ChannelType.GuildVoice;
	}

	/** Determines if this channel is a group DM channel. */
	public isGroupDM(): this is Channel<ChannelType.GroupDM> {
		return this.raw.type === ChannelType.GroupDM;
	}

	/** Determines if this channel is a guild category. */
	public isGuildCategory(): this is Channel<ChannelType.GuildCategory> {
		return this.raw.type === ChannelType.GuildCategory;
	}

	/** Determines if this channel is a guild announcement channel. */
	public isGuildAnnouncement(): this is Channel<ChannelType.GuildAnnouncement> {
		return this.raw.type === ChannelType.GuildAnnouncement;
	}

	/** Determines if this channel is an announcement thread. */
	public isAnnouncementThread(): this is Channel<ChannelType.AnnouncementThread> {
		return this.raw.type === ChannelType.AnnouncementThread;
	}

	/** Determines if this channel is a public thread. */
	public isPublicThread(): this is Channel<ChannelType.PublicThread> {
		return this.raw.type === ChannelType.PublicThread;
	}

	/** Determines if this channel is a private thread. */
	public isPrivateThread(): this is Channel<ChannelType.PrivateThread> {
		return this.raw.type === ChannelType.PrivateThread;
	}

	/** Determines if this channel is a guild stage voice channel. */
	public isGuildStageVoice(): this is Channel<ChannelType.GuildStageVoice> {
		return this.raw.type === ChannelType.GuildStageVoice;
	}

	/** Determines if this channel is a guild forum channel. */
	public isGuildForum(): this is Channel<ChannelType.GuildForum> {
		return this.raw.type === ChannelType.GuildForum;
	}

	/** Determines if this channel is a guild media channel. */
	public isGuildMedia(): this is Channel<ChannelType.GuildMedia> {
		return this.raw.type === ChannelType.GuildMedia;
	}
}
