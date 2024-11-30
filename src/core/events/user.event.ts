import type { Client } from "@core/client";
import { User } from "@structures/user/user";
import type { GatewayUserUpdateDispatchData } from "discord-api-types/v10";

export const USER_UPDATE = async (
	self: Client,
	data: GatewayUserUpdateDispatchData,
): Promise<[user: User, old?: User]> => {
	return [new User(data, self), self.users?.get(data.id)];
};
