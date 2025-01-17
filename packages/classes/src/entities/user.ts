import { type APIUser, Routes } from "discord-api-types/v10";
import { Entity } from "@entity";
import { Panic } from "kodkord";

import { Avatar, Banner } from "./image";

/**
 * Class representing a Discord user.
 */
export class User extends Entity<APIUser> {
	/**
	 * Fetches the latest data for the user from the Discord API.
	 *
	 * @returns A promise that resolves to an updated `User` instance.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async fetch(): Promise<User> {
		try {
			const API_USER = await this.rest.get<APIUser>(Routes.user(this.raw.id));
			return new User(this.rest, API_USER);
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to fetch user with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Retrieves the user's banner.
	 *
	 * @returns A `Banner` instance representing the user's banner.
	 */
	public banner(): Banner {
		return new Banner(this.rest, {
			hash: this.raw.banner ?? null,
			ownerId: this.raw.id
		});
	}

	/**
	 * Retrieves the user's avatar.
	 *
	 * @returns An `Avatar` instance representing the user's avatar.
	 */
	public avatar(): Avatar {
		return new Avatar(this.rest, {
			hash: this.raw.avatar,
			ownerId: this.raw.id
		});
	}

	/**
	 * Returns the creation date of the user based on their Id.
	 *
	 * @returns A `Date` object representing when the user was created.
	 */
	public createdAt(): Date {
		const TIMESTAMP = BigInt(this.raw.id) >> 22n;
		return new Date(Number(TIMESTAMP) + 1_420_070_400_000); // Discord Epoch
	}

	/**
	 * Returns a string to mention the user in Discord.
	 *
	 * @returns A string representing the user mention.
	 */
	public mention(): string {
		return `<@!${this.raw.id}>`;
	}
}
