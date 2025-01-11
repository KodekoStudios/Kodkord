import type { Nullable } from "@types";
import type { APIGuildVoiceChannel, ChannelType } from "discord-api-types/v10";
import { GuildChannel } from "../guild.channel";

/**
 * Represents a voice channel in a guild.
 * Provides properties specific to voice channels, such as bitrate, user limit, and RTC region.
 */
export class GuildVoiceChannel extends GuildChannel<ChannelType.GuildVoice> {
	/** The raw API data for the voice channel. */
	public declare data: APIGuildVoiceChannel;

	/**
	 * Retrieves the ID of the guild this voice channel belongs to.
	 * @returns A string representing the guild ID, or `null` if unavailable.
	 */
	public get guildId(): Nullable<string> {
		return this.data.guild_id;
	}

	/**
	 * Retrieves the maximum number of users allowed in the voice channel.
	 * @returns The user limit of the channel, or `0` if there is no limit.
	 */
	public get userLimit(): number {
		return this.data.user_limit ?? 0;
	}

	/**
	 * Retrieves the bitrate (in bits) of the voice channel.
	 * @returns A number representing the channel's bitrate, or `0` if not set.
	 */
	public get bitrate(): number {
		return this.data.bitrate ?? 0;
	}

	/**
	 * Retrieves the RTC (Real-Time Communication) region override for this voice channel.
	 * @returns A string representing the RTC region identifier, or `null` if no region override is set.
	 */
	public get RTCRegion(): Nullable<string> {
		return this.data.rtc_region;
	}

	/**
	 * Retrieves the video quality mode of the channel, used for voice calls with video.
	 * @returns A number representing the video quality mode, or `null` if not set.
	 */
	public get videoQualityMode(): Nullable<number> {
		return this.data.video_quality_mode;
	}

	/**
	 * Retrieves the rate limit per user for sending messages in this channel.
	 * @returns A number representing the rate limit per user in seconds, or `0` if no rate limit is set.
	 */
	public get rateLimitPerUser(): number {
		return this.data.rate_limit_per_user ?? 0;
	}

	/**
	 * Retrieves the ID of the parent category this voice channel belongs to.
	 * @returns A string representing the parent ID, or `null` if no parent is set.
	 */
	public get parentId(): Nullable<string> {
		return this.data.parent_id;
	}

	/**
	 * Retrieves the permission overwrites for this voice channel.
	 * @returns An array of permission overwrites associated with the channel.
	 */
	public get permissionOverwrites(): APIGuildVoiceChannel["permission_overwrites"] {
		return this.data.permission_overwrites;
	}

	/**
	 * Checks whether the voice channel is marked as NSFW (Not Safe For Work).
	 * @returns A nullable boolean indicating if the channel is NSFW.
	 */
	public get nsfw(): Nullable<boolean> {
		return this.data.nsfw;
	}

	/**
	 * Retrieves the flags associated with the voice channel.
	 * @returns A nullable number representing the channel's flags, or `null` if not set.
	 */
	public get flags(): Nullable<number> {
		return this.data.flags;
	}

	/**
	 * Retrieves the position of the voice channel in the guild's channel list.
	 * @returns A number representing the channel's position.
	 */
	public get position(): number {
		return this.data.position;
	}

	/**
	 * Retrieves the ID of the last message sent in the voice channel.
	 * @returns A string representing the last message ID, or `null` if no messages have been sent.
	 */
	public get lastMessageId(): Nullable<string> {
		return this.data.last_message_id;
	}
}
