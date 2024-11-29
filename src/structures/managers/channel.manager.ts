import type { Client } from "@core/client";
import type { BaseChannel } from "@structures/channel/base.channel";
import { type AllChannels, channelFrom } from "@structures/channel/channel";
import type { Snowflake } from "discord-api-types/globals";
import {
	type APIChannel,
	type ChannelType,
	type RESTPatchAPIChannelJSONBody,
	Routes,
} from "discord-api-types/v10";
import { BaseManager } from "./base.manager";

/**
 * Manages channel data within the client.
 */
export class ChannelManager extends BaseManager<AllChannels> {
	/**
	 * Constructs a new instance of the ChannelManager class.
	 *
	 * @param client The client object used to interact with the Discord API.
	 */
	constructor(client: Client) {
		super(client, "CHANNEL MANAGER");
	}

	/**
	 * Retrieves a channel from the storage by its ID.
	 *
	 * @param channelId The ID of the channel to retrieve.
	 * @returns The BaseChannel object if found; otherwise, undefined.
	 */
	public get(channelId: Snowflake): AllChannels | undefined {
		return this.storage.get(channelId);
	}

	/**
	 * Checks if a channel exists in the storage.
	 *
	 * @param channelId The ID of the channel to check for.
	 * @returns True if the channel exists in the storage; otherwise, false.
	 */
	public has(channelId: Snowflake): boolean {
		return this.storage.has(channelId);
	}

	/**
	 * Removes a channel from the storage by its ID.
	 *
	 * @param channelId The ID of the channel to remove.
	 * @returns True if the channel was successfully removed; otherwise, false.
	 */
	public remove(channelId: Snowflake): boolean {
		return this.storage.delete(channelId);
	}

	/**
	 * Fetches a channel from the Discord API or cache.
	 *
	 * @param channelId The ID of the channel to fetch.
	 * @param force Whether to bypass the cache and always fetch from the API.
	 * @returns A Promise resolving to the channel object.
	 */
	public async fetch(channelId: Snowflake, force = false): Promise<AllChannels> {
		if (!force && this.storage.has(channelId)) {
			return this.storage.get(channelId) as BaseChannel<ChannelType>;
		}

		try {
			const apiChannel = await this.client.APIHandler.get<APIChannel>(Routes.channel(channelId));
			const channel = channelFrom(apiChannel, this.client);
			this.storage.set(channel.id, channel);
			return channel;
		} catch (error) {
			this.logger.throw(`Failed to fetch channel with ID ${channelId}`, (error as Error).message);
			throw new Error(`Failed to fetch channel with ID ${channelId}: ${(error as Error).message}`);
		}
	}

	/**
	 * Edits a channel's data.
	 *
	 * @param channelId The ID of the channel to edit.
	 * @param body The updated channel data.
	 * @param reason Optional reason for editing the channel.
	 * @returns A Promise resolving to the updated channel object.
	 */
	public async edit(
		channelId: Snowflake,
		body: RESTPatchAPIChannelJSONBody,
		reason?: string,
	): Promise<AllChannels> {
		try {
			const apiChannel = await this.client.APIHandler.patch<APIChannel>(Routes.channel(channelId), {
				body: body as Record<string, object>,
				reason: reason,
			});
			const updatedChannel = channelFrom(apiChannel, this.client);
			this.storage.set(channelId, updatedChannel);
			return updatedChannel;
		} catch (error) {
			this.logger.throw(`Failed to edit channel with ID ${channelId}`, (error as Error).message);
			throw new Error(`Failed to edit channel with ID ${channelId}: ${(error as Error).message}`);
		}
	}

	/**
	 * Clears all channels from the storage.
	 */
	public clear(): void {
		this.storage.clear();
	}

	/**
	 * Deletes a channel by its ID.
	 *
	 * @param channelId The ID of the channel to delete.
	 * @param reason Optional reason for deletion.
	 * @returns A Promise resolving to the deleted channel object.
	 */
	public async delete(channelId: Snowflake, reason?: string): Promise<AllChannels> {
		try {
			const apiChannel = await this.client.APIHandler.delete<APIChannel>(
				Routes.channel(channelId),
				{ reason },
			);
			const deletedChannel = channelFrom(apiChannel, this.client);
			this.storage.delete(channelId);
			return deletedChannel;
		} catch (error) {
			this.logger.throw(`Failed to delete channel with ID ${channelId}`, (error as Error).message);
			throw new Error(`Failed to delete channel with ID ${channelId}: ${(error as Error).message}`);
		}
	}

	/**
	 * Filters channels in the storage based on a predicate.
	 *
	 * @param predicate A function that takes a BaseChannel object and returns a boolean.
	 * @returns An array of BaseChannel objects matching the predicate.
	 */
	public filter(predicate: (channel: AllChannels) => boolean): BaseChannel<ChannelType>[] {
		return [...this.storage.values()].filter(predicate);
	}
}
