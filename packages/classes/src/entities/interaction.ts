import type { RESTPostAPIInteractionCallbackWithResponseResult } from "discord-api-types/v10";

import {
	type APIInteractionResponse,
	InteractionResponseType,
	type APIInteraction,
	type ChannelType,
	type APIChannel,
	InteractionType,
	type APIGuild,
	Routes
} from "discord-api-types/v10";
import { type APIRequestParameters, type Rest, Warn } from "kodkord";
import { Entity } from "@entity";

import { Channel } from "./channel";
import { Member } from "./member";
import { Guild } from "./guild";
import { User } from "./user";

/** Represents an interaction with Discord, such as a slash command or button click. */
export class Interaction<Type extends InteractionType> extends Entity<
	APIInteraction & { type: Type }
> {
	private completed: boolean;

	/**
	 * Creates an instance of the Interaction.
	 *
	 * @param rest The REST manager for making API requests.
	 * @param raw The raw data from the API response.
	 */
	public constructor(rest: Rest, raw: APIInteraction & { type: Type }) {
		super(rest, raw);
		this.completed = false;
	}

	// ====================
	// Response Handling
	// ====================

	/**
	 * Deletes the initial response to this interaction.
	 *
	 * @param body The interaction response payload.
	 * @returns A promise resolving to `true` if the response was successfully deleted, or `false` if it failed.
	 */
	public async deleteResponse(body: APIInteractionResponse): Promise<boolean> {
		try {
			await this.rest.delete(
				Routes.webhookMessage(this.raw.application_id, this.raw.token, "@original"),
				{ body } as { body: APIInteractionResponse } & APIRequestParameters
			);
			return true;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to delete response for interaction with id ${this.raw.id}`,
				(error as Error).message
			).warn();
			return false;
		}
	}

	/**
	 * Modifies the initial response to this interaction.
	 *
	 * @param body The interaction response payload.
	 * @returns A promise resolving to `true` if the response was successfully modified, or `false` if it failed.
	 */
	public async modifyResponse(body: APIInteractionResponse): Promise<boolean> {
		try {
			await this.rest.patch(
				Routes.webhookMessage(this.raw.application_id, this.raw.token, "@original"),
				{ body }
			);
			return true;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to modify response for interaction with id ${this.raw.id}`,
				(error as Error).message
			).warn();
			return false;
		}
	}

	/**
	 * Sends a Pong response to a Ping interaction.
	 *
	 * @returns A promise resolving to the interaction callback result, or `undefined` if the interaction is not a Ping.
	 */
	public async pong(): Promise<RESTPostAPIInteractionCallbackWithResponseResult | undefined> {
		if (this.isPing()) {
			return this.respond({
				type: InteractionResponseType.Pong
			});
		}

		new Warn(
			"Rest",
			`Attempt to respond with pong to an interaction of type ${InteractionType[this.raw.type]} with id ${this.raw.id}`
		).warn();
	}

	/**
	 * Responds to the interaction.
	 *
	 * @param body The interaction response payload.
	 * @returns A promise resolving to the interaction callback result, or `undefined` if the interaction has already been completed or the request fails.
	 */
	public async respond(
		body: APIInteractionResponse
	): Promise<RESTPostAPIInteractionCallbackWithResponseResult | undefined> {
		if (this.completed) {
			new Warn("Rest", `The interaction with id ${this.raw.id} has already been completed`).warn();
			return;
		}

		try {
			const RESPONSE = await this.rest.post<RESTPostAPIInteractionCallbackWithResponseResult>(
				Routes.interactionCallback(this.raw.id, this.raw.token),
				{
					body,
					query: {
						// @ts-expect-error
						with_response: true
					}
				}
			);

			this.completed = true;
			return RESPONSE;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to respond interaction with id ${this.raw.id}`,
				(error as Error).message
			).warn();
		}
	}

	// ====================
	// Guild and Channel
	// ====================

	/**
	 * Fetches the guild associated with this interaction, if applicable.
	 *
	 * @returns A promise resolving to an {@link Guild} instance representing the guild, or `undefined` if the interaction is not in a guild or the request fails.
	 */
	public async guild(): Promise<undefined | Guild> {
		if (this.raw.guild) {
			try {
				return new Guild(
					this.rest,
					await this.rest.get<APIGuild>(Routes.guild(this.raw.guild.id))
				);
			} catch (error) {
				new Warn(
					"Rest",
					`Failed to fetch guild with id ${this.raw.guild_id}`,
					(error as Error).message
				).warn();
			}
		}
	}

	/**
	 * Fetches the channel associated with this interaction, if applicable.
	 *
	 * @returns A promise resolving to a {@link Channel<ChannelType>} instance representing the channel, or `undefined` if the interaction is not in a channel or the request fails.
	 */
	public async channel(): Promise<Channel<ChannelType> | undefined> {
		if (this.raw.channel) {
			try {
				return new Channel(
					this.rest,
					await this.rest.get<APIChannel>(Routes.channel(this.raw.channel.id))
				);
			} catch (error) {
				new Warn(
					"Rest",
					`Failed to fetch channel with id ${this.raw.id}`,
					(error as Error).message
				).warn();
			}
		}
	}

	// ====================
	// User and Member
	// ====================

	/**
	 * Retrieves the user associated with this interaction.
	 *
	 * @returns A {@link User} instance representing the user, or `null` if the user is not available.
	 */
	public user(): User | null {
		const USER = this.raw.user ?? this.raw.member?.user;
		return USER
			? new User(this.rest, USER)
			: null;
	}

	/**
	 * Retrieves the member associated with this interaction, if applicable.
	 *
	 * @returns A promise resolving to a {@link Member} instance representing the member, or `null` if the interaction is not in a guild or the member is not available.
	 */
	public async member(): Promise<Member | null> {
		const GUILD = await this.rest
			.get<APIGuild>(Routes.guild(this.raw.guild_id ?? ""))
			.catch((_: unknown) => null);
		return this.raw.member && GUILD
			? new Member(this.rest, this.raw.member, GUILD)
			: null;
	}

	/**
	 * Checks if the interaction has been completed.
	 *
	 * @returns `true` if the interaction has been completed, otherwise `false`.
	 */
	public isCompleted(): boolean {
		return this.completed;
	}

	// ====================
	// Type Guards
	// ====================

	/**
	 * Checks if the interaction is a Ping.
	 */
	public isPing(): this is Interaction<InteractionType.Ping> {
		return this.raw.type === InteractionType.Ping;
	}

	/**
	 * Checks if the interaction is an Application Command.
	 */
	public isApplicationCommand(): this is Interaction<InteractionType.ApplicationCommand> {
		return this.raw.type === InteractionType.ApplicationCommand;
	}

	/**
	 * Checks if the interaction is a Message Component.
	 */
	public isMessageComponent(): this is Interaction<InteractionType.MessageComponent> {
		return this.raw.type === InteractionType.MessageComponent;
	}

	/**
	 * Checks if the interaction is an Application Command Autocomplete.
	 */
	public isApplicationCommandAutocomplete(): this is Interaction<InteractionType.ApplicationCommandAutocomplete> {
		return this.raw.type === InteractionType.ApplicationCommandAutocomplete;
	}

	/**
	 * Checks if the interaction is a Modal Submit.
	 */
	public isModalSubmit(): this is Interaction<InteractionType.ModalSubmit> {
		return this.raw.type === InteractionType.ModalSubmit;
	}
}
