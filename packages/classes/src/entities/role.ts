import {
	type RESTPatchAPIGuildRoleJSONBody,
	type APIGuild,
	type APIRole,
	Routes
} from "discord-api-types/v10";
import { type Rest, Panic } from "kodkord";
import { Entity } from "@entity";

import { RoleIcon } from "./image";
import { Guild } from "./guild";

/** It represents a role within a Discord guild. */
export class Role extends Entity<APIRole> {
	/** The `Guild` instance in which Role belongs. */
	readonly guild: Guild;

	/**
	 * Creates an instance of the Entity.
	 *
	 * @param raw The raw data from the API response.
	 */
	constructor(rest: Rest, raw: APIRole, guildRaw: APIGuild) {
		super(rest, raw);
		this.guild = new Guild(rest, guildRaw);
	}

	/**
	 * Retrieves the roles's icon.
	 *
	 * @returns A `RoleIcon` instance representing the role's icon.
	 */
	public icon() {
		return new RoleIcon(this.rest, {
			hash: this.raw.icon ?? null,
			ownerId: this.raw.id
		});
	}

	/**
	 * Fetches the latest data for the role from the Discord API.
	 *
	 * @returns A promise that resolves to an updated `Role` instance.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async fetch(): Promise<Role> {
		try {
			const API = await this.rest.get<APIRole>(Routes.guildRole(this.guild.raw.id, this.raw.id));
			return new Role(this.rest, API, this.guild.raw);
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to fetch role with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Returns a string to mention the emoji in Discord.
	 *
	 * @returns A string representing the emoji mention.
	 */
	public mention(): string {
		return `<@&${this.raw.id}>`;
	}

	/**
	 * Modifies a role's data in the Discord API.
	 *
	 * @returns A promise that resolves to an updated `Role` instance.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async modify(
		data: RESTPatchAPIGuildRoleJSONBody & {
			position?: number;
		}
	): Promise<Role> {
		if ("position" in data) {
			await this.rest.patch(Routes.guildRoles(this.guild.raw.id), {
				body: {
					id: this.raw.id,
					position: data.position
				} as unknown as Record<string, object>
			});
		}
		try {
			return new Role(
				this.rest,
				await this.rest.patch(Routes.guildRole(this.guild.raw.id, this.raw.id), {
					body: data as Record<string, object>
				}),
				this.guild.raw
			);
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to modify role with id ${this.raw.id} from guild with id ${this.guild.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}
}
