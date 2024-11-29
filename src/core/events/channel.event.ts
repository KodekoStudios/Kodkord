import type {
	GatewayChannelCreateDispatchData,
	GatewayChannelDeleteDispatchData,
	GatewayChannelPinsUpdateDispatchData,
	GatewayChannelUpdateDispatchData,
} from "discord-api-types/v10";

import type { Client } from "@core/client";
import { type AllChannels, channelFrom } from "@structures/channel/channel";

export const CHANNEL_CREATE = (self: Client, data: GatewayChannelCreateDispatchData) => {
	return channelFrom(data, self);
};

export const CHANNEL_DELETE = (self: Client, data: GatewayChannelDeleteDispatchData) => {
	return channelFrom(data, self);
};

export const CHANNEL_PINS_UPDATE = (_self: Client, data: GatewayChannelPinsUpdateDispatchData) => {
	return data;
};

export const CHANNEL_UPDATE = async (
	self: Client,
	data: GatewayChannelUpdateDispatchData,
): Promise<[channel: AllChannels, old?: AllChannels]> => {
	return [channelFrom(data, self), self.channels?.get(data.id)];
};
