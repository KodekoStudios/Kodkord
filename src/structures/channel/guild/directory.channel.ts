import type { ChannelType } from "discord-api-types/v10";
import { GuildChannel } from "../guild.channel";

/**
 * @todo Implement things, I guess...
 */
export class GuildDirectoryChannel extends GuildChannel<ChannelType.GuildDirectory> {
	/** The raw API data for the guild directory channel. */
	public declare readonly data;
}
