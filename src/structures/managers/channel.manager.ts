import type { Client } from "@core/client";
import { type AnyChannel, Channel } from "@structures/channel/channel";
import type { Snowflake } from "discord-api-types/globals";
import {
	type APIChannel,
	type ChannelType,
	type RESTPatchAPIChannelJSONBody,
	Routes,
} from "discord-api-types/v10";
import { Manager } from "./manager";

/**
 * Manages channel data within the client.
 */
export class ChannelManager extends Manager<AnyChannel> {
	/**
	 * Constructs a new instance of the ChannelManager class.
	 *
	 * @param client The client object used to interact with the Discord API.
	 */
	public constructor(client: Client) {
		super(client, "CHANNEL MANAGER");
	}

	/**
	 * Retrieves a channel from the storage by its Id.
	 *
	 * @param channelId The Id of the channel to retrieve.
	 * @returns The BaseChannel object if found; otherwise, undefined.
	 */
	public get(channelId: Snowflake): AnyChannel | undefined {
		return this.storage.get(channelId);
	}

	/**
	 * Checks if a channel exists in the storage.
	 *
	 * @param channelId The Id of the channel to check for.
	 * @returns True if the channel exists in the storage; otherwise, false.
	 */
	public has(channelId: Snowflake): boolean {
		return this.storage.has(channelId);
	}

	/**
	 * Removes a channel from the storage by its Id.
	 *
	 * @param channelId The Id of the channel to remove.
	 * @returns True if the channel was successfully removed; otherwise, false.
	 */
	public remove(channelId: Snowflake): boolean {
		return this.storage.delete(channelId);
	}

	/**
	 * Fetches a channel from the Discord API or cache.
	 *
	 * @param channelId The Id of the channel to fetch.
	 * @param force Whether to bypass the cache and always fetch from the API.
	 * @returns A Promise resolving to the channel object.
	 */
	public async fetch(channelId: Snowflake, force = false): Promise<AnyChannel> {
		if (!force && this.storage.has(channelId)) {
			return this.storage.get(channelId) as Channel<ChannelType>;
		}

		try {
			const API_CHANNEL = await this.client.APIHandler.get<APIChannel>(Routes.channel(channelId));
			const CHANNEL = Channel.from(API_CHANNEL, this.client);
			this.storage.set(CHANNEL.id, CHANNEL);
			return CHANNEL;
		} catch (error) {
			this.logger.throw(`Failed to fetch channel with Id ${channelId}`, (error as Error).message);
			throw new Error(`Failed to fetch channel with Id ${channelId}: ${(error as Error).message}`);
		}
	}

	/**
	 * Edits a channel's data.
	 *
	 * @param channelId The Id of the channel to edit.
	 * @param body The updated channel data.
	 * @param reason Optional reason for editing the channel.
	 * @returns A Promise resolving to the updated channel object.
	 */
	public async edit(
		channelId: Snowflake,
		body: RESTPatchAPIChannelJSONBody,
		reason?: string,
	): Promise<AnyChannel> {
		try {
			const API_CHANNEL = await this.client.APIHandler.patch<APIChannel>(
				Routes.channel(channelId),
				{
					body,
					reason,
				},
			);
			const UPDATED_CHANNEL = Channel.from(API_CHANNEL, this.client);
			this.storage.set(channelId, UPDATED_CHANNEL);
			return UPDATED_CHANNEL;
		} catch (error) {
			this.logger.throw(`Failed to edit channel with Id ${channelId}`, (error as Error).message);
			throw new Error(`Failed to edit channel with Id ${channelId}: ${(error as Error).message}`);
		}
	}

	/**
	 * Clears all channels from the storage.
	 */
	public clear(): void {
		this.storage.clear();
	}

	/**
	 * Deletes a channel by its Id.
	 *
	 * @param channelId The Id of the channel to delete.
	 * @param reason Optional reason for deletion.
	 * @returns A Promise resolving to the deleted channel object.
	 */
	public async delete(channelId: Snowflake, reason?: string): Promise<AnyChannel> {
		try {
			const API_CHANNEL = await this.client.APIHandler.delete<APIChannel>(
				Routes.channel(channelId),
				{ reason },
			);
			const DELETED_CHANNEL = Channel.from(API_CHANNEL, this.client);
			this.storage.delete(channelId);
			return DELETED_CHANNEL;
		} catch (error) {
			this.logger.throw(`Failed to delete channel with Id ${channelId}`, (error as Error).message);
			throw new Error(`Failed to delete channel with Id ${channelId}: ${(error as Error).message}`);
		}
	}

	/**
	 * Filters channels in the storage based on a predicate.
	 *
	 * @param predicate A function that takes a BaseChannel object and returns a boolean.
	 * @returns An array of BaseChannel objects matching the predicate.
	 */
	public filter(predicate: (channel: AnyChannel) => boolean): AnyChannel[] {
		return [...this.storage.values()].filter(predicate);
	}
}
