// * ------------------------------------------- * //
// * --------This code was made by Johan-------- * //
// * ---------shitty code disclaimer!----------- * //
// * ------------------------------------------- * //

import {
	type APIBan,
	type APIChannel,
	type APIGuild,
	type APIGuildChannel,
	type APIGuildMember,
	type APIGuildPreview,
	type APIThreadChannel,
	type APIThreadList,
	type ChannelType,
	type RESTPostAPIGuildChannelJSONBody,
	Routes,
	type Snowflake,
} from "discord-api-types/v10";

import { Entity } from "@entity";
import { Dictionary, Panic } from "kodkord";
import { Channel } from "./channel";
import { GuildBanner, GuildIcon } from "./image";
import { Member } from "./member";
import { Role } from "./role";

export class Guild extends Entity<APIGuild> {
	//These are endpoint-based functions

	/**
	 * Fetches the latest data for the guild from the Discord API.
	 *
	 * @returns A promise that resolves to an updated `Guild` instance.
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
				(error as Error).message,
			).panic();
			throw error;
		}
	}

	/**
	 * Retrieves the guild's icon.
	 *
	 * @returns A `GuildIcon` instance representing the guild's icon.
	 */
	public icon() {
		return new GuildIcon(this.rest, {
			hash: this.raw.icon ?? null,
			ownerId: this.raw.id,
		});
	}

	/**
	 * Retrieves the guild's banner.
	 *
	 * @returns A `GuildBanner` instance representing the guild's banner.
	 */
	public banner() {
		return new GuildBanner(this.rest, {
			hash: this.raw.banner ?? null,
			ownerId: this.raw.id,
		});
	}

