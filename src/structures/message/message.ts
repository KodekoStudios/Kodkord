import { Base } from "@structures/base";
import type { AnyChannel } from "@structures/channel/channel";
import {
	type APIAttachment,
	type APIChannelMention,
	type APIEmbed,
	type APIMessage,
	type APIReaction,
	type APIUser,
	type APIWebhook,
	type MessageFlags,
	MessageType,
	type Snowflake,
} from "discord-api-types/v10";
import type { User } from "../user/user";

export interface MessageMentions {
	readonly everyone: boolean;
	readonly users: APIUser[];
	readonly roles: Snowflake[];
	readonly channels?: APIChannelMention[];
}

/**
 * Represents a base message.
 * @template Type The type of the underlying API message.
 */
export class Message<Type extends MessageType = MessageType.Default> extends Base<
	APIMessage & { type: Type }
> {
	// Getters
	public get type(): Type {
		return this.data.type;
	}

	public get content(): string {
		return this.data.content;
	}

	public get channelId(): Snowflake {
		return this.data.channel_id;
	}

	public get timestamp(): string {
		return this.data.timestamp;
	}

	public get edited(): {
		timestamp: string | null;
		date: (() => Date) | null;
	} {
		return {
			timestamp: this.data.edited_timestamp,
			date: this.data.edited_timestamp
				? (): Date => new Date(this.data.edited_timestamp as string)
				: null,
		};
	}

	public get tts(): boolean {
		return this.data.tts;
	}

	public get mentions(): MessageMentions {
		return {
			everyone: this.data.mention_everyone,
			users: this.data.mentions,
			roles: this.data.mention_roles,
			channels: this.data.mention_channels,
		};
	}

	public get attachments(): APIAttachment[] {
		return this.data.attachments;
	}

	public get embeds(): APIEmbed[] {
		return this.data.embeds;
	}

	public get reactions(): APIReaction[] | undefined {
		return this.data.reactions;
	}

	public get webhookId(): Snowflake | undefined {
		return this.data.webhook_id;
	}

	public get flags(): MessageFlags | undefined {
		return this.data.flags;
	}

	// Utility Methods
	public channel(): Promise<AnyChannel> {
		return this.client.channels.fetch(this.data.channel_id);
	}

	public userAuthor(): Promise<User> {
		return this.client.users.fetch(this.data.author.id, true);
	}

	public webhookAuthor(): APIWebhook {
		// @ts-expect-error
		return this.data.author as APIWebhook;
	}

	// Date Conversion Methods
	public date(): Date {
		return new Date(this.data.timestamp);
	}

	// Reactions Methods
	public getReaction(reaction: string): APIReaction | undefined {
		return this.data.reactions?.find(
			({ emoji: { id, name } }) => id === reaction || name === reaction,
		);
	}

	public getReactionCount(reaction: string): number {
		const FOUND = this.data.reactions?.find(
			({ emoji: { id, name } }) => id === reaction || name === reaction,
		);
		return FOUND ? FOUND.count : 0;
	}

	// Mentioning Methods
	public mentionsUser(userId: Snowflake): boolean {
		return this.data.mentions.some((mention) => mention.id === userId);
	}

	public mentionsRole(roleId: Snowflake): boolean {
		return this.data.mention_roles.includes(roleId);
	}

	public mentionsChannel(channelId: Snowflake): boolean {
		return this.data.mention_channels?.some((mention) => mention.id === channelId) ?? false;
	}

	// Attachments and Embeds Helper Methods
	public hasAttachments(): boolean {
		return this.data.attachments.length > 0;
	}

	public hasEmbeds(): boolean {
		return this.data.embeds.length > 0;
	}

	public isTextMessage(): this is { type: MessageType.Default } {
		return this.data.type === MessageType.Default;
	}

	public hasImageAttachment(): boolean {
		return this.data.attachments.some(
			(attachment) => attachment.content_type?.startsWith("image/") ?? false,
		);
	}

	public hasVideoAttachment(): boolean {
		return this.data.attachments.some(
			(attachment) => attachment.content_type?.startsWith("video/") ?? false,
		);
	}

	// Message State Methods
	public isPinned(): boolean {
		return this.data.pinned;
	}
}
