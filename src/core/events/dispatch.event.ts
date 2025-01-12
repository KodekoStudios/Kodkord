import type { Client } from "@core/client";
import { User } from "@structures/user/user";
import type {
	GatewayDispatchPayload,
	GatewayReadyDispatchData,
	GatewayResumedDispatch,
} from "discord-api-types/v10";

export const READY = (self: Client, data: GatewayReadyDispatchData): User => {
	return new User(data.user, self);
};

export const RESUMED = (_self: Client, _data: GatewayResumedDispatch["d"]): void => {
	return;
};

export const RAW = (_self: Client, data: GatewayDispatchPayload): GatewayDispatchPayload => {
	return data;
};
