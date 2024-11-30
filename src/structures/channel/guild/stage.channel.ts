import type { Nullable } from "@types";
import type {
	APIGuildStageVoiceChannel,
	APIGuildVoiceChannel,
	ChannelType,
} from "discord-api-types/v10";
import { GuildChannel } from "../base.channel";

/**
 * Represents a stage voice channel in a guild.
 * Stage voice channels are designed for one-to-many audio communication, similar to a public speaker stage.
 */
export class GuildStageVoiceChannel extends GuildChannel<ChannelType.GuildStageVoice> {
	/** The raw API data for the stage voice channel. */
	public declare readonly data: APIGuildStageVoiceChannel;

	/**
	 * Retrieves the ID of the guild this stage voice channel belongs to.
	 * @returns A string representing the guild ID, or `null` if unavailable.
	 */
	public get guildId(): Nullable<string> {
		return this.data.guild_id;
	}

	/**
	 * The maximum number of users allowed in this stage voice channel.
	 * @returns A number representing the user limit, or `0` if no limit is set.
	 */
	public get userLimit(): number {
		return this.data.user_limit ?? 0;
	}

	/**
	 * The bitrate (in bits per second) of the channel's audio stream.
	 * @returns A number representing the bitrate.
	 */
	public get bitrate(): number {
		return this.data.bitrate ?? 0;
	}

	/**
	 * The RTC (Real-Time Communication) region override for the channel.
	 * This specifies which region is used for audio processing.
	 * @returns A string representing the RTC region, or `null` if not set.
	 */
	public get RTCRegion(): Nullable<string> {
		return this.data.rtc_region;
	}

	/**
	 * The video quality mode used in this channel.
	 * Typically used for video in voice calls.
	 * @returns A number representing the video quality mode, or `1` if not set.
	 */
	public get videoQualityMode(): Nullable<number> {
		return this.data.video_quality_mode;
	}

	/**
	 * The rate limit (in seconds) per user for sending messages in this channel.
	 * @returns A number representing the rate limit, or `0` if no limit is set.
	 */
	public get rateLimitPerUser(): number {
		return this.data.rate_limit_per_user ?? 0;
	}

	/**
	 * The ID of the parent channel, if this channel is nested within another.
	 * @returns A string representing the parent channel ID, or `null` if unavailable.
	 */
	public get parentId(): Nullable<string> {
		return this.data.parent_id;
	}

	/**
	 * The permission overwrites set for this channel.
	 * @returns An array of permission overwrites.
	 */
	public get permissionOverwrites(): APIGuildVoiceChannel["permission_overwrites"] {
		return this.data.permission_overwrites;
	}

	/**
	 * Whether the channel is marked as NSFW (Not Safe For Work).
	 * @returns `true` if NSFW, `false` otherwise, or `null` if unavailable.
	 */
	public get nsfw(): Nullable<boolean> {
		return this.data.nsfw;
	}

	/**
	 * The flags set for this channel, used for additional channel configurations.
	 * @returns A number representing the flags, or `null` if unavailable.
	 */
	public get flags(): Nullable<number> {
		return this.data.flags;
	}

	/**
	 * The position of this channel in the guild's channel list.
	 * @returns A number representing the position.
	 */
	public get position(): number {
		return this.data.position;
	}

	/**
	 * The ID of the last message sent in this channel, if applicable.
	 * @returns A string representing the last message ID, or `null` if unavailable.
	 */
	public get lastMessageId(): Nullable<string> {
		return this.data.last_message_id;
	}
}
