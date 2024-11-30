import type { Client } from "@core/client";
import type { APIUser } from "discord-api-types/v10";
import { Base } from "../base";
import { UserAvatar } from "./user.avatar";

/**
 * Represents a Discord user and provides methods to access their data.
 */
export class User extends Base<APIUser> {
	/** The user's avatar, encapsulated in the UserAvatar class. */
	public readonly avatar: UserAvatar<typeof this.data.id, typeof this.data.avatar>;

	/**
	 * Constructs a new instance of the User class.
	 *
	 * @param data The APIUser object containing user data from the Discord API.
	 * @param client The client instance that is interacting with the API.
	 */
	public constructor(data: APIUser, client: Client) {
		super(data, client);
		this.avatar = new UserAvatar(data.id, data.avatar);
	}

	/**
	 * @todo Force values ​​to be updated for `this.data`.
	 * @returns A promise that resolves with the User object.
	 */
	public fetch(): Promise<User> {
		return this.client.users.fetch(this.id, true);
	}

	/**
	 * Retrieves the user's username.
	 *
	 * @returns The username of the user.
	 */
	public get username(): string {
		return this.data.username;
	}

	/**
	 * Retrieves the user's discriminator (the 4-digit tag).
	 *
	 * @returns The discriminator (tag) of the user.
	 */
	public get discriminator(): string {
		return this.data.discriminator;
	}

	/**
	 * Checks if the user is a bot.
	 *
	 * @returns `true` if the user is a bot, otherwise `false`.
	 */
	public get bot(): boolean {
		return Boolean(this.data.bot);
	}

	/**
	 * Checks if the user is an official system account (used for urgent messages).
	 *
	 * @returns `true` if the user is a system account, otherwise `false`.
	 */
	public get system(): boolean {
		return Boolean(this.data.system);
	}

	/**
	 * Retrieves the user's locale (language setting).
	 *
	 * @returns The locale of the user, or `null` if not available.
	 */
	public get locale(): string | null {
		return this.data.locale ?? null;
	}

	/**
	 * Checks if the user has two-factor authentication enabled.
	 *
	 * @returns `true` if the user has two-factor authentication enabled, otherwise `false`.
	 */
	public get mfaEnabled(): boolean {
		return Boolean(this.data.mfa_enabled);
	}

	/**
	 * Retrieves the user's banner hash.
	 *
	 * @returns The user's banner hash, or `null` if not set.
	 */
	public get banner(): string | null {
		return this.data.banner ?? null;
	}

	/**
	 * Retrieves the user's accent color.
	 *
	 * @returns The user's accent color as a number, or `null` if not set.
	 */
	public get accentColor(): number | null {
		return this.data.accent_color ?? null;
	}

	/**
	 * Retrieves the user's premium type (Nitro subscription type).
	 *
	 * @returns The user's premium type as a number, or `null` if not subscribed.
	 */
	public get premiumType(): number | null {
		return this.data.premium_type ?? null;
	}

	/**
	 * Retrieves the user's public flags.
	 *
	 * @returns The user's public flags as a number, or `null` if none are set.
	 */
	public get publicFlags(): number | null {
		return this.data.public_flags ?? null;
	}
}
