import type {
	RESTPostAPIInteractionCallbackWithResponseResult
} from "discord-api-types/v10";

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
import { User } from "./user";

export class Interaction<Type extends InteractionType> extends Entity<
	APIInteraction & { type: Type }
> {
	private completed: boolean;

	public constructor(rest: Rest, raw: APIInteraction & { type: Type }) {
		super(rest, raw);
		this.completed = false;
	}

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

	// Fuck this use respond({ type: 5 }) you bastard.
	// Public async defer(flags: MessageFlags): Promise<RESTPostAPIInteractionCallbackWithResponseResult | undefined> {
	// 	Return this.respond({
	// 		Type: InteractionResponseType.DeferredChannelMessageWithSource,
	// 		Data: { flags }
	// 	});
	// }

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

	public async respond(body: APIInteractionResponse): Promise<RESTPostAPIInteractionCallbackWithResponseResult | undefined> {
		if (this.completed) {
			new Warn("Rest", `The interaction with id ${this.raw.id} has already been completed`).warn();
			return;
		}

		try {
			const RESPONSE = await this.rest.post<RESTPostAPIInteractionCallbackWithResponseResult>(Routes.interactionCallback(this.raw.id, this.raw.token), {
				body,
				query: {
					// @ts-expect-error
					with_response: true
				}
			});

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

	public async guild(): Promise<Entity<APIGuild> | undefined> {
		if (this.raw.guild) {
			try {
				return new Entity(
					this.rest,
					await this.rest.get<APIGuild>(Routes.guild(this.raw.guild.id))
				);
			} catch (error) {
				new Warn(
					"Rest",
					`Failed to fetch guild with id ${this.raw.id}`,
					(error as Error).message
				).warn();

			}
		}

	}

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

	public user(): User | null {
		return this.raw.user
			? new User(this.rest, this.raw.user)
			: null;
	}

	public isCompleted(): boolean {
		return this.completed;
	}

	public isPing(): this is Interaction<InteractionType.Ping> {
		return this.raw.type === InteractionType.Ping;
	}

	public isApplicationCommand(): this is Interaction<InteractionType.ApplicationCommand> {
		return this.raw.type === InteractionType.ApplicationCommand;
	}

	public isMessageComponent(): this is Interaction<InteractionType.MessageComponent> {
		return this.raw.type === InteractionType.MessageComponent;
	}

	public isApplicationCommandAutocomplete(): this is Interaction<InteractionType.ApplicationCommandAutocomplete> {
		return this.raw.type === InteractionType.ApplicationCommandAutocomplete;
	}

	public isModalSubmit(): this is Interaction<InteractionType.ModalSubmit> {
		return this.raw.type === InteractionType.ModalSubmit;
	}
}
