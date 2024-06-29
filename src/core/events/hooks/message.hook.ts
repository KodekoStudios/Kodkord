import type { Client } from "@core/client";
import { Message } from "@structures/message/message";
import type { GatewayMessageCreateDispatchData } from "discord-api-types/v10";

export const MESSAGE_CREATE = async (self: Client, message: GatewayMessageCreateDispatchData) => {
	return new Message(message, self);
};
