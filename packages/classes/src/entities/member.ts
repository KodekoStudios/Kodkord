// * ------------------------------------------- * //
// * --------This code was made by Johan-------- * //
// * ---------shitty code disclaimer!----------- * //
// * ------------------------------------------- * //

import {
	type RESTPatchAPIGuildMemberJSONBody,
	type APIGuildMember,
	type APIGuild,
	Routes
} from "discord-api-types/v10";
import { type Rest, Panic } from "kodkord";
import { Entity } from "@entity";

import { MemberAvatar, MemberBanner } from "./image";
import { Guild } from "./guild";

/** It represents a member within a Discord guild. */
export class Member extends Entity<APIGuildMember> {
	/** The `Guild` instance in which Member belongs. */
	readonly guild: Guild;
	/**
	 * Creates an instance of the Entity.
	 *
	 * @param raw The raw data from the API response.
	 */

	// Biome-ignore lint/style/useNamingConvention:
	constructor(rest: Rest, raw: APIGuildMember, guild_raw: APIGuild) {
		super(rest, raw);
		this.guild = new Guild(rest, guild_raw);
	}

	/**
	 * Retrieves the member's banner.
	 *
	 * @returns A `MemberBanner` instance representing the member's banner.
	 */
	public banner(): MemberBanner {
		return new MemberBanner(this.rest, {
			hash: this.raw.avatar ?? null,
			ownerId: this.raw.user.id,
			guildId: this.guild.raw.id
		});
	}

	/**
	 * Retrieves the member's avatar.
	 *
	 * @returns An `MemberAvatar` instance representing the member's avatar.
	 */
	public avatar(): MemberAvatar {
		return new MemberAvatar(this.rest, {
			hash: this.raw.avatar ?? null,
			ownerId: this.raw.user.id,
			guildId: this.guild.raw.id
		});
	}

	/**
	 * Returns the joining date of the member.
	 *
	 * @returns A `Date` object representing the member's joining date.
	 */
	public joined(): Date {
		return new Date(this.raw.joined_at);
	}

	/**
	 * Returns the date when the member started boosting the guild.
	 *
	 * @returns A `Date` object representing the date when the member started boosting the guild.
	 */
	public premium(): Date | null {
		return this.raw.premium_since
? new Date(this.raw.premium_since)
: null;
	}

	/**
	 * Fetches the latest data for the member from the Discord API.
	 *
	 * @returns A promise that resolves to an updated `Member` instance.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async fetch(): Promise<Member> {
		try {
			const API = await this.rest.get<APIGuildMember>(
				Routes.guildMember(this.guild.raw.id, this.raw.user.id)
			);
			return new Member(this.rest, API, this.guild.raw);
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to fetch member with id ${this.raw.user.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Modifies a member's data in the Discord API.
	 *
	 * @returns A promise that resolves to an updated `Member` instance.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async modify(data: RESTPatchAPIGuildMemberJSONBody) {
		try {
			const API = await this.rest.patch<APIGuildMember>(
				Routes.guildMember(this.guild.raw.id, this.raw.user.id),
				{
					body: data as Record<string, object>
				}
			);
			return new Member(this.rest, API, this.guild.raw);
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to modify member with id ${this.raw.user.id} from guild with id ${this.guild.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	// Democracy does not work unu
	/**
	 * Timeouts a member from a guild in the Discord API. A number is given which represents the timeout time in miliseconds (up to 28 days), if null is given, the timeout will be removed.
	 *
	 * @returns A promise of a Boolean that represents that it was a success.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */ /*
		Public async timeout(time: number | null) {
			try {
				const API = await this.rest.patch<APIGuildMember>(
					Routes.guildMember(this.guild.raw.id, this.raw.user.id),
					{
						body: {
							communication_disabled_until: !time
								? null
								: new Date(Date.now() + time).toISOString(),
						} as unknown as Record<string, object>,
					},
				);
				return new Member(this.rest, API, this.guild.raw);
			} catch (error) {
				new Panic(
					"Rest",
					`Failed to timeout member with id ${this.raw.user.id} from guild with id ${this.guild.raw.id}`,
					(error as Error).message,
				).panic();
				throw error;
			}
		} */
}

// * -------------------------------- * //
// * -------------------------------- * //
// * ---------Johan Was Here--------- * //
// * -------------------------------- * //
// * -------------------------------- * //
