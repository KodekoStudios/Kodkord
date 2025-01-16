import { Entity } from "@entity";
import {
	type APIChannel,
	type APIMessage,
	ChannelType,
	type MessageType,
	type RESTPatchAPIChannelJSONBody,
	type RESTPostAPIChannelMessageJSONBody,
	Routes,
} from "discord-api-types/v10";
import { type APIRequestParameters, Warn } from "kodkord";
import { Message } from "./message";

/**
 * Represents a Discord channel.
 *
 * @template Type The specific type of the channel.
 */
export class Channel<Type extends ChannelType> extends Entity<APIChannel & { type: Type }> {
	public async fetchMessage(id: string): Promise<Message<MessageType> | undefined> {
		try {
			return new Message(
				this.rest,
				await this.rest.get<APIMessage>(Routes.channelMessage(this.raw.id, id)),
			);
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to fetch message on channel with id ${this.raw.id}`,
				(error as Error).message,
			).warn();
			return;
		}
	}

	public async postMessage(
		body: RESTPostAPIChannelMessageJSONBody,
	): Promise<Message<MessageType> | undefined> {
		try {
			return new Message(
				this.rest,
				await this.rest.post<APIMessage>(Routes.channelMessages(this.raw.id), {
					body,
				} as APIRequestParameters),
			);
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to post message on channel with id ${this.raw.id}`,
				(error as Error).message,
			).warn();

			return;
		}
	}

	public async fetch(): Promise<Channel<Type> | undefined> {
		try {
			const API_CHANNEL = await this.rest.get<APIChannel>(Routes.channel(this.raw.id));
			return new Channel(this.rest, API_CHANNEL) as Channel<Type>;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to fetch channel with id ${this.raw.id}`,
				(error as Error).message,
			).warn();
			return;
		}
	}

	public async edit(body: RESTPatchAPIChannelJSONBody, reason?: string): Promise<boolean> {
		try {
			await this.rest.patch<APIChannel>(Routes.channel(this.raw.id), {
				body,
				reason,
			} as APIRequestParameters);
			return true;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to edit channel with id ${this.raw.id}`,
				(error as Error).message,
			).warn();
			return false;
		}
	}

	public async delete(): Promise<boolean> {
		try {
			await this.rest.delete<APIChannel>(Routes.channel(this.raw.id));
			return true;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to delete channel with id ${this.raw.id}`,
				(error as Error).message,
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

	// Type Guards

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
