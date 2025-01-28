// * ------------------------------------------- * //
// * --------This code was made by Johan-------- * //
// * ---------shitty code disclaimer!----------- * //
// * ------------------------------------------- * //

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

/** It represents a sticker within a Discord guild. */
export class Sticker extends Entity<APISticker> {
	/**
	 * Fetches the latest data for the emoji from the Discord API.
	 *
	 * @returns A promise that resolves to an updated `Emoji` instance.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async fetch(): Promise<Sticker> {
		try {
			const API = await this.rest.get<APISticker>(Routes.sticker(this.raw.id));
			return new Sticker(this.rest, API);
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
	 * Converts the image to an ArrayBuffer for further processing or usage.
	 *
	 * @returns A promise that resolves an ArrayBuffer representing the image data.
	 */
	public async buffer(): Promise<ArrayBuffer> {
		const RESPONSE = await fetch(this.url());
		const BUFFER = await RESPONSE.arrayBuffer();
		return BUFFER;
	}

	/**
	 * Modifies a emoji's data in the Discord API.
	 *
	 * @returns A promise that resolves to an updated `Emoji` instance.
	 * @throws If the API request fails, an error is logged and re-thrown.
	 */
	public async modify(data: RESTPatchAPIGuildStickerJSONBody) {
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
	 * Deletes the sticker in the Discord API.
	 *
	 * @returns A promise of a Boolean that represents that it was a success.
	 */
	public async delete() {
		try {
			await this.rest.delete<APISticker>(
				Routes.guildSticker(this.raw.guild_id as string, this.raw.id)
			);
			return true;
		} catch (error) {
			new Panic(
				"Rest",
				`Failed to fetch sticker with id ${this.raw.id} from the guild with id ${this.raw.guild_id}`,
				(error as Error).message
			).panic();
			return false;
		}
	}
}
