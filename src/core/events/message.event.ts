import type { Client } from "@core/client";
import { Message } from "@structures/message/message";
import type { GatewayMessageCreateDispatchData } from "discord-api-types/v10";

export const MESSAGE_CREATE = (
	self: Client,
	message: GatewayMessageCreateDispatchData,
): Message => {
	return new Message(message, self);
};
