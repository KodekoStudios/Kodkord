import {
	type DefaultUserAvatarAssets,
	type UserAvatarFormat,
	type UserBannerFormat,
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
export class Avatar extends HashImage<RawImage> {
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
export class Banner extends HashImage<RawImage> {
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
