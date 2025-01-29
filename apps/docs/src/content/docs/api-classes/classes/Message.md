---
editUrl: false
next: false
prev: false
title: "Message"
---

Defined in: [entities/message.ts:21](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L21)

Represents a message within a Discord channel.

## Extends

- [`Entity`](/api-classes/classes/entity/)\<`object` & `APIMessage`\>

## Type Parameters

| Type Parameter |
| ------ |
| `Type` *extends* `MessageType` |

## Constructors

### new Message()

> **new Message**\<`Type`\>(`rest`, `raw`): [`Message`](/api-classes/classes/message/)\<`Type`\>

Defined in: [core/entity.ts:18](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | `object` & `APIMessage` | The raw data from the API response. |

#### Returns

[`Message`](/api-classes/classes/message/)\<`Type`\>

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`constructor`](/api-classes/classes/entity/#constructors)

## Properties

### rest

> `readonly` **rest**: `Rest`

Defined in: [core/entity.ts:8](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/core/entity.ts#L8)

The `Rest` instance for interacting with the Discord API.

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`rest`](/api-classes/classes/entity/#rest-1)

***

### raw

> `readonly` **raw**: `object` & `APIMessage`

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Type declaration

##### type

> **type**: `Type`

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`raw`](/api-classes/classes/entity/#raw-1)

## Methods

### reply()

> **reply**(`body`, `force`): `Promise`\<`undefined` \| [`Message`](/api-classes/classes/message/)\<`MessageType`\>\>

Defined in: [entities/message.ts:29](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L29)

Posts a reply to this message.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `body` | `RESTPostAPIChannelMessageJSONBody` | `undefined` | The message payload to send as a reply. |
| `force` | `boolean` | `false` | Whether to throw an error if the referenced message does not exist. |

#### Returns

`Promise`\<`undefined` \| [`Message`](/api-classes/classes/message/)\<`MessageType`\>\>

A promise resolving to the `Message` instance of the sent reply, or `undefined` if the operation fails.

***

### modify()

> **modify**(`body`): `Promise`\<`undefined` \| [`Message`](/api-classes/classes/message/)\<`MessageType`\>\>

Defined in: [entities/message.ts:56](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L56)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `body` | `RESTPatchAPIChannelMessageJSONBody` |

#### Returns

`Promise`\<`undefined` \| [`Message`](/api-classes/classes/message/)\<`MessageType`\>\>

***

### channel()

> **channel**(): `Promise`\<`undefined` \| [`Channel`](/api-classes/classes/channel/)\<`ChannelType`\>\>

Defined in: [entities/message.ts:80](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L80)

Fetches the channel this message belongs to.

#### Returns

`Promise`\<`undefined` \| [`Channel`](/api-classes/classes/channel/)\<`ChannelType`\>\>

A promise resolving to the `Channel` instance of the channel, or `undefined` if the operation fails.

***

### author()

> **author**(): [`User`](/api-classes/classes/user/)

Defined in: [entities/message.ts:100](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L100)

Gets the author of this message.

#### Returns

[`User`](/api-classes/classes/user/)

A `User` instance representing the message author.

***

### react()

> **react**(`emoji`): `Promise`\<`boolean`\>

Defined in: [entities/message.ts:110](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L110)

Adds a reaction to this message.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `emoji` | `string` | The emoji to add as a reaction. This can be a Unicode emoji or a custom emoji in the format `name:id`. |

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the reaction was successfully added, or `false` if it failed.

***

### unreact()

> **unreact**(`emoji`, `ownerId`): `Promise`\<`boolean`\>

Defined in: [entities/message.ts:137](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L137)

Removes a reaction from this message.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `emoji` | `string` | `undefined` | The emoji to remove as a reaction. |
| `ownerId` | `string` | `"@me"` | The Id of the user whose reaction is being removed. Defaults to `@me`. |

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the reaction was successfully removed, or `false` if it failed.

***

### reaction()

> **reaction**(`reaction`): `undefined` \| `APIReaction`

Defined in: [entities/message.ts:164](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L164)

Retrieves reaction data for a specific emoji on this message.Retrieves reaction data for a specific emoji on this message.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `reaction` | `string` | The emoji to search for, either as a Unicode or custom emoji. |

#### Returns

`undefined` \| `APIReaction`

The `APIReaction` object for the emoji, or `undefined` if no reaction is found.

***

### reactionCount()

> **reactionCount**(`reaction`): `number`

Defined in: [entities/message.ts:176](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L176)

Retrieves the count of a specific reaction on this message.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `reaction` | `string` | The emoji to search for, either as a Unicode or custom emoji. |

#### Returns

`number`

The count of reactions for the emoji. Returns 0 if the emoji is not found.

***

### pin()

> **pin**(): `Promise`\<`boolean`\>

Defined in: [entities/message.ts:190](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L190)

Pins this message in its channel.

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the message was successfully pinned, or `false` if it failed.

***

### unpin()

> **unpin**(): `Promise`\<`boolean`\>

Defined in: [entities/message.ts:211](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L211)

Unpins this message from its channel.

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the message was successfully unpinned, or `false` if it failed.

***

### endPoll()

> **endPoll**(): `Promise`\<`undefined` \| `APIPoll`\>

Defined in: [entities/message.ts:227](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L227)

#### Returns

`Promise`\<`undefined` \| `APIPoll`\>

***

### answerVoters()

> **answerVoters**(`answerId`): `Promise`\<`undefined` \| `APIUser`[]\>

Defined in: [entities/message.ts:239](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L239)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `answerId` | `number` |

#### Returns

`Promise`\<`undefined` \| `APIUser`[]\>

***

### isDefault()

> **isDefault**(): `this is Message<Default>`

Defined in: [entities/message.ts:255](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L255)

#### Returns

`this is Message<Default>`

***

### isRecipientAdd()

> **isRecipientAdd**(): `this is Message<RecipientAdd>`

Defined in: [entities/message.ts:259](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L259)

#### Returns

`this is Message<RecipientAdd>`

***

### isRecipientRemove()

> **isRecipientRemove**(): `this is Message<RecipientRemove>`

Defined in: [entities/message.ts:263](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L263)

#### Returns

`this is Message<RecipientRemove>`

***

### isCall()

> **isCall**(): `this is Message<Call>`

Defined in: [entities/message.ts:267](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L267)

#### Returns

`this is Message<Call>`

***

### isChannelNameChange()

> **isChannelNameChange**(): `this is Message<ChannelNameChange>`

Defined in: [entities/message.ts:271](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L271)

#### Returns

`this is Message<ChannelNameChange>`

***

### isChannelIconChange()

> **isChannelIconChange**(): `this is Message<ChannelIconChange>`

Defined in: [entities/message.ts:275](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L275)

#### Returns

`this is Message<ChannelIconChange>`

***

### isChannelPinnedMessage()

> **isChannelPinnedMessage**(): `this is Message<ChannelPinnedMessage>`

Defined in: [entities/message.ts:279](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L279)

#### Returns

`this is Message<ChannelPinnedMessage>`

***

### isUserJoin()

> **isUserJoin**(): `this is Message<UserJoin>`

Defined in: [entities/message.ts:283](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L283)

#### Returns

`this is Message<UserJoin>`

***

### isGuildBoost()

> **isGuildBoost**(): `this is Message<GuildBoost>`

Defined in: [entities/message.ts:287](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L287)

#### Returns

`this is Message<GuildBoost>`

***

### isGuildBoostTier1()

> **isGuildBoostTier1**(): `this is Message<GuildBoostTier1>`

Defined in: [entities/message.ts:291](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L291)

#### Returns

`this is Message<GuildBoostTier1>`

***

### isGuildBoostTier2()

> **isGuildBoostTier2**(): `this is Message<GuildBoostTier2>`

Defined in: [entities/message.ts:295](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L295)

#### Returns

`this is Message<GuildBoostTier2>`

***

### isGuildBoostTier3()

> **isGuildBoostTier3**(): `this is Message<GuildBoostTier3>`

Defined in: [entities/message.ts:299](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L299)

#### Returns

`this is Message<GuildBoostTier3>`

***

### isChannelFollowAdd()

> **isChannelFollowAdd**(): `this is Message<ChannelFollowAdd>`

Defined in: [entities/message.ts:303](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L303)

#### Returns

`this is Message<ChannelFollowAdd>`

***

### isGuildDiscoveryDisqualified()

> **isGuildDiscoveryDisqualified**(): `this is Message<GuildDiscoveryDisqualified>`

Defined in: [entities/message.ts:307](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L307)

#### Returns

`this is Message<GuildDiscoveryDisqualified>`

***

### isGuildDiscoveryRequalified()

> **isGuildDiscoveryRequalified**(): `this is Message<GuildDiscoveryRequalified>`

Defined in: [entities/message.ts:311](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L311)

#### Returns

`this is Message<GuildDiscoveryRequalified>`

***

### isGuildGuildDiscoveryGracePeriodInitialWarning()

> **isGuildGuildDiscoveryGracePeriodInitialWarning**(): `this is Message<GuildDiscoveryGracePeriodInitialWarning>`

Defined in: [entities/message.ts:315](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L315)

#### Returns

`this is Message<GuildDiscoveryGracePeriodInitialWarning>`

***

### isGuildDiscoveryGracePeriodFinalWarning()

> **isGuildDiscoveryGracePeriodFinalWarning**(): `this is Message<GuildDiscoveryGracePeriodFinalWarning>`

Defined in: [entities/message.ts:319](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L319)

#### Returns

`this is Message<GuildDiscoveryGracePeriodFinalWarning>`

***

### isThreadCreated()

> **isThreadCreated**(): `this is Message<ThreadCreated>`

Defined in: [entities/message.ts:323](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L323)

#### Returns

`this is Message<ThreadCreated>`

***

### isReply()

> **isReply**(): `this is Message<Reply>`

Defined in: [entities/message.ts:327](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L327)

#### Returns

`this is Message<Reply>`

***

### isChatInputCommand()

> **isChatInputCommand**(): `this is Message<ChatInputCommand>`

Defined in: [entities/message.ts:331](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L331)

#### Returns

`this is Message<ChatInputCommand>`

***

### isThreadStarterMessage()

> **isThreadStarterMessage**(): `this is Message<ThreadStarterMessage>`

Defined in: [entities/message.ts:335](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L335)

#### Returns

`this is Message<ThreadStarterMessage>`

***

### isGuildInviteReminder()

> **isGuildInviteReminder**(): `this is Message<GuildInviteReminder>`

Defined in: [entities/message.ts:339](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L339)

#### Returns

`this is Message<GuildInviteReminder>`

***

### isContextMenuCommand()

> **isContextMenuCommand**(): `this is Message<ContextMenuCommand>`

Defined in: [entities/message.ts:343](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L343)

#### Returns

`this is Message<ContextMenuCommand>`

***

### isAutoModerationAction()

> **isAutoModerationAction**(): `this is Message<AutoModerationAction>`

Defined in: [entities/message.ts:347](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L347)

#### Returns

`this is Message<AutoModerationAction>`

***

### isRoleSubscriptionPurchase()

> **isRoleSubscriptionPurchase**(): `this is Message<RoleSubscriptionPurchase>`

Defined in: [entities/message.ts:351](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L351)

#### Returns

`this is Message<RoleSubscriptionPurchase>`

***

### isInteractionPremiumUpsell()

> **isInteractionPremiumUpsell**(): `this is Message<InteractionPremiumUpsell>`

Defined in: [entities/message.ts:355](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L355)

#### Returns

`this is Message<InteractionPremiumUpsell>`

***

### isStageStart()

> **isStageStart**(): `this is Message<StageStart>`

Defined in: [entities/message.ts:359](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L359)

#### Returns

`this is Message<StageStart>`

***

### isStageEnd()

> **isStageEnd**(): `this is Message<StageEnd>`

Defined in: [entities/message.ts:363](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L363)

#### Returns

`this is Message<StageEnd>`

***

### isStageSpeaker()

> **isStageSpeaker**(): `this is Message<StageSpeaker>`

Defined in: [entities/message.ts:367](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L367)

#### Returns

`this is Message<StageSpeaker>`

***

### isStageRaiseHand()

> **isStageRaiseHand**(): `this is Message<StageRaiseHand>`

Defined in: [entities/message.ts:371](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L371)

#### Returns

`this is Message<StageRaiseHand>`

***

### isStageTopic()

> **isStageTopic**(): `this is Message<StageTopic>`

Defined in: [entities/message.ts:375](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L375)

#### Returns

`this is Message<StageTopic>`

***

### isGuildApplicationPremiumSubscription()

> **isGuildApplicationPremiumSubscription**(): `this is Message<GuildApplicationPremiumSubscription>`

Defined in: [entities/message.ts:379](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L379)

#### Returns

`this is Message<GuildApplicationPremiumSubscription>`

***

### isGuildIncidentAlertModeEnabled()

> **isGuildIncidentAlertModeEnabled**(): `this is Message<GuildIncidentAlertModeEnabled>`

Defined in: [entities/message.ts:383](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L383)

#### Returns

`this is Message<GuildIncidentAlertModeEnabled>`

***

### isGuildIncidentAlertModeDisabled()

> **isGuildIncidentAlertModeDisabled**(): `this is Message<GuildIncidentAlertModeDisabled>`

Defined in: [entities/message.ts:387](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L387)

#### Returns

`this is Message<GuildIncidentAlertModeDisabled>`

***

### isGuildIncidentReportRaid()

> **isGuildIncidentReportRaid**(): `this is Message<GuildIncidentReportRaid>`

Defined in: [entities/message.ts:391](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L391)

#### Returns

`this is Message<GuildIncidentReportRaid>`

***

### isGuildIncidentReportFalseAlarm()

> **isGuildIncidentReportFalseAlarm**(): `this is Message<GuildIncidentReportFalseAlarm>`

Defined in: [entities/message.ts:395](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L395)

#### Returns

`this is Message<GuildIncidentReportFalseAlarm>`

***

### isPurchaseNotification()

> **isPurchaseNotification**(): `this is Message<PurchaseNotification>`

Defined in: [entities/message.ts:399](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L399)

#### Returns

`this is Message<PurchaseNotification>`

***

### isPollResult()

> **isPollResult**(): `this is Message<PollResult>`

Defined in: [entities/message.ts:403](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L403)

#### Returns

`this is Message<PollResult>`

***

### destroy()

> **destroy**(): `Promise`\<`boolean`\>

Defined in: [entities/message.ts:407](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/message.ts#L407)

#### Returns

`Promise`\<`boolean`\>
