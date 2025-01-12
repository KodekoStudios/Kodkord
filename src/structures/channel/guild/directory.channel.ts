import { ChannelType } from "discord-api-types/v10";
import { ReadonlyChannel } from "../channel";
import { GuildChannel } from "../guild.channel";

/**
 * @todo Implement things, I guess...
 */
export class GuildDirectoryChannel extends GuildChannel<ChannelType.GuildDirectory> {
	/** The raw API data for the guild directory channel. */
	public declare readonly data;

	static {
		// @ts-expect-error
		ReadonlyChannel.Channels[ChannelType.GuildDirectory] = GuildDirectoryChannel;
	}
}
