import {
	type RESTPatchAPIGuildMemberJSONBody,
	type APIGuildMember,
	type APIVoiceState,
	type APIGuild,
	Routes
} from "discord-api-types/v10";
import { type Rest, Panic } from "kodkord";
import { Entity } from "@entity";

import { MemberAvatar, MemberBanner } from "./image";
import { Guild } from "./guild";

/** Represents a member within a Discord guild. */
export class Member extends Entity<APIGuildMember> {
	/** The {@link Guild} instance in which the member belongs. */
	readonly guild: Guild;

	/**
	 * Creates an instance of the Entity.
	 *
	 * @param rest The REST manager for making API requests.
	 * @param raw The raw data from the API response.
	 * @param guild_raw The raw data of the guild to which the member belongs.
	 */
	constructor(rest: Rest, raw: APIGuildMember, guild_raw: APIGuild) {
		super(rest, raw);
		this.guild = new Guild(rest, guild_raw);
	}

	// ====================
	// Properties
	// ====================

	/**
	 * Returns the joining date of the member.
	 *
	 * @returns A `Date` object representing the member's joining date.
	 */
	public get joined(): Date {
		return new Date(this.raw.joined_at);
	}

	/**
	 * Returns the date when the member started boosting the guild.
	 *
	 * @returns A `Date` object representing the date when the member started boosting the guild, or `null` if the member is not boosting.
	 */
	public get premium(): Date | null {
		return this.raw.premium_since
			? new Date(this.raw.premium_since)
			: null;
	}

	// ====================
	// Image Handling
	// ====================

	/**
	 * Retrieves the member's banner.
	 *
	 * @returns A {@link MemberBanner} instance representing the member's banner.
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
	 * @returns A {@link MemberAvatar} instance representing the member's avatar.
	 */
	public avatar(): MemberAvatar {
		return new MemberAvatar(this.rest, {
			hash: this.raw.avatar ?? null,
			ownerId: this.raw.user.id,
			guildId: this.guild.raw.id
		});
	}

	// ====================
	// Fetching and Modifying
	// ====================

	/**
	 * Fetches the latest data for the member from the Discord API.
	 *
	 * @returns A promise that resolves to an updated {@link Member} instance.
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
	 * @param data The data to update for the member.
	 * @returns A promise that resolves to an updated {@link Member} instance.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async modify(data: RESTPatchAPIGuildMemberJSONBody): Promise<Member> {
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

	// ====================
	// Voice State
	// ====================

	/**
	 * Fetches the voice state of the member in the guild.
	 *
	 * @returns A promise that resolves to the {@link APIVoiceState} object representing the member's voice state.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async voice(): Promise<APIVoiceState> {
		try {
			const result = await this.rest.get<APIVoiceState>(
				Routes.guildVoiceState(this.guild.raw.id, this.raw.user.id)
			);
			return result;
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to get voice state from member with id ${this.raw.user.id} from guild with id ${this.guild.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}
}
