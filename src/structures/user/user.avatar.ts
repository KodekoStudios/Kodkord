import {
	CDNRoutes,
	type DefaultUserAvatarAssets,
	ImageFormat,
	RouteBases,
	type Snowflake,
	type UserAvatarFormat,
} from "discord-api-types/v10";

/**
 * Options for generating image URLs with Discord's CDN.
 */
interface ImageOptions {
	format?: UserAvatarFormat;
	size?: 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;
}

/**
 * Represents a user's avatar with methods to generate URLs for the avatar image.
 */
export class UserAvatar<UserId extends Snowflake, Hash extends string | null> {
	private readonly userId: UserId;

	/**
	 * The user's avatar hash
	 *
	 * See https://discord.com/developers/docs/reference#image-formatting
	 */
	public readonly hash: Hash;

	/**
	 * Creates an instance of UserAvatar.
	 *
	 * @param user The APIUser object from which to extract the user's ID and avatar
	 */
	constructor(userId: UserId, hash: Hash) {
		this.userId = userId;
		this.hash = hash;
	}

	/**
	 * Returns the URL of the user's avatar with the specified options.
	 *
	 * @param options The options for the image URL
	 * @returns The URL of the user's avatar or null if no avatar is set
	 */
	public url({ format = ImageFormat.WebP, size = 1024 }: ImageOptions = {}): string | null {
		if (this.hash) {
			return `${RouteBases.cdn}${CDNRoutes.userAvatar(this.userId, this.hash, format)}?size=${size}`;
		}

		return null;
	}

	/**
	 * Returns the URL of the user's default avatar with the specified options.
	 *
	 * The value for index parameter will be `(userId >> 22) % 6`.
	 *
	 * @param options The options for the image URL
	 * @returns The URL of the default avatar
	 */
	public default({ size = 1024 }: ImageOptions = {}): string {
		const index = Number((BigInt(this.userId) >> 22n) % 6n) as DefaultUserAvatarAssets;
		return `${RouteBases.cdn}${CDNRoutes.defaultUserAvatar(index)}?size=${size}` as const;
	}

	/**
	 * Returns the display URL of the user's avatar with the specified options.
	 * If an avatar is set, it returns the URL of the avatar; otherwise, it returns the URL of the default avatar.
	 *
	 * @param options The options for the image URL
	 * @returns The display URL of the avatar or default avatar
	 */
	public display(options: ImageOptions = {}): string {
		return this.url(options) ?? this.default(options);
	}
}
