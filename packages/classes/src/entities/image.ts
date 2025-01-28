import {
	type DefaultUserAvatarAssets,
	type GuildBannerFormat,
	type UserAvatarFormat,
	type UserBannerFormat,
	type GuildIconFormat,
	type RoleIconFormat,
	ImageFormat,
	RouteBases,
	CDNRoutes
} from "discord-api-types/v10";
import { Entity } from "@entity";

// eslint-disable-next-line perfectionist/sort-union-types
export type Sizes = 16 | 32 | 64 | 128 | 256 | 512 | 1_024 | 2_048 | 4_096;

/** Represents the raw data structure for an image entity. */
export interface RawImage {
	/** Hash of the image or `null` if not available. */
	hash: string | null;

	/** Id of the owner of the image. */
	ownerId: string;
}

/** Represents the raw data structure of an image entity that has a guild identifier. */
export type GuildRawImage = {
	/** Id of the guild of the image. */ guildId: string;
} & RawImage;

/**
 * Abstract class representing a hash-based image entity.
 *
 * This class provides a base for entities such as avatars, banners, and icons,
 * offering common functionality for retrieving and processing image-related data.
 * It extends the `Entity` class, allowing interaction with raw API data.
 *
 * @template Raw The raw data type for the image entity.
 */
export abstract class HashImage<Raw extends RawImage> extends Entity<Raw> {
	/**
	 * Retrieves the URL of the image based on the hash and settings provided.
	 *
	 * @param settings Optional settings to specify the image format and size.
	 * @returns The URL of the image or `null` if the hash is not available.
	 */
	public abstract url(settings?: {
		format?: ImageFormat;
		size?: Sizes;
	}): string | null;

	/**
	 * Retrieves the default URL of the image if a default is provided by Discord.
	 *
	 * @param settings Optional settings to specify the image format and size.
	 * @returns The default image URL or `undefined` if not applicable.
	 */
	public abstract default(settings?: {
		format?: ImageFormat;
		size?: Sizes;
	}): undefined | string;

	/**
	 * Retrieves the most appropriate image URL.
	 *
	 * This method prioritizes the custom image URL and falls back to the default
	 * URL if available. If neither is available, it returns an empty string.
	 *
	 * @param settings Optional settings to specify the image format and size.
	 * @returns The displayable URL of the image or an empty string.
	 */
	public display(settings?: {
		format?: ImageFormat;
		size?: Sizes;
	}): string {
		return this.url(settings) ?? this.default(settings) ?? ""; // Fallback to an empty string
	}

	/**
	 * Converts the image to an ArrayBuffer for further processing or usage.
	 *
	 * @returns A promise resolving to an ArrayBuffer representing the image data.
	 */
	public async buffer(): Promise<ArrayBuffer> {
		const RESPONSE = await fetch(this.display());
		const BUFFER = await RESPONSE.arrayBuffer();
		return BUFFER;
	}
}

/**
 * Class representing a user's avatar image.
 *
 * This class extends the `HashImage` abstract class and implements methods to
 * retrieve user avatar URLs, including support for default Discord avatars.
 */
export class UserAvatar extends HashImage<RawImage> {
	/**
	 * Retrieves the URL of the user's avatar.
	 *
	 * @param settings Optional settings to specify the avatar format and size.
	 * @returns The avatar URL or `null` if the user does not have a custom avatar.
	 */
	public override url(settings?: {
		format?: UserAvatarFormat;
		size?: Sizes;
	}): string | null {
		return this.raw.hash
			? `${RouteBases.cdn}${CDNRoutes.userAvatar(this.raw.ownerId, this.raw.hash, settings?.format ?? ImageFormat.WebP)}`
			: null;
	}

	/**
	 * Retrieves the default URL of the user's avatar.
	 *
	 * The default avatar is determined based on the user's Id.
	 *
	 * @param settings Optional settings to specify the avatar size.
	 * @returns The default avatar URL.
	 */
	public override default(settings?: {
		format?: ImageFormat;
		size?: Sizes;
	}): undefined | string {
		const INDEX = Number((BigInt(this.raw.ownerId) >> 22n) % 6n) as DefaultUserAvatarAssets;
		return `${RouteBases.cdn}${CDNRoutes.defaultUserAvatar(INDEX)}?size=${settings?.size ?? 512}` as const;
	}
}

/**
 * Class representing a user's banner image.
 *
 * This class extends the `HashImage` abstract class and implements methods to
 * retrieve user banner URLs. Banners do not have default images.
 */
export class UserBanner extends HashImage<RawImage> {
	/**
	 * Retrieves the URL of the user's banner.
	 *
	 * @param settings Optional settings to specify the banner format and size.
	 * @returns The banner URL or `null` if the user does not have a custom banner.
	 */
	public override url(settings?: {
		format?: UserBannerFormat;
		size?: Sizes;
	}): string | null {
		return this.raw.hash
			? `${RouteBases.cdn}${CDNRoutes.userBanner(this.raw.ownerId, this.raw.hash, settings?.format ?? ImageFormat.WebP)}`
			: null;
	}

