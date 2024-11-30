import {
	CDNRoutes,
	type DefaultUserAvatarAssets,
	ImageFormat,
	RouteBases,
	type Snowflake,
	type UserAvatarFormat,
} from "discord-api-types/v10";

/**
 * Options for generating image URLs from Discord's CDN.
 */
interface ImageOptions {
	format?: UserAvatarFormat;
	size?: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;
}

/**
 * Represents a user's avatar with methods to generate URLs for the avatar image.
 *
 * @template UserId Type of the user's ID (Snowflake).
 * @template Hash Type of the avatar hash (string or null).
 */
export class UserAvatar<UserId extends Snowflake, Hash extends string | null> {
	private readonly userId: UserId;

	/** The avatar hash of the user, or null if the user has no custom avatar. */
	public readonly hash: Hash;

	/**
	 * Constructs a new instance of the UserAvatar class.
	 *
	 * @param userId The ID of the user.
	 * @param hash The avatar hash of the user, or null if no custom avatar.
	 */
	public constructor(userId: UserId, hash: Hash) {
		this.userId = userId;
		this.hash = hash;
	}

	/**
	 * Generates the URL for the user's custom avatar with the given options.
	 *
	 * @param options The image options, including format and size.
	 * @returns The URL of the user's custom avatar, or null if no avatar is set.
	 */
	public url({ format = ImageFormat.WebP, size = 1024 }: ImageOptions = {}): string | null {
		return this.hash
			? `${RouteBases.cdn}${CDNRoutes.userAvatar(this.userId, this.hash, format)}?size=${size}`
			: null;
	}

	/**
	 * Generates the URL for the user's default avatar based on their user ID.
	 *
	 * The default avatar is chosen using the formula `(userId >> 22) % 6`.
	 *
	 * @param options The image options, including size.
	 * @returns The URL of the user's default avatar.
	 */
	public default({ size = 1024 }: ImageOptions = {}): string {
		const INDEX = Number((BigInt(this.userId) >> 22n) % 6n) as DefaultUserAvatarAssets;
		return `${RouteBases.cdn}${CDNRoutes.defaultUserAvatar(INDEX)}?size=${size}` as const;
	}

	/**
	 * Generates the display URL of the user's avatar. If a custom avatar exists, it returns its URL;
	 * otherwise, it falls back to the default avatar.
	 *
	 * @param options The image options, including format and size.
	 * @returns The URL of the user's avatar or default avatar.
	 */
	public display(options: ImageOptions = {}): string {
		return this.url(options) ?? this.default(options);
	}

	/**
	 * Checks whether the user has a custom avatar.
	 *
	 * @returns True if the user has a custom avatar, false if using the default avatar.
	 */
	public hasCustomAvatar(): Hash extends string ? true : false {
		return (this.hash !== null) as Hash extends string ? true : false;
	}

	/**
	 * Checks if the given image size is valid.
	 *
	 * @param size The size to validate.
	 * @returns True if the size is valid, false otherwise.
	 */
	public static isValidImageSize(
		size: number,
	): size is 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 {
		return size >= 16 && size <= 4096 && (size & (size - 1)) === 0;
	}
}
