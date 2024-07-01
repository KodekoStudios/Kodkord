import type { Client } from "@core/client";
import type { APIUser } from "discord-api-types/v10";
import { Base } from "../base";
import { UserAvatar } from "./user.avatar";

/**
 * Represents a Discord user.
 */
export class User extends Base<APIUser> {
	/** The user's avatar. */
	public readonly avatar: UserAvatar<typeof this.data.id, typeof this.data.avatar>;

	/**
	 * Creates an instance of User.
	 *
	 * @param data The APIUser object from which to extract the user's data.
	 * @param client The client object.
	 */
	constructor(data: APIUser, client: Client) {
		super(data, client);
		this.avatar = new UserAvatar(data.id, data.avatar);
	}

	/**
	 * The user's username.
	 *
	 * @returns The username of the user
	 */
	public get username(): string {
		return this.data.username;
	}

	/**
	 * The user's discriminator (the 4-digit tag).
	 *
	 * @returns The discriminator of the user
	 */
	public get discriminator(): string {
		return this.data.discriminator;
	}

	/**
	 * Whether the user is a bot.
	 *
	 * @returns True if the user is a bot, false otherwise
	 */
	public get bot(): boolean {
		return this.data.bot ?? false;
	}

	/**
	 * Whether the user is an Official Discord System user (part of the urgent message system).
	 *
	 * @returns True if the user is a system user, false otherwise
	 */
	public get system(): boolean {
		return this.data.system ?? false;
	}

	/**
	 * The user's locale.
	 *
	 * @returns The locale of the user
	 */
	public get locale(): string | null {
		return this.data.locale ?? null;
	}

	/**
	 * Whether the user has two-factor authentication enabled.
	 *
	 * @returns True if the user has two-factor authentication enabled, false otherwise
	 */
	public get mfaEnabled(): boolean {
		return this.data.mfa_enabled ?? false;
	}

	/**
	 * The user's banner hash.
	 *
	 * @returns The banner hash of the user
	 */
	public get banner(): string | null {
		return this.data.banner ?? null;
	}

	/**
	 * The user's accent color.
	 *
	 * @returns The accent color of the user
	 */
	public get accentColor(): number | null {
		return this.data.accent_color ?? null;
	}

	/**
	 * The user's premium type (Nitro subscription type).
	 *
	 * @returns The premium type of the user
	 */
	public get premiumType(): number | null {
		return this.data.premium_type ?? null;
	}

	/**
	 * The user's public flags.
	 *
	 * @returns The public flags of the user
	 */
	public get publicFlags(): number | null {
		return this.data.public_flags ?? null;
	}
}
