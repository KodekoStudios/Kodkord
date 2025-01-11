import type { Client } from "@core/client";
import { Guild } from "@structures/guild/guild";
import { User } from "@structures/user/user";
import type {
	APIGuildScheduledEvent,
	GatewayGuildAuditLogEntryCreateDispatchData,
	GatewayGuildBanAddDispatchData,
	GatewayGuildBanRemoveDispatchData,
	GatewayGuildCreateDispatchData,
	GatewayGuildIntegrationsUpdateDispatchData,
	GatewayGuildMemberRemoveDispatchData,
	GatewayGuildScheduledEventCreateDispatchData,
	GatewayGuildScheduledEventDeleteDispatchData,
	GatewayGuildScheduledEventUpdateDispatchData,
	GatewayGuildScheduledEventUserAddDispatchData,
	GatewayGuildScheduledEventUserRemoveDispatchData,
	Snowflake,
} from "discord-api-types/v10";

export const GUILD_AUDIT_LOG_ENTRY_CREATE = (
	_self: Client,
	data: GatewayGuildAuditLogEntryCreateDispatchData,
): GatewayGuildAuditLogEntryCreateDispatchData => {
	return data;
};

export const GUILD_BAN_ADD = (
	self: Client,
	data: GatewayGuildBanAddDispatchData,
): {
	user: User;
	guild_id: Snowflake;
} => {
	return { ...data, user: new User(data.user, self) };
};

export const GUILD_BAN_REMOVE = (
	self: Client,
	data: GatewayGuildBanRemoveDispatchData,
): {
	user: User;
	guild_id: Snowflake;
} => {
	return { ...data, user: new User(data.user, self) };
};

export const GUILD_CREATE = (self: Client, data: GatewayGuildCreateDispatchData): Guild => {
	return new Guild(data, self);
};

// export const GUILD_DELETE = async (self: Client, data: GatewayGuildDeleteDispatchData) => {
// 	return (await self.guilds?.get(data.id)) ?? data;
// };

// export const GUILD_EMOJIS_UPDATE = (self: Client, data: GatewayGuildEmojisUpdateDispatchData) => {
// 	return {
// 		...data,
// 		emojis: data.emojis.map(x => new GuildEmoji(self, x, data.guild_id)),
// 	};
// };

export const GUILD_INTEGRATIONS_UPDATE = (
	_self: Client,
	data: GatewayGuildIntegrationsUpdateDispatchData,
): typeof data => {
	return data;
};

// export const GUILD_MEMBER_ADD = (self: Client, data: GatewayGuildMemberAddDispatchData) => {
// 	return new GuildMember(data, self);
// };

export const GUILD_MEMBER_REMOVE = (
	self: Client,
	data: GatewayGuildMemberRemoveDispatchData,
): {
	user: User;
	guild_id: Snowflake;
} => {
	return { ...data, user: new User(data.user, self) };
};

export const GUILD_SCHEDULED_EVENT_CREATE = (
	_self: Client,
	data: GatewayGuildScheduledEventCreateDispatchData,
): APIGuildScheduledEvent => {
	return data;
};

export const GUILD_SCHEDULED_EVENT_UPDATE = (
	_self: Client,
	data: GatewayGuildScheduledEventUpdateDispatchData,
): typeof data => {
	return data;
};

export const GUILD_SCHEDULED_EVENT_DELETE = (
	_self: Client,
	data: GatewayGuildScheduledEventDeleteDispatchData,
): typeof data => {
	return data;
};

export const GUILD_SCHEDULED_EVENT_USER_ADD = (
	_self: Client,
	data: GatewayGuildScheduledEventUserAddDispatchData,
): typeof data => {
	return data;
};

export const GUILD_SCHEDULED_EVENT_USER_REMOVE = (
	_self: Client,
	data: GatewayGuildScheduledEventUserRemoveDispatchData,
): typeof data => {
	return data;
};

// export const GUILD_ROLE_CREATE = (self: Client, data: GatewayGuildRoleCreateDispatchData) => {
// 	return new GuildRole(self, data);
// };

// export const GUILD_ROLE_DELETE = async (self: Client, data: GatewayGuildRoleDeleteDispatchData) => {
// 	return (await self.roles?.get(data.role_id)) || data;
// };

// export const GUILD_ROLE_UPDATE = async (
// 	self: Client,
// 	data: GatewayGuildRoleUpdateDispatchData,
// ): Promise<[role: GuildRole, old?: GuildRole]> => {
// 	return [new GuildRole(self, data), await self.cache.roles?.get(data.role.id)];
// };

// export const GUILD_STICKERS_UPDATE = (self: Client, data: GatewayGuildStickersUpdateDispatchData) => {
// 	return {
// 		...data,
// 		stickers: data.stickers.map(x => new Sticker(self, x)),
// 	};
// };

// export const GUILD_UPDATE = async (
// 	self: Client,
// 	data: GatewayGuildUpdateDispatchData,
// ): Promise<[guild: Guild, old?: Guild<'cached'>]> => {
// 	return [new Guild(data, self), await self.guilds?.get(data.id)];
// };
