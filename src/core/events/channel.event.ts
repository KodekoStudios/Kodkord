import type {
	GatewayChannelCreateDispatchData,
	GatewayChannelDeleteDispatchData,
	GatewayChannelPinsUpdateDispatchData,
	GatewayChannelUpdateDispatchData,
} from "discord-api-types/v10";

import type { Client } from "@core/client";
import { type AnyChannel, channelFrom } from "@structures/channel/channel";

export const CHANNEL_CREATE = (
	self: Client,
	data: GatewayChannelCreateDispatchData,
): AnyChannel => {
	return channelFrom(data, self);
};

export const CHANNEL_DELETE = (
	self: Client,
	data: GatewayChannelDeleteDispatchData,
): AnyChannel => {
	return channelFrom(data, self);
};

export const CHANNEL_PINS_UPDATE = (
	_self: Client,
	data: GatewayChannelPinsUpdateDispatchData,
): GatewayChannelPinsUpdateDispatchData => {
	return data;
};

export const CHANNEL_UPDATE = (
	self: Client,
	data: GatewayChannelUpdateDispatchData,
): [channel: AnyChannel, old?: AnyChannel] => {
	return [channelFrom(data, self), self.channels?.get(data.id)];
};
