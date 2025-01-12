import type { Client } from "@core/client";
import type { Snowflake } from "discord-api-types/globals";
import { type APIUser, Routes } from "discord-api-types/v10";
import { User } from "../user/user";
import { Manager } from "./manager";

/**
 * Manages user data within the client.
 */
export class UserManager extends Manager<User> {
	/**
	 * Constructs a new instance of the UserManager class.
	 *
	 * @param client The client object used to interact with the Discord API.
	 */
	public constructor(client: Client) {
		super(client, "USER MANAGER");
	}

	/**
	 * Retrieves a user from the storage by their ID.
	 *
	 * @param userId The ID of the user to retrieve.
	 * @returns The User object if found; otherwise, undefined.
	 */
	public get(userId: Snowflake): User | undefined {
		return this.storage.get(userId);
	}

	/**
	 * Checks if a user exists in the storage.
	 *
	 * @param userId The ID of the user to check for.
	 * @returns True if the user exists in the storage; otherwise, false.
	 */
	public has(userId: Snowflake): boolean {
		return this.storage.has(userId);
	}

	/**
	 * Removes a user from the storage by their ID.
	 *
	 * @param userId The ID of the user to remove from the storage.
	 * @returns True if the user was successfully removed; otherwise, false.
	 */
	public remove(userId: Snowflake): boolean {
		return this.storage.delete(userId);
	}

	/**
	 * Filters the users in the storage based on a predicate function.
	 *
	 * @param predicate A function that takes a User object and returns a boolean indicating inclusion.
	 * @returns An array of User objects that match the criteria specified in the predicate.
	 */
	public filter(predicate: (user: User) => boolean): User[] {
		return [...this.storage.values()].filter(predicate);
	}

	/** Clears all users from the storage. */
	public clear(): void {
		this.storage.clear();
	}

	/**
	 * Fetches all users from the storage.
	 *
	 * @param onError Optional callback that will be called if an error occurs during fetching.
	 * @returns A promise that resolves with an array of users.
	 */
	public async refetch(onError: (error: Error) => void): Promise<User[]> {
		const USER_IDS = Array.from(this.storage.keys());

		// Fetch and update all users from the API
		const USERS = await Promise.all(
			USER_IDS.map(async (userId) => {
				try {
					return await this.fetch(userId);
				} catch (error) {
					// Call the onError callback if provided
					if (onError) {
						onError(error as Error);
					}
					return undefined; // or handle the error as needed
				}
			}),
		);

		return USERS.filter((user): user is User => user !== undefined); // Filter out undefined results
	}

	/**
	 * Fetches a single user by their ID.
	 *
	 * @param userId The ID of the user to fetch.
	 * @param force Whether to bypass the cache and always fetch from the API.
	 * @returns A promise that resolves with the User object.
	 * @throws An error if the user could not be fetched from the API.
	 */
	public async fetch(userId: Snowflake, force = false): Promise<User> {
		// Check if the user is already in the storage and not forced to fetch
		if (!force && this.storage.has(userId)) {
			return this.storage.get(userId) as User;
		}

		// Fetch the user from the API and handle errors
		try {
			const API_USER = await this.client.APIHandler.get<APIUser>(Routes.user(userId));
			const USER = new User(API_USER, this.client);
			this.storage.set(USER.id, USER);
			return USER;
		} catch (error) {
			this.logger.throw(`Failed to fetch user with ID ${userId}`, (error as Error).message);
			throw new Error(`Failed to fetch user with ID ${userId}: ${(error as Error).message}`); // Improved error handling, this is tecnically unreachable.
		}
	}

	/**
	 * Retrieves the current user's information from the API (/users/@me).
	 *
	 * @returns A promise resolving to the current User object.
	 * @throws An error if the current user information could not be fetched.
	 */
	public async self(): Promise<User> {
		try {
			const RESPONSE = await this.client.APIHandler.get<APIUser>(Routes.user("@me"));
			const USER = new User(RESPONSE, this.client);
			return USER;
		} catch (error) {
			throw new Error(`Failed to fetch current user: ${(<Error>error).message}`);
		}
	}
}