	/**
	 * Fetches the latest data for the guild preview from the Discord API.
	 *
	 * @returns A promise that resolves an updated [Guild Preview](https://discord.com/developers/docs/resources/guild#guild-preview-object) object from the `Guild`.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async preview(): Promise<APIGuildPreview> {
		try {
			return await this.rest.get<APIGuildPreview>(Routes.guildPreview(this.raw.id));
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to fetch guild preview with id ${this.raw.id}`,
				(error as Error).message,
			).panic();
			throw error;
		}
	}

	/**
	 * Modifies a guild's data in the Discord API.
	 *
	 * @returns A promise that resolves to an updated `Guild` instance.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async modify(data: Partial<APIGuild>) {
		try {
			const API = await this.rest.patch<APIGuild>(Routes.guild(this.raw.id), {
				body: data as Record<string, object>,
			});
			return new Guild(this.rest, API);
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to modify guild with id ${this.raw.id}`,
				(error as Error).message,
			).panic();
			throw error;
		}
	}

	/**
	 * Fetches the channel list of the guild from the Discord API.
	 *
	 * This method doesn't include thread channels
	 *
	 * @returns A promise resolving an `APIChannel` array in a `Channel` `Dictionary`.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async channels() {
		try {
			const API = await this.rest.get<APIGuildChannel<ChannelType>[]>(
				Routes.guildChannels(this.raw.id),
			);
			return new Dictionary(API.map((c) => [[c.name], new Channel(this.rest, c as APIChannel)]));
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to get channel list of a guild with id ${this.raw.id}`,
				(error as Error).message,
			).panic();
			throw error;
		}
	}

	/**
	 * Fetches the thread list of the guild from the Discord API.
	 *
	 * @returns A promise resolving an `APIThreadChannel` array in a `Channel` `Dictionary`.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async threads() {
		try {
			const API = await this.rest.get<APIThreadList>(Routes.guildActiveThreads(this.raw.id));
			return new Dictionary(
				API.threads.map((c) => [[c.id], new Channel(this.rest, c as APIThreadChannel)]),
			);
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to get thread list of a guild with id ${this.raw.id}`,
				(error as Error).message,
			).panic();
			throw error;
		}
	}

	/**
	 * Create a channel in the guild
	 *
	 * @returns A promise that resolves the `Channel` instance of the created channel.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async createChannel(data: RESTPostAPIGuildChannelJSONBody) {
		try {
			const API = await this.rest.post<APIChannel>(Routes.guildChannels(this.raw.id), {
				body: data,
			});
			return new Channel(this.rest, API);
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to create a channel on a guild with id ${this.raw.id}`,
				(error as Error).message,
			).panic();
			throw error;
		}
	}

	/**
	 * Fetches the member list of the guild from the Discord API.
	 *
	 * @returns
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async members() {
		try {
			const API = await this.rest.get<APIGuildMember[]>(Routes.guildMembers(this.raw.id));
			return new Dictionary(API.map((m) => [[m.user.id], new Member(this.rest, m, this.raw)]));
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to get member list of a guild with id ${this.raw.id}`,
				(error as Error).message,
			).panic();
			throw error;
		}
	}

	/**
	 * Removes a member from a guild in the Discord API.
	 *
	 * @returns A promise of a Boolean that represents that it was a success.
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
				(error as Error).message,
			).panic();
			throw error;
		}
	}

	/**
	 * Bans a member from a guild in the Discord API.
	 *
	 * A number is given which represents the seconds to delete messages between 0 and 604800 (7 days)
	 *
	 * @returns A promise of a Boolean that represents that it was a success.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async ban(id: Snowflake, seconds?: number): Promise<boolean> {
		try {
			await this.rest.put(Routes.guildBan(this.raw.id, id), {
				body: {
					delete_message_seconds: seconds,
				} as unknown as Record<string, object>,
			});
			return true;
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to ban member with id ${id} from guild with id ${this.raw.id}`,
				(error as Error).message,
			).panic();
			throw error;
		}
	}

	/**
	 * Do a bulk ban of members in a guild in the Discord API.
	 *
	 * A number is given which represents the seconds to delete messages between 0 and 604800 (7 days)
	 *
	 * @param ids Fix Snowflakes of users to be banned. Maximum should be 200
	 * @returns A promise of a Boolean that represents that it was a success.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async bulkBan(ids: Snowflake[], seconds?: number): Promise<boolean> {
		try {
			await this.rest.put(Routes.guildBulkBan(this.raw.id), {
				body: {
					delete_message_seconds: seconds,
					user_ids: ids,
				} as unknown as Record<string, object>,
			});
			return true;
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to bulk ban members on a guild with id ${this.raw.id}`,
				(error as Error).message,
			).panic();
			throw error;
		}
	}

	/**
	 * Unbans a member from a guild in the Discord API.
	 *
	 * @returns A promise of a Boolean that represents that it was a success.
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
				(error as Error).message,
			).panic();
			throw error;
		}
	}

	/**
	 * Get all bans on a guild in the Discord API.
	 *
	 * Provide a user id to `before` and `after` for pagination. Users will always be returned in ascending order by `user.id`. If both `before` and `after` are provided, only `before` is respected.
	 *
	 * @returns A promise of a Array of [APIBan](https://discord.com/developers/docs/resources/guild#ban-object) that represents all of users banned.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async bans(
		limit?: number,
		before?: Snowflake | null,
		after?: Snowflake | null,
	): Promise<APIBan[]> {
		try {
			return await this.rest.get<APIBan[]>(Routes.guildBans(this.raw.id), {
				body: { limit, before, after },
			});
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to get ban list from a guild with id ${this.raw.id}`,
				(error as Error).message,
			).panic();
			throw error;
		}
	}

	/**
	 * Get an especific ban data on a guild in the Discord API.
	 *
	 * @returns A promise of [APIBan](https://discord.com/developers/docs/resources/guild#ban-object) that represents user ban data.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async getBan(id: Snowflake): Promise<APIBan> {
		try {
			return await this.rest.get<APIBan>(Routes.guildBan(this.raw.id, id));
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to get ban data from a guild with id ${this.raw.id}`,
				(error as Error).message,
			).panic();
			throw error;
		}
	}

	//Here are functions based on `raw` properties

	/**
	 * Obtains a dictionary of roles in the Guild
	 *
	 * @returns A dictionary with all the roles on the server
	 */
	public async roles() {
		return new Dictionary<string, Role>(
			this.raw.roles.map((r) => [r.id, new Role(this.rest, r, this.raw)]),
		);
	}
}
