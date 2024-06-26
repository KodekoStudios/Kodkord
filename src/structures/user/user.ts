import type { APIUser } from "discord-api-types/v10";
import { Base } from "../base";

/**
 * Represents a Discord user.
 */
export class User extends Base<APIUser> {
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
	 * The user's avatar hash.
	 *
	 * @returns The avatar hash of the user
	 */
	public get avatar(): string | null {
		return this.data.avatar;
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
