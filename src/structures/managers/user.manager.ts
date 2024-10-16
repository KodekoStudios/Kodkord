import type { Client } from "@core/client";
import type { Snowflake } from "discord-api-types/globals";
import { type APIUser, Routes } from "discord-api-types/v10";
import { User } from "../user/user";
import { BaseManager } from "./base.manager";

/**
 * Manages the users in the client.
 */
export class UserManager extends BaseManager<User> {
	/**
	 * Creates an instance of the UserManager class.
	 *
	 * @param client The client object.
	 */
	constructor(client: Client) {
		super(client, "USER MANAGER");
	}

	/**
	 * Retrieves a user from the store by Id.
	 *
	 * @param userId The Id of the user to retrieve.
	 * @returns The user object if found, otherwise undefined.
	 */
	public get(userId: Snowflake): User | undefined {
		return this.store.get(userId);
	}

	/**
	 * Checks if a user exists in the store.
	 *
	 * @param userId The Id of the user to check for.
	 * @returns True if the user exists in the store, false otherwise.
	 */
	public has(userId: Snowflake): boolean {
		return this.store.has(userId);
	}

	/**
	 * Removes a user from the store by Id.
	 *
	 * @param userId The Id of the user to remove from the store.
	 * @returns True if the user was successfully removed, false otherwise.
	 */
	public remove(userId: Snowflake): boolean {
		return this.store.delete(userId);
	}

	/**
	 * Filters the users in the store based on the provided predicate function.
	 *
	 * @param predicate A function that takes a User object as an argument and returns a boolean indicating whether the user should be included in the result.
	 * @returns An array of User objects that match the criteria specified in the predicate function.
	 */
	public filter(predicate: (user: User) => boolean): User[] {
		return [...this.store.values()].filter(predicate);
	}

	/**
	 * Clears all users from the store.
	 */
	public clear() {
		this.store.clear();
	}

	/**
	 * Fetches all users from the store.
	 *
	 * @returns A promise that resolves with an array of users.
	 */
	public async fetchAll(): Promise<User[]> {
		const userIds = Array.from(this.store.keys());

		// Fetch all users from the API that are not already in the store
		const users = await Promise.all(
			userIds.map(async (userId) => {
				const user = await this.fetch(userId);
				return user;
			}),
		);

		return users;
	}

	/**
	 * Fetches a single user by Id.
	 *
	 * @param userId The Id of the user to fetch.
	 * @returns A promise that resolves with the user object.
	 */
	public async fetch(userId: Snowflake): Promise<User> {
		// Check if the user is already in the store
		if (this.store.has(userId)) {
			return this.store.get(userId) as User;
		}

		// Fetch the user from the API
		const apiUser = await this.client.APIHandler.get<APIUser>(Routes.user(userId));
		const user = new User(apiUser, this.client);
		this.store.set(user.id, user);
		return user;
	}

	/**
	 * Retrieves the current user's information (/users/@me).
	 *
	 * @returns A promise resolving to the current user's information.
	 */
	public async self(): Promise<User> {
		try {
			const response = await this.client.APIHandler.get<APIUser>(Routes.user("@me"));
			const user = new User(response, this.client);
			return user;
		} catch (error) {
			throw new Error(`Failed to fetch current user: ${(<Error>error).message}`);
		}
	}
}
