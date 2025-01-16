import { Entity } from "@entity";
import {
	type APIChannel,
	type APIGuild,
	type APIInteraction,
	type APIInteractionResponse,
	type ChannelType,
	InteractionResponseType,
	InteractionType,
	type MessageFlags,
	Routes,
} from "discord-api-types/v10";
import { type APIRequestParameters, type Rest, Warn } from "kodkord";
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
				{ body } as APIRequestParameters & { body: APIInteractionResponse },
			);
			return true;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to delete response for interaction with id ${this.raw.id}`,
				(error as Error).message,
			).warn();
			return false;
		}
	}

	public async editResponse(body: APIInteractionResponse): Promise<boolean> {
		try {
			await this.rest.patch(
				Routes.webhookMessage(this.raw.application_id, this.raw.token, "@original"),
				{ body } as APIRequestParameters & { body: APIInteractionResponse },
			);
			return true;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to edit response for interaction with id ${this.raw.id}`,
				(error as Error).message,
			).warn();
			return false;
		}
	}

	public async defer(flags: MessageFlags): Promise<boolean> {
		return this.respond({
			type: InteractionResponseType.DeferredChannelMessageWithSource,
			data: { flags },
		});
	}

	public async pong(): Promise<boolean> {
		if (this.isPing()) {
			return this.respond({
				type: InteractionResponseType.Pong,
			});
		}

		new Warn(
			"Rest",
			`Attempt to respond with pong to an interaction of type ${this.raw.type} with id ${this.raw.id}`,
		).warn();

		return false;
	}

	public async respond(body: APIInteractionResponse): Promise<boolean> {
		if (this.completed) {
			new Warn("Rest", `The interaction with id ${this.raw.id} has already been completed`).warn();
			return false;
		}

		try {
			await this.rest.post(Routes.interactionCallback(this.raw.id, this.raw.token), {
				body,
			} as APIRequestParameters & { body: APIInteractionResponse });
			this.completed = true;
			return true;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to respond interaction with id ${this.raw.id}`,
				(error as Error).message,
			).warn();
			return false;
		}
	}

	public async guild(): Promise<Entity<APIGuild> | undefined> {
		if (this.raw.guild) {
			try {
				return new Entity(
					this.rest,
					await this.rest.get<APIGuild>(Routes.guild(this.raw.guild.id)),
				);
			} catch (error) {
				new Warn(
					"Rest",
					`Failed to fetch guild with id ${this.raw.id}`,
					(error as Error).message,
				).warn();
				return;
			}
		}
		return;
	}

	public async channel(): Promise<Channel<ChannelType> | undefined> {
		if (this.raw.channel) {
			try {
				return new Channel(
					this.rest,
					await this.rest.get<APIChannel>(Routes.channel(this.raw.channel.id)),
				);
			} catch (error) {
				new Warn(
					"Rest",
					`Failed to fetch channel with id ${this.raw.id}`,
					(error as Error).message,
				).warn();
				return;
			}
		}
		return;
	}

	public user(): User | null {
		return this.raw.user ? new User(this.rest, this.raw.user) : null;
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

	public isApplicationCommandAutocomplete(): this is this & {
		type: InteractionType.ApplicationCommandAutocomplete;
	} {
		return this.raw.type === InteractionType.ApplicationCommandAutocomplete;
	}

	public isModalSubmit(): this is Interaction<InteractionType.ModalSubmit> {
		return this.raw.type === InteractionType.ModalSubmit;
	}
}
