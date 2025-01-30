import {
	type RESTPatchAPIGuildStickerJSONBody,
	type StickerFormat,
	type APISticker,
	ImageFormat,
	RouteBases,
	CDNRoutes,
	Routes
} from "discord-api-types/v10";
import { Entity } from "@entity";
import { Panic } from "kodkord";

import type { Sizes } from "./image";

/** Represents a sticker within a Discord guild. */
export class Sticker extends Entity<APISticker> {

	/**
	 * Fetches the latest data for the sticker from the Discord API.
	 *
	 * @returns A promise that resolves to an updated {@link Sticker} instance.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async fetch(): Promise<Sticker> {
		try {
			const API = await this.rest.get<APISticker>(Routes.sticker(this.raw.id));
			return new Sticker(this.rest, API);
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to fetch sticker with id ${this.raw.id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Modifies the sticker's data in the Discord API.
	 *
	 * @param data The data to update for the sticker.
	 * @returns A promise that resolves to an updated {@link Sticker} instance.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async modify(data: RESTPatchAPIGuildStickerJSONBody): Promise<Sticker> {
		try {
			const API = await this.rest.patch<APISticker>(
				Routes.guildSticker(this.raw.guild_id as string, this.raw.id),
				{
					body: data as Record<string, object>
				}
			);
			return new Sticker(this.rest, API);
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to modify sticker with id ${this.raw.id} from guild with id ${this.raw.guild_id}`,
				(error as Error).message
			).panic();
			throw error;
		}
	}

	/**
	 * Retrieves the URL of the sticker.
	 *
	 * @param settings Optional settings to specify the sticker format and size.
	 * @returns The URL of the sticker.
	 */
	public url(settings?: {
		format?: StickerFormat;
		size?: Sizes;
	}): string {
		return `${RouteBases.cdn}${CDNRoutes.sticker(this.raw.id, settings?.format ?? ImageFormat.PNG)}`;
	}

	/**
	 * Converts the sticker image to an ArrayBuffer for further processing or usage.
	 *
	 * @returns A promise that resolves to an `ArrayBuffer` representing the image data.
	 */
	public async buffer(): Promise<ArrayBuffer> {
		const RESPONSE = await fetch(this.url());
		const BUFFER = await RESPONSE.arrayBuffer();
		return BUFFER;
	}

	/**
	 * Deletes the sticker from the Discord API.
	 *
	 * @returns A promise resolving to `true` if the sticker was successfully deleted, or `false` if it failed.
	 */
	public async delete(): Promise<boolean> {
		try {
			await this.rest.delete<APISticker>(
				Routes.guildSticker(this.raw.guild_id as string, this.raw.id)
			);
			return true;
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to delete sticker with id ${this.raw.id} from the guild with id ${this.raw.guild_id}`,
				(error as Error).message
			).panic();
			return false;
		}
	}
}
