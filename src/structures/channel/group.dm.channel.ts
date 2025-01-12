import type { Nullable } from "@types";
import { ChannelType } from "discord-api-types/v10";
import { Channel, ReadonlyChannel } from "./channel";

export class GroupDMChannel extends Channel<ChannelType.GroupDM> {
	public override get name(): Nullable<string> {
		return super.name;
	}

	public get flags(): Nullable<number> {
		return this.data.flags;
	}

	static {
		// @ts-expect-error
		ReadonlyChannel.Channels[ChannelType.GroupDM] = GroupDMChannel;
	}
}
