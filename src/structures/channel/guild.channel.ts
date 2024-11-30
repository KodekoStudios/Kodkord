import type { Client } from "@core/client";
import type { APIGuildChannel, GuildChannelType } from "discord-api-types/v10";
import { Channel } from "./channel";

/**
 * Represents a guild channel.
 */
export class GuildChannel<T extends GuildChannelType> extends Channel<T> {
	public constructor(data: APIGuildChannel<T>, client: Client) {
		const { permission_overwrites, ...REST } = data;
		super(REST, client);
	}

	/**
	 * Sets the position of the channel.
	 *
	 * @param position The new position.
	 * @param reason The reason for this action.
	 * @returns The updated channel object.
	 */
	public setPosition(position: number, reason?: string): Promise<this> {
		return this.edit({ position }, reason);
	}

	/**
	 * Sets the name of the channel.
	 *
	 * @param name The new name of the channel.
	 * @param reason The reason for this action.
	 * @returns The updated channel object.
	 */
	public setName(name: string, reason?: string): Promise<this> {
		return this.edit({ name }, reason);
	}

	/**
	 * Sets the parent of the channel.
	 *
	 * @param parentId The new parent of the channel.
	 * @param reason The reason for this action.
	 * @returns The updated channel object.
	 */
	public setParent(parentId: string | null, reason?: string): Promise<this> {
		return this.edit({ parent_id: parentId }, reason);
	}
}
