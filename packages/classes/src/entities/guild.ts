import {
	type RESTPostAPIGuildChannelJSONBody,
	type APIThreadChannel,
	type APIGuildChannel,
	type APIGuildPreview,
	type APIGuildMember,
	type APIThreadList,
	type ChannelType,
	type APIChannel,
	type Snowflake,
	type APIGuild,
	type APIBan,
	Routes
} from "discord-api-types/v10";
import { Dictionary, Panic } from "kodkord";
import { Entity } from "@entity";

import { GuildBanner, GuildIcon } from "./image";
import { Channel } from "./channel";
import { Member } from "./member";
import { Role } from "./role";

/** Represents a Discord guild (server). */
export class Guild extends Entity<APIGuild> {

	/**
	 * Fetches the latest data for the guild from the Discord API.
	 *
	 * @returns A promise that resolves to an updated {@link Guild} instance.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async fetch(): Promise<Guild> {
		try {
			const API = await this.rest.get<APIGuild>(Routes.guild(this.raw.id));
			return new Guild(this.rest, API);
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to fetch guild with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Modifies a guild's data in the Discord API.
	 *
	 * @param data The data to update for the guild.
	 * @returns A promise that resolves to an updated {@link Guild} instance.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async modify(data: Partial<APIGuild>): Promise<Guild> {
		try {
			const API = await this.rest.patch<APIGuild>(Routes.guild(this.raw.id), {
				body: data as Record<string, object>
			});
			return new Guild(this.rest, API);
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to modify guild with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Retrieves the guild's icon.
	 *
	 * @returns A {@link GuildIcon} instance representing the guild's icon.
	 */
	public icon(): GuildIcon {
		return new GuildIcon(this.rest, {
			hash: this.raw.icon ?? null,
			ownerId: this.raw.id
		});
	}

	/**
	 * Retrieves the guild's banner.
	 *
	 * @returns A {@link GuildBanner} instance representing the guild's banner.
	 */
	public banner(): GuildBanner {
		return new GuildBanner(this.rest, {
			hash: this.raw.banner ?? null,
			ownerId: this.raw.id
		});
	}

	/**
	 * Fetches the latest data for the guild preview from the Discord API.
	 *
	 * @returns A promise that resolves to an updated {@link APIGuildPreview} object.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async preview(): Promise<APIGuildPreview> {
		try {
			return await this.rest.get<APIGuildPreview>(Routes.guildPreview(this.raw.id));
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to fetch guild preview with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Fetches the channel list of the guild from the Discord API.
	 *
	 * This method doesn't include thread channels.
	 *
	 * @returns A promise resolving to a {@link Dictionary} of {@link Channel} instances.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async channels(): Promise<Dictionary<string[], Channel<ChannelType>>> {
		try {
			const API = await this.rest.get<APIGuildChannel<ChannelType>[]>(
				Routes.guildChannels(this.raw.id)
			);
			return new Dictionary(API.map((c) => [[c.name], new Channel(this.rest, c as APIChannel)]));
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to get channel list of a guild with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Fetches the thread list of the guild from the Discord API.
	 *
	 * @returns A promise resolving to a {@link Dictionary} of {@link Channel} instances representing threads.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async threads(): Promise<Dictionary<string[], Channel<ChannelType>>> {
		try {
			const API = await this.rest.get<APIThreadList>(Routes.guildActiveThreads(this.raw.id));
			return new Dictionary(
				API.threads.map((c) => [[c.id], new Channel(this.rest, c as APIThreadChannel)])
			);
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to get thread list of a guild with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Creates a channel in the guild.
	 *
	 * @param data The data for the new channel.
	 * @returns A promise resolving to the {@link Channel} instance of the created channel.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async createChannel(data: RESTPostAPIGuildChannelJSONBody): Promise<Channel<ChannelType>> {
		try {
			const API = await this.rest.post<APIChannel>(Routes.guildChannels(this.raw.id), {
				body: data
			});
			return new Channel(this.rest, API);
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to create a channel on a guild with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Fetches the member list of the guild from the Discord API.
	 *
	 * @returns A promise resolving to a {@link Dictionary} of {@link Member} instances.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async members(): Promise<Dictionary<string[], Member>> {
		try {
			const API = await this.rest.get<APIGuildMember[]>(Routes.guildMembers(this.raw.id));
			return new Dictionary(API.map((m) => [[m.user.id], new Member(this.rest, m, this.raw)]));
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to get member list of a guild with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Removes a member from the guild.
	 *
	 * @param id The ID of the member to kick.
	 * @returns A promise resolving to `true` if the member was successfully kicked, or `false` if it failed.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async kick(id: Snowflake): Promise<boolean> {
		try {
			await this.rest.delete(Routes.guildMember(this.raw.id, id));
			return true;
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to kick member with id ${id} from guild with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Bans a member from the guild.
	 *
	 * @param id The ID of the member to ban.
	 * @param seconds The number of seconds to delete messages for (between 0 and 604800).
	 * @returns A promise resolving to `true` if the member was successfully banned, or `false` if it failed.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async ban(id: Snowflake, seconds?: number): Promise<boolean> {
		try {
			await this.rest.put(Routes.guildBan(this.raw.id, id), {
				body: {
					delete_message_seconds: seconds
				} as unknown as Record<string, object>
			});
			return true;
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to ban member with id ${id} from guild with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Performs a bulk ban of members in the guild.
	 *
	 * @param ids An array of user IDs to ban (maximum of 200).
	 * @param seconds The number of seconds to delete messages for (between 0 and 604800).
	 * @returns A promise resolving to `true` if the bulk ban was successful, or `false` if it failed.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async bulkBan(ids: Snowflake[], seconds?: number): Promise<boolean> {
		try {
			await this.rest.put(Routes.guildBulkBan(this.raw.id), {
				body: {
					delete_message_seconds: seconds,
					user_ids: ids
				} as unknown as Record<string, object>
			});
			return true;
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to bulk ban members on a guild with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Unbans a member from the guild.
	 *
	 * @param id The ID of the member to unban.
	 * @returns A promise resolving to `true` if the member was successfully unbanned, or `false` if it failed.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async unban(id: Snowflake): Promise<boolean> {
		try {
			await this.rest.delete(Routes.guildBan(this.raw.id, id));
			return true;
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to unban member with id ${id} from guild with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Fetches the list of bans in the guild.
	 *
	 * @param limit The maximum number of bans to return.
	 * @param before The ID of the user to get bans before.
	 * @param after The ID of the user to get bans after.
	 * @returns A promise resolving to an array of {@link APIBan} objects.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async bans(
		limit?: number,
		before?: Snowflake | null,
		after?: Snowflake | null
	): Promise<APIBan[]> {
		try {
			return await this.rest.get<APIBan[]>(Routes.guildBans(this.raw.id), {
				body: {
					limit,
					before,
					after
				}
			});
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to get ban list from a guild with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Fetches the ban data for a specific user in the guild.
	 *
	 * @param id The ID of the user to fetch ban data for.
	 * @returns A promise resolving to an {@link APIBan} object.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async getBan(id: Snowflake): Promise<APIBan> {
		try {
			return await this.rest.get<APIBan>(Routes.guildBan(this.raw.id, id));
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to get ban data from a guild with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Retrieves a dictionary of roles in the guild.
	 *
	 * @returns A {@link Dictionary} of {@link Role} instances.
	 */
	public roles(): Dictionary<string, Role> {
		return new Dictionary<string, Role>(
			this.raw.roles.map((r) => [r.id, new Role(this.rest, r, this.raw)])
		);
	}
}
