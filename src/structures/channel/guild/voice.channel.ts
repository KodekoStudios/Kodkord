import type { Nullable } from "@types";
import type { APIGuildVoiceChannel } from "discord-api-types/v10";
import { BaseChannel } from "../base.channel";

/**
 * Represents a voice channel in a guild.
 * Provides properties specific to voice channels, such as bitrate, user limit, and RTC region.
 */
export class GuildVoiceChannel extends BaseChannel<APIGuildVoiceChannel> {
	/**
	 * Retrieves the maximum number of users allowed in the voice channel.
	 *
	 * @returns The user limit of the channel, or `0` if there is no limit.
	 */
	public get userLimit(): number {
		return this.data.user_limit ?? 0;
	}

	/**
	 * Retrieves the bitrate (in bits) of the voice channel.
	 *
	 * @returns The channel's bitrate.
	 */
	public get bitrate(): number {
		return this.data.bitrate ?? 0;
	}

	/**
	 * Retrieves the RTC (Real-Time Communication) region override for this voice channel.
	 *
	 * @returns The RTC region identifier, or `null` if no region override is set.
	 */
	public get RTCRegion(): Nullable<string> {
		return this.data.rtc_region;
	}

	/**
	 * Retrieves the video quality mode of the channel, used for voice calls with video.
	 *
	 * @returns The video quality mode, `1` when not present.
	 */
	public get videoQualityMode(): Nullable<number> {
		return this.data.video_quality_mode;
	}
}
