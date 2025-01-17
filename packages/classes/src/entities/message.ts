import {
	type RESTPostAPIChannelMessageJSONBody,
	type APIReaction,
	type ChannelType,
	type APIChannel,
	type APIMessage,
	MessageType,
	Routes
} from "discord-api-types/v10";
import { type APIRequestParameters, Warn } from "kodkord";
import { Entity } from "@entity";

import { Channel } from "./channel";
import { User } from "./user";

/** Represents a message within a Discord channel. */
export class Message<Type extends MessageType> extends Entity<{ type: Type } & APIMessage> {
	/**
	 * Posts a reply to this message.
	 *
	 * @param body The message payload to send as a reply.
	 * @param force Whether to throw an error if the referenced message does not exist.
	 * @returns A promise resolving to the `Message` instance of the sent reply, or `undefined` if the operation fails.
	 */
	public async postReply(
		body: RESTPostAPIChannelMessageJSONBody,
		force = false
	): Promise<Message<MessageType> | undefined> {
		try {
			return new Message(
				this.rest,
				await this.rest.post<APIMessage>(Routes.channelMessages(this.raw.channel_id), {
					body: {
						...body,
						message_reference: {
							message_id: this.raw.id,
							channel_id: this.raw.channel_id,
							fail_if_not_exists: force
						}
					}
				} as { body: RESTPostAPIChannelMessageJSONBody } & APIRequestParameters)
			);
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to reply message with id ${this.raw.id}`,
				(error as Error).message
			).warn();


		}
	}

	/**
	 * Fetches the channel this message belongs to.
	 *
	 * @returns A promise resolving to the `Channel` instance of the channel, or `undefined` if the operation fails.
	 */
	public async channel(): Promise<Channel<ChannelType> | undefined> {
		try {
			return new Channel(
				this.rest,
				await this.rest.get<APIChannel>(Routes.channel(this.raw.channel_id))
			);
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to fetch channel with id ${this.raw.id}`,
				(error as Error).message
			).warn();


		}
	}

	/**
	 * Gets the author of this message.
	 *
	 * @returns A `User` instance representing the message author.
	 */
	public author(): User {
		return new User(this.rest, this.raw.author);
	}

	/**
	 * Adds a reaction to this message.
	 *
	 * @param emoji The emoji to add as a reaction. This can be a Unicode emoji or a custom emoji in the format `name:id`.
	 * @returns A promise resolving to `true` if the reaction was successfully added, or `false` if it failed.
	 */
	public async addReaction(emoji: string): Promise<boolean> {
		try {
			await this.rest.put(
				Routes.channelMessageOwnReaction(
					this.raw.channel_id,
					this.raw.id,
					encodeURIComponent(emoji)
				)
			);
			return true;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to add reaction ${emoji} to message with id ${this.raw.id}`,
				(error as Error).message
			).warn();
			return false;
		}
	}

	/**
	 * Removes a reaction from this message.
	 *
	 * @param emoji The emoji to remove as a reaction.
	 * @param ownerId The Id of the user whose reaction is being removed. Defaults to `@me`.
	 * @returns A promise resolving to `true` if the reaction was successfully removed, or `false` if it failed.
	 */
	public async removeReaction(emoji: string, ownerId = "@me"): Promise<boolean> {
		try {
			await this.rest.delete(
				Routes.channelMessageUserReaction(
					this.raw.channel_id,
					this.raw.id,
					encodeURIComponent(emoji),
					ownerId
				)
			);
			return true;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to remove reaction ${emoji} by ${ownerId} from message with id ${this.raw.id}`,
				(error as Error).message
			).warn();
			return false;
		}
	}

	/**
	 * Retrieves reaction data for a specific emoji on this message.Retrieves reaction data for a specific emoji on this message.
	 *
	 * @param reaction The emoji to search for, either as a Unicode or custom emoji.
	 * @returns The `APIReaction` object for the emoji, or `undefined` if no reaction is found.
	 */
	public getReaction(reaction: string): APIReaction | undefined {
		return this.raw.reactions?.find(
			({ emoji: { id, name } }) => id === reaction || name === reaction
		);
	}

	/**
	 * Retrieves the count of a specific reaction on this message.
	 *
	 * @param reaction The emoji to search for, either as a Unicode or custom emoji.
	 * @returns The count of reactions for the emoji. Returns 0 if the emoji is not found.
	 */
	public getReactionCount(reaction: string): number {
		const FOUND = this.raw.reactions?.find(
			({ emoji: { id, name } }) => id === reaction || name === reaction
		);
		return FOUND
? FOUND.count
: 0;
	}

	/**
	 * Pins this message in its channel.
	 *
	 * @returns A promise resolving to `true` if the message was successfully pinned, or `false` if it failed.
	 */
	public async pin(): Promise<boolean> {
		try {
			await this.rest.put(Routes.channelPin(this.raw.channel_id, this.raw.id));

			return true;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to pin message with id ${this.raw.id}`,
				(error as Error).message
			).warn();

			return false;
		}
	}

	/**
	 * Unpins this message from its channel.
	 *
	 * @returns A promise resolving to `true` if the message was successfully unpinned, or `false` if it failed.
	 */
	public async unpin(): Promise<boolean> {
		try {
			await this.rest.delete(Routes.channelPin(this.raw.channel_id, this.raw.id));

			return true;
		} catch (error) {
			new Warn(
				"Rest",
				`Failed to unpin message with id ${this.raw.id}`,
				(error as Error).message
			).warn();

			return false;
		}
	}

	// Type Guards

	public isDefault(): this is Message<MessageType.Default> {
		return this.raw.type === MessageType.Default;
	}

	public isRecipientAdd(): this is Message<MessageType.RecipientAdd> {
		return this.raw.type === MessageType.RecipientAdd;
	}

	public isRecipientRemove(): this is Message<MessageType.RecipientRemove> {
		return this.raw.type === MessageType.RecipientRemove;
	}

	public isCall(): this is Message<MessageType.Call> {
		return this.raw.type === MessageType.Call;
	}

	public isChannelNameChange(): this is Message<MessageType.ChannelNameChange> {
		return this.raw.type === MessageType.ChannelNameChange;
	}

	public isChannelIconChange(): this is Message<MessageType.ChannelIconChange> {
		return this.raw.type === MessageType.ChannelIconChange;
	}

	public isChannelPinnedMessage(): this is Message<MessageType.ChannelPinnedMessage> {
		return this.raw.type === MessageType.ChannelPinnedMessage;
	}

	public isUserJoin(): this is Message<MessageType.UserJoin> {
		return this.raw.type === MessageType.UserJoin;
	}

	public isGuildBoost(): this is Message<MessageType.GuildBoost> {
		return this.raw.type === MessageType.GuildBoost;
	}

	public isGuildBoostTier1(): this is Message<MessageType.GuildBoostTier1> {
		return this.raw.type === MessageType.GuildBoostTier1;
	}

	public isGuildBoostTier2(): this is Message<MessageType.GuildBoostTier2> {
		return this.raw.type === MessageType.GuildBoostTier2;
	}

	public isGuildBoostTier3(): this is Message<MessageType.GuildBoostTier3> {
		return this.raw.type === MessageType.GuildBoostTier3;
	}

	public isChannelFollowAdd(): this is Message<MessageType.ChannelFollowAdd> {
		return this.raw.type === MessageType.ChannelFollowAdd;
	}

	public isGuildDiscoveryDisqualified(): this is Message<MessageType.GuildDiscoveryDisqualified> {
		return this.raw.type === MessageType.GuildDiscoveryDisqualified;
	}

	public isGuildDiscoveryRequalified(): this is Message<MessageType.GuildDiscoveryRequalified> {
		return this.raw.type === MessageType.GuildDiscoveryRequalified;
	}

	public isGuildGuildDiscoveryGracePeriodInitialWarning(): this is Message<MessageType.GuildDiscoveryGracePeriodInitialWarning> {
		return this.raw.type === MessageType.GuildDiscoveryGracePeriodInitialWarning;
	}

	public isGuildDiscoveryGracePeriodFinalWarning(): this is Message<MessageType.GuildDiscoveryGracePeriodFinalWarning> {
		return this.raw.type === MessageType.GuildDiscoveryGracePeriodFinalWarning;
	}

	public isThreadCreated(): this is Message<MessageType.ThreadCreated> {
		return this.raw.type === MessageType.ThreadCreated;
	}

	public isReply(): this is Message<MessageType.Reply> {
		return this.raw.type === MessageType.Reply;
	}

	public isChatInputCommand(): this is Message<MessageType.ChatInputCommand> {
		return this.raw.type === MessageType.ChatInputCommand;
	}

	public isThreadStarterMessage(): this is Message<MessageType.ThreadStarterMessage> {
		return this.raw.type === MessageType.ThreadStarterMessage;
	}

	public isGuildInviteReminder(): this is Message<MessageType.GuildInviteReminder> {
		return this.raw.type === MessageType.GuildInviteReminder;
	}

	public isContextMenuCommand(): this is Message<MessageType.ContextMenuCommand> {
		return this.raw.type === MessageType.ContextMenuCommand;
	}

	public isAutoModerationAction(): this is Message<MessageType.AutoModerationAction> {
		return this.raw.type === MessageType.AutoModerationAction;
	}

	public isRoleSubscriptionPurchase(): this is Message<MessageType.RoleSubscriptionPurchase> {
		return this.raw.type === MessageType.RoleSubscriptionPurchase;
	}

	public isInteractionPremiumUpsell(): this is Message<MessageType.InteractionPremiumUpsell> {
		return this.raw.type === MessageType.InteractionPremiumUpsell;
	}

	public isStageStart(): this is Message<MessageType.StageStart> {
		return this.raw.type === MessageType.StageStart;
	}

	public isStageEnd(): this is Message<MessageType.StageEnd> {
		return this.raw.type === MessageType.StageEnd;
	}

	public isStageSpeaker(): this is Message<MessageType.StageSpeaker> {
		return this.raw.type === MessageType.StageSpeaker;
	}

	public isStageRaiseHand(): this is Message<MessageType.StageRaiseHand> {
		return this.raw.type === MessageType.StageRaiseHand;
	}

	public isStageTopic(): this is Message<MessageType.StageTopic> {
		return this.raw.type === MessageType.StageTopic;
	}

	public isGuildApplicationPremiumSubscription(): this is Message<MessageType.GuildApplicationPremiumSubscription> {
		return this.raw.type === MessageType.GuildApplicationPremiumSubscription;
	}

	public isGuildIncidentAlertModeEnabled(): this is Message<MessageType.GuildIncidentAlertModeEnabled> {
		return this.raw.type === MessageType.GuildIncidentAlertModeEnabled;
	}

	public isGuildIncidentAlertModeDisabled(): this is Message<MessageType.GuildIncidentAlertModeDisabled> {
		return this.raw.type === MessageType.GuildIncidentAlertModeDisabled;
	}

	public isGuildIncidentReportRaid(): this is Message<MessageType.GuildIncidentReportRaid> {
		return this.raw.type === MessageType.GuildIncidentReportRaid;
	}

	public isGuildIncidentReportFalseAlarm(): this is Message<MessageType.GuildIncidentReportFalseAlarm> {
		return this.raw.type === MessageType.GuildIncidentReportFalseAlarm;
	}

	public isPurchaseNotification(): this is Message<MessageType.PurchaseNotification> {
		return this.raw.type === MessageType.PurchaseNotification;
	}

	public isPollResult(): this is Message<MessageType.PollResult> {
		return this.raw.type === MessageType.PollResult;
	}
}
