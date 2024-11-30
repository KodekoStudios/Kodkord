import { Base } from "@structures/base";
import type { Nullable } from "@types";
import type {
	APIEmoji,
	APIGuild,
	APIRole,
	GuildDefaultMessageNotifications,
	GuildExplicitContentFilter,
	GuildFeature,
	GuildMFALevel,
	GuildPremiumTier,
	GuildSystemChannelFlags,
	GuildVerificationLevel,
	Snowflake,
} from "discord-api-types/v10";

/**
 * Represents a Discord Guild and provides access to its properties.
 *
 * @todo Add additional properties for `icon` and `splash`.
 */
export class Guild extends Base<APIGuild> {
	/**
	 * Retrieves the name of the guild.
	 *
	 * @returns The guild name
	 */
	public get name(): string {
		return this.data.name;
	}

	/**
	 * Retrieves the description of the guild.
	 *
	 * @returns The guild description or null if none is set
	 */
	public get description(): string | null {
		return this.data.description;
	}

	/**
	 * Retrieves the approximate number of online members.
	 *
	 * @returns The count of online members
	 */
	public get approximatePresenceCount(): number {
		return this.data.approximate_presence_count ?? 0;
	}

	/**
	 * Retrieves the approximate total member count.
	 *
	 * @returns The total member count
	 */
	public get approximateMemberCount(): number {
		return this.data.approximate_member_count ?? 0;
	}

	/**
	 * Retrieves the features of the guild.
	 *
	 * @returns An array of guild features
	 */
	public get features(): GuildFeature[] {
		return this.data.features;
	}

	/**
	 * Retrieves the custom emojis of the guild.
	 *
	 * @returns An array of emojis
	 */
	public get emojis(): APIEmoji[] {
		return this.data.emojis;
	}

	/**
	 * Retrieves the Id of the guild owner.
	 *
	 * @returns The owner Id
	 */
	public get ownerId(): Snowflake {
		return this.data.owner_id;
	}

	/**
	 * Retrieves the Id of the application that created this guild, if applicable.
	 *
	 * @returns The application Id or null if not applicable
	 */
	public get applicationId(): Snowflake | null {
		return this.data.application_id;
	}

	/**
	 * Retrieves the voice region of the guild.
	 *
	 * @deprecated This field has been deprecated in favor of `rtc_region` on the channel.
	 * @returns The voice region
	 */
	public get region(): string {
		return this.data.region;
	}

	/**
	 * Retrieves the Id of the AFK channel.
	 *
	 * @returns The AFK channel Id or null if none is set
	 */
	public get AFKChannelId(): Snowflake | null {
		return this.data.afk_channel_id;
	}

	/**
	 * Retrieves the AFK timeout duration.
	 *
	 * @returns The AFK timeout in seconds
	 */
	public get AFKTimeout(): 60 | 300 | 900 | 1800 | 3600 {
		return this.data.afk_timeout;
	}

	/**
	 * Retrieves the Id of the system channel.
	 *
	 * @returns The system channel Id or null if none is set
	 */
	public get systemChannelId(): Snowflake | null {
		return this.data.system_channel_id;
	}

	/**
	 * Indicates whether the widget is enabled.
	 *
	 * @returns True if the widget is enabled, undefined otherwise
	 */
	public get widgetEnabled(): boolean | undefined {
		return this.data.widget_enabled;
	}

	/**
	 * Retrieves the Id of the widget channel.
	 *
	 * @returns The widget channel Id or null if none is set
	 */
	public get widgetChannelId(): Nullable<Snowflake> {
		return this.data.widget_channel_id;
	}

	/**
	 * Retrieves the guild's verification level.
	 *
	 * @returns The verification level
	 */
	public get verificationLevel(): GuildVerificationLevel {
		return this.data.verification_level;
	}

	/**
	 * Retrieves the roles of the guild.
	 *
	 * @returns An array of roles
	 */
	public get roles(): APIRole[] {
		return this.data.roles;
	}

	/**
	 * Retrieves the default message notification level of the guild.
	 *
	 * @returns The default message notifications level
	 */
	public get defaultMessageNotifications(): GuildDefaultMessageNotifications {
		return this.data.default_message_notifications;
	}

	/**
	 * Retrieves the multi-factor authentication level of the guild.
	 *
	 * @returns The MFA level
	 */
	public get MFALevel(): GuildMFALevel {
		return this.data.mfa_level;
	}

	/**
	 * Retrieves the explicit content filter level of the guild.
	 *
	 * @returns The explicit content filter level
	 */
	public get explicitContentFilter(): GuildExplicitContentFilter {
		return this.data.explicit_content_filter;
	}

	/**
	 * Retrieves the maximum number of presences allowed in the guild.
	 *
	 * @returns The maximum presences or null if unlimited
	 */
	public get maxPresences(): Nullable<number> {
		return this.data.max_presences;
	}

	/**
	 * Retrieves the maximum number of members allowed in the guild.
	 *
	 * @returns The maximum members or null if not specified
	 */
	public get maxMembers(): number | null {
		return this.data.max_members ?? null;
	}

	/**
	 * Retrieves the maximum number of users allowed in a video channel.
	 *
	 * @returns The maximum video channel users or null if not specified
	 */
	public get maxVideoChannelUsers(): number | null {
		return this.data.max_video_channel_users ?? null;
	}

	/**
	 * Retrieves the vanity URL code of the guild.
	 *
	 * @returns The vanity URL code or null if none is set
	 */
	public get vanityURLCode(): string | null {
		return this.data.vanity_url_code;
	}

	/**
	 * Retrieves the premium tier of the guild.
	 *
	 * @returns The premium tier
	 */
	public get premiumTier(): GuildPremiumTier {
		return this.data.premium_tier;
	}

	/**
	 * Retrieves the number of premium subscriptions in the guild.
	 *
	 * @returns The premium subscription count or null if not available
	 */
	public get premiumSubscriptionCount(): number | null {
		return this.data.premium_subscription_count ?? null;
	}

	/**
	 * Retrieves the flags for the system channel.
	 *
	 * @returns The system channel flags
	 */
	public get systemChannelFlags(): GuildSystemChannelFlags {
		return this.data.system_channel_flags;
	}

	/**
	 * Retrieves the preferred locale of the guild.
	 *
	 * @default "en-US"
	 * @returns The preferred locale
	 */
	public get preferredLocale(): string {
		return this.data.preferred_locale;
	}

	/**
	 * Retrieves the Id of the rules channel.
	 *
	 * @returns The rules channel Id or null if none is set
	 */
	public get rulesChannelId(): Snowflake | null {
		return this.data.rules_channel_id;
	}

	/**
	 * Retrieves the Id of the public updates channel.
	 *
	 * @returns The public updates channel Id or null if none is set
	 */
	public get publicUpdatesChannelId(): Snowflake | null {
		return this.data.public_updates_channel_id;
	}

	/**
	 * Retrieves the Id of the safety alerts channel.
	 *
	 * @returns The safety alerts channel Id or null if none is set
	 */
	public get safetyAlertsChannelId(): Snowflake | null {
		return this.data.safety_alerts_channel_id;
	}
}