	/**
	 * Banners do not have a default URL.
	 *
	 * @returns `undefined` as there is no default banner image.
	 */
	public override default(): undefined {
		return undefined;
	}
}

/**
 * Class representing a guild icon's image.
 *
 * This class extends the `HashImage` abstract class and implements methods to
 * retrieve guild icon URLs. Guild icons do not have default images
 */
export class GuildIcon extends HashImage<RawImage> {
	/**
	 * Retrieves the URL of the user's banner.
	 *
	 * @param settings Optional settings to specify the banner format and size.
	 * @returns The banner URL or `null` if the user does not have a custom banner.
	 */
	public override url(settings?: {
		format?: GuildIconFormat;
		size?: Sizes;
	}): string | null {
		return this.raw.hash
			? `${RouteBases.cdn}${CDNRoutes.guildIcon(this.raw.ownerId, this.raw.hash, settings?.format ?? ImageFormat.WebP)}`
			: null;
	}

	/**
	 * Icons do not have a default URL.
	 *
	 * @returns `undefined` as there is no default banner image.
	 */
	public override default(): undefined {
		return undefined;
	}
}

/**
 * Class representing a guild's banner image.
 *
 * This class extends the `HashImage` abstract class and implements methods to
 * retrieve guild banner URLs. Banners do not have default images.
 */

export class GuildBanner extends HashImage<RawImage> {
	/**
	 * Retrieves the URL of the guild's banner.
	 *
	 * @param settings Optional settings to specify the banner format and size.
	 * @returns The banner URL or `null` if the guild does not have a custom banner.
	 */
	public override url(settings?: {
		format?: GuildBannerFormat;
		size?: Sizes;
	}): string | null {
		return this.raw.hash
			? `${RouteBases.cdn}${CDNRoutes.guildBanner(this.raw.ownerId, this.raw.hash, settings?.format ?? ImageFormat.WebP)}`
			: null;
	}

	/**
	 * Banners do not have a default URL.
	 *
	 * @returns `undefined` as there is no default banner image.
	 */
	public override default(): undefined {
		return undefined;
	}
}

/**
 * Class representing a role icon's image.
 *
 * This class extends the `HashImage` abstract class and implements methods to
 * retrieve role role icon URLs. Role icons do not have default images
 */
export class RoleIcon extends HashImage<RawImage> {
	/**
	 * Retrieves the URL of the role's icon.
	 *
	 * @param settings Optional settings to specify the icon format and size.
	 * @returns The icon URL or `null` if the user does not have a custom icon.
	 */
	public override url(settings?: {
		format?: RoleIconFormat;
		size?: Sizes;
	}): string | null {
		return this.raw.hash
			? `${RouteBases.cdn}${CDNRoutes.roleIcon(this.raw.ownerId, this.raw.hash, settings?.format ?? ImageFormat.WebP)}`
			: null;
	}

	/**
	 * Icons do not have a default URL.
	 *
	 * @returns `undefined` as there is no default icon image.
	 */
	public override default(): undefined {
		return undefined;
	}
}

/**
 * Class representing a member's avatar image.
 *
 * This class extends the `HashImage` abstract class and implements methods to
 * retrieve member avatar URLs, including support for default Discord avatars.
 */
export class MemberAvatar extends HashImage<GuildRawImage> {
	/**
	 * Retrieves the URL of the member's avatar.
	 *
	 * @param settings Optional settings to specify the avatar format and size.
	 * @returns The avatar URL or `null` if the member does not have a custom avatar.
	 */
	public override url(settings?: {
		format?: UserAvatarFormat;
		size?: Sizes;
	}): string | null {
		return this.raw.hash
			? `${RouteBases.cdn}${CDNRoutes.guildMemberAvatar(this.raw.guildId, this.raw.ownerId, this.raw.hash, settings?.format ?? ImageFormat.WebP)}`
			: null;
	}

	/**
	 * Member avatar's do not have a default URL.
	 *
	 * @returns `undefined` as there is no default banner image.
	 */
	public override default(): undefined {
		return undefined;
	}
}

/**
 * Class representing a member's banner image.
 *
 * This class extends the `HashImage` abstract class and implements methods to
 * retrieve member banner URLs. Banners do not have default images.
 */
export class MemberBanner extends HashImage<GuildRawImage> {
	/**
	 * Retrieves the URL of the member's banner.
	 *
	 * @param settings Optional settings to specify the banner format and size.
	 * @returns The banner URL or `null` if the member does not have a custom banner.
	 */
	public override url(settings?: {
		format?: UserBannerFormat;
		size?: Sizes;
	}): string | null {
		return this.raw.hash
			? `${RouteBases.cdn}${CDNRoutes.guildMemberBanner(this.raw.guildId, this.raw.ownerId, this.raw.hash, settings?.format ?? ImageFormat.WebP)}`
			: null;
	}

	/**
	 * Banners do not have a default URL.
	 *
	 * @returns `undefined` as there is no default banner image.
	 */
	public override default(): undefined {
		return undefined;
	}
}
