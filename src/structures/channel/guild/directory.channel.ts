import type { ChannelType } from "discord-api-types/v10";
import { BaseGuildChannel } from "../base.channel";

export class GuildDirectoryChannel extends BaseGuildChannel {
	declare type: ChannelType.GuildDirectory;
	declare data; //¿?
}
