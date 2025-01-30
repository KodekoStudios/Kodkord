import {
	type RESTPatchAPIGuildEmojiJSONBody,
	type EmojiFormat,
	type APIEmoji,
	type APIGuild,
	ImageFormat,
	RouteBases,
	CDNRoutes,
	Routes
} from "discord-api-types/v10";
import { type Rest, Panic } from "kodkord";
import { Entity } from "@entity";

import type { Sizes } from "./image";

import { Guild } from "./guild";

/** Represents an emoji within a Discord guild. */
export class Emoji extends Entity<APIEmoji> {
	/** The {@link Guild} instance in which the emoji belongs. */
	readonly guild: Guild;

	/**
	 * Creates an instance of the Entity.
	 *
	 * @param rest The REST manager for making API requests.
	 * @param raw The raw data from the API response.
	 * @param guild_raw The raw data of the guild to which the emoji belongs.
	 */
	constructor(rest: Rest, raw: APIEmoji, guild_raw: APIGuild) {
		super(rest, raw);
		this.guild = new Guild(rest, guild_raw);
	}

	/**
	 * Fetches the latest data for the emoji from the Discord API.
	 *
	 * @returns A promise that resolves to an updated {@link Emoji} instance.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async fetch(): Promise<Emoji> {
		try {
			const API = await this.rest.get<APIEmoji>(
				Routes.guildEmoji(this.guild.raw.id, this.raw.id as string)
			);
			return new Emoji(this.rest, API, this.guild.raw);
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to fetch emoji with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Modifies the emoji's data in the Discord API.
	 *
	 * @param data The data to update for the emoji.
	 * @returns A promise that resolves to an updated {@link Emoji} instance.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async modify(data: RESTPatchAPIGuildEmojiJSONBody): Promise<Emoji> {
		try {
			const API = await this.rest.patch<APIEmoji>(
				Routes.guildEmoji(this.guild.raw.id, this.raw.id as string),
				{
					body: data as Record<string, object>
				}
			);
			return new Emoji(this.rest, API, this.guild.raw);
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to modify emoji with id ${this.raw.id} from guild with id ${this.guild.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Retrieves the URL of the emoji.
	 *
	 * @param settings Optional settings to specify the emoji format and size.
	 * @returns The URL of the emoji, or `null` if the emoji does not have an ID.
	 */
	public url(settings?: {
		format?: EmojiFormat;
		size?: Sizes;
	}): string | null {
		return this.raw.id
			? `${RouteBases.cdn}${CDNRoutes.emoji(this.raw.id, settings?.format ?? ImageFormat.WebP)}`
			: null;
	}

	/**
	 * Converts the emoji image to an ArrayBuffer for further processing or usage.
	 *
	 * @returns A promise that resolves to an `ArrayBuffer` representing the image data, or `null` if the emoji is not a guild emoji.
	 */
	public async buffer(): Promise<ArrayBuffer | null> {
		const URL = this.url();
		if (!URL) {
			return null;
		}
		const RESPONSE = await fetch(URL);
		const BUFFER = await RESPONSE.arrayBuffer();
		return BUFFER;
	}

	/**
	 * Returns a string to mention the emoji in Discord.
	 *
	 * @returns A string representing the emoji mention.
	 */
	public mention(): string {
		return `<${this.raw.animated
			? "a"
			: ""}:${this.raw.name}:${this.raw.id}>`;
	}

	/**
	 * Deletes the emoji from the Discord API.
	 *
	 * @returns A promise resolving to `true` if the emoji was successfully deleted, or `false` if it failed.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async delete(): Promise<boolean> {
		try {
			await this.rest.delete<APIEmoji>(Routes.guildEmoji(this.guild.raw.id, this.raw.id as string));
			return true;
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to delete emoji with id ${this.raw.id} from the guild with id ${this.guild.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}
}
