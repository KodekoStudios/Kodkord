---
editUrl: false
next: false
prev: false
title: "Message"
---

Defined in: [entities/message.ts:24](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L24)

Represents a message within a Discord channel.

## Extends

- [`Entity`](/api/classes/classes/entity/)\<`object` & [`MessageData`](/api/classes/type-aliases/messagedata/)\>

## Type Parameters

| Type Parameter |
| ------ |
| `Type` *extends* `MessageType` |

## Constructors

### new Message()

> **new Message**\<`Type`\>(`rest`, `raw`): [`Message`](/api/classes/classes/message/)\<`Type`\>

Defined in: [core/entity.ts:18](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | `object` & [`MessageData`](/api/classes/type-aliases/messagedata/) | The raw data from the API response. |

#### Returns

[`Message`](/api/classes/classes/message/)\<`Type`\>

#### Inherited from

[`Entity`](/api/classes/classes/entity/).[`constructor`](/api/classes/classes/entity/#constructors)

## Properties

### rest

> `readonly` **rest**: `Rest`

Defined in: [core/entity.ts:8](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L8)

The `Rest` instance for interacting with the Discord API.

#### Inherited from

[`Entity`](/api/classes/classes/entity/).[`rest`](/api/classes/classes/entity/#rest-1)

***

### raw

> `readonly` **raw**: `object` & [`MessageData`](/api/classes/type-aliases/messagedata/)

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Type declaration

##### type

> **type**: `Type`

#### Inherited from

[`Entity`](/api/classes/classes/entity/).[`raw`](/api/classes/classes/entity/#raw-1)

## Methods

### author()

> **author**(): [`User`](/api/classes/classes/user/)

Defined in: [entities/message.ts:31](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L31)

Gets the author of this message.

#### Returns

[`User`](/api/classes/classes/user/)

A [User](/api/classes/api/classes/classes/user/) instance representing the message author.

***

### reply()

> **reply**(`body`, `force`): `Promise`\<`undefined` \| [`Message`](/api/classes/classes/message/)\<`MessageType`\>\>

Defined in: [entities/message.ts:42](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L42)

Posts a reply to this message.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `body` | `RESTPostAPIChannelMessageJSONBody` | `undefined` | The message payload to send as a reply. |
| `force` | `boolean` | `false` | Whether to throw an error if the referenced message does not exist. |

#### Returns

`Promise`\<`undefined` \| [`Message`](/api/classes/classes/message/)\<`MessageType`\>\>

A promise resolving to the [Message](/api/classes/api/classes/classes/message/) instance of the sent reply, or `undefined` if the operation fails.

***

### modify()

> **modify**(`body`): `Promise`\<`undefined` \| [`Message`](/api/classes/classes/message/)\<`MessageType`\>\>

Defined in: [entities/message.ts:75](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L75)

Modifies this message.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `body` | `RESTPatchAPIChannelMessageJSONBody` | The new body for the message. |

#### Returns

`Promise`\<`undefined` \| [`Message`](/api/classes/classes/message/)\<`MessageType`\>\>

A promise resolving to the modified [Message](/api/classes/api/classes/classes/message/) instance, or `undefined` if the operation fails.

***

### destroy()

> **destroy**(): `Promise`\<`boolean`\>

Defined in: [entities/message.ts:99](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L99)

Deletes this message.

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the message was successfully deleted, or `false` if it failed.

***

### channel()

> **channel**(): `Promise`\<`undefined` \| [`Channel`](/api/classes/classes/channel/)\<`ChannelType`\>\>

Defined in: [entities/message.ts:118](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L118)

Fetches the channel this message belongs to.

#### Returns

`Promise`\<`undefined` \| [`Channel`](/api/classes/classes/channel/)\<`ChannelType`\>\>

A promise resolving to the [Channel](/api/classes/api/classes/classes/channel/) instance of the channel, or `undefined` if the operation fails.

***

### guild()

> **guild**(): `Promise`\<`undefined` \| [`Guild`](/api/classes/classes/guild/)\>

Defined in: [entities/message.ts:139](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L139)

Fetches the guild this message belongs to, if applicable.

#### Returns

`Promise`\<`undefined` \| [`Guild`](/api/classes/classes/guild/)\>

A promise resolving to the [Guild](/api/classes/api/classes/classes/guild/) instance, or `undefined` if the message is not in a guild or the operation fails.

***

### react()

> **react**(`emoji`): `Promise`\<`boolean`\>

Defined in: [entities/message.ts:162](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L162)

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

Defined in: [entities/message.ts:189](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L189)

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

Defined in: [entities/message.ts:216](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L216)

Retrieves reaction data for a specific emoji on this message.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `reaction` | `string` | The emoji to search for, either as a Unicode or custom emoji. |

#### Returns

`undefined` \| `APIReaction`

The APIReaction object for the emoji, or `undefined` if no reaction is found.

***

### reactionCount()

> **reactionCount**(`reaction`): `number`

Defined in: [entities/message.ts:228](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L228)

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

Defined in: [entities/message.ts:242](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L242)

Pins this message in its channel.

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the message was successfully pinned, or `false` if it failed.

***

### unpin()

> **unpin**(): `Promise`\<`boolean`\>

Defined in: [entities/message.ts:261](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L261)

Unpins this message from its channel.

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the message was successfully unpinned, or `false` if it failed.

***

### endPoll()

> **endPoll**(): `Promise`\<`undefined` \| `APIPoll`\>

Defined in: [entities/message.ts:280](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L280)

Ends a poll associated with this message.

#### Returns

`Promise`\<`undefined` \| `APIPoll`\>

A promise resolving to the APIPoll object representing the ended poll, or `undefined` if the operation fails.

***

### answerVoters()

> **answerVoters**(`answerId`): `Promise`\<`undefined` \| `APIUser`[]\>

Defined in: [entities/message.ts:298](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L298)

Fetches the voters for a specific answer in a poll associated with this message.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `answerId` | `number` | The ID of the poll answer. |

#### Returns

`Promise`\<`undefined` \| `APIUser`[]\>

A promise resolving to an array of APIUser objects representing the voters, or `undefined` if the operation fails.

***

### isDefault()

> **isDefault**(): `this is Message<Default>`

Defined in: [entities/message.ts:312](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L312)

#### Returns

`this is Message<Default>`

***

### isRecipientAdd()

> **isRecipientAdd**(): `this is Message<RecipientAdd>`

Defined in: [entities/message.ts:316](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L316)

#### Returns

`this is Message<RecipientAdd>`

***

### isRecipientRemove()

> **isRecipientRemove**(): `this is Message<RecipientRemove>`

Defined in: [entities/message.ts:320](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L320)

#### Returns

`this is Message<RecipientRemove>`

***

### isCall()

> **isCall**(): `this is Message<Call>`

Defined in: [entities/message.ts:324](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L324)

#### Returns

`this is Message<Call>`

***

### isChannelNameChange()

> **isChannelNameChange**(): `this is Message<ChannelNameChange>`

Defined in: [entities/message.ts:328](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L328)

#### Returns

`this is Message<ChannelNameChange>`

***

### isChannelIconChange()

> **isChannelIconChange**(): `this is Message<ChannelIconChange>`

Defined in: [entities/message.ts:332](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L332)

#### Returns

`this is Message<ChannelIconChange>`

***

### isChannelPinnedMessage()

> **isChannelPinnedMessage**(): `this is Message<ChannelPinnedMessage>`

Defined in: [entities/message.ts:336](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L336)

#### Returns

`this is Message<ChannelPinnedMessage>`

***

### isUserJoin()

> **isUserJoin**(): `this is Message<UserJoin>`

Defined in: [entities/message.ts:340](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L340)

#### Returns

`this is Message<UserJoin>`

***

### isGuildBoost()

> **isGuildBoost**(): `this is Message<GuildBoost>`

Defined in: [entities/message.ts:344](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L344)

#### Returns

`this is Message<GuildBoost>`

***

### isGuildBoostTier1()

> **isGuildBoostTier1**(): `this is Message<GuildBoostTier1>`

Defined in: [entities/message.ts:348](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L348)

#### Returns

`this is Message<GuildBoostTier1>`

***

### isGuildBoostTier2()

> **isGuildBoostTier2**(): `this is Message<GuildBoostTier2>`

Defined in: [entities/message.ts:352](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L352)

#### Returns

`this is Message<GuildBoostTier2>`

***

### isGuildBoostTier3()

> **isGuildBoostTier3**(): `this is Message<GuildBoostTier3>`

Defined in: [entities/message.ts:356](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L356)

#### Returns

`this is Message<GuildBoostTier3>`

***

### isChannelFollowAdd()

> **isChannelFollowAdd**(): `this is Message<ChannelFollowAdd>`

Defined in: [entities/message.ts:360](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L360)

#### Returns

`this is Message<ChannelFollowAdd>`

***

### isGuildDiscoveryDisqualified()

> **isGuildDiscoveryDisqualified**(): `this is Message<GuildDiscoveryDisqualified>`

Defined in: [entities/message.ts:364](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L364)

#### Returns

`this is Message<GuildDiscoveryDisqualified>`

***

### isGuildDiscoveryRequalified()

> **isGuildDiscoveryRequalified**(): `this is Message<GuildDiscoveryRequalified>`

Defined in: [entities/message.ts:368](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L368)

#### Returns

`this is Message<GuildDiscoveryRequalified>`

***

### isGuildGuildDiscoveryGracePeriodInitialWarning()

> **isGuildGuildDiscoveryGracePeriodInitialWarning**(): `this is Message<GuildDiscoveryGracePeriodInitialWarning>`

Defined in: [entities/message.ts:372](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L372)

#### Returns

`this is Message<GuildDiscoveryGracePeriodInitialWarning>`

***

### isGuildDiscoveryGracePeriodFinalWarning()

> **isGuildDiscoveryGracePeriodFinalWarning**(): `this is Message<GuildDiscoveryGracePeriodFinalWarning>`

Defined in: [entities/message.ts:376](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L376)

#### Returns

`this is Message<GuildDiscoveryGracePeriodFinalWarning>`

***

### isThreadCreated()

> **isThreadCreated**(): `this is Message<ThreadCreated>`

Defined in: [entities/message.ts:380](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L380)

#### Returns

`this is Message<ThreadCreated>`

***

### isReply()

> **isReply**(): `this is Message<Reply>`

Defined in: [entities/message.ts:384](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L384)

#### Returns

`this is Message<Reply>`

***

### isChatInputCommand()

> **isChatInputCommand**(): `this is Message<ChatInputCommand>`

Defined in: [entities/message.ts:388](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L388)

#### Returns

`this is Message<ChatInputCommand>`

***

### isThreadStarterMessage()

> **isThreadStarterMessage**(): `this is Message<ThreadStarterMessage>`

Defined in: [entities/message.ts:392](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L392)

#### Returns

`this is Message<ThreadStarterMessage>`

***

### isGuildInviteReminder()

> **isGuildInviteReminder**(): `this is Message<GuildInviteReminder>`

Defined in: [entities/message.ts:396](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L396)

#### Returns

`this is Message<GuildInviteReminder>`

***

### isContextMenuCommand()

> **isContextMenuCommand**(): `this is Message<ContextMenuCommand>`

Defined in: [entities/message.ts:400](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L400)

#### Returns

`this is Message<ContextMenuCommand>`

***

### isAutoModerationAction()

> **isAutoModerationAction**(): `this is Message<AutoModerationAction>`

Defined in: [entities/message.ts:404](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L404)

#### Returns

`this is Message<AutoModerationAction>`

***

### isRoleSubscriptionPurchase()

> **isRoleSubscriptionPurchase**(): `this is Message<RoleSubscriptionPurchase>`

Defined in: [entities/message.ts:408](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L408)

#### Returns

`this is Message<RoleSubscriptionPurchase>`

***

### isInteractionPremiumUpsell()

> **isInteractionPremiumUpsell**(): `this is Message<InteractionPremiumUpsell>`

Defined in: [entities/message.ts:412](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L412)

#### Returns

`this is Message<InteractionPremiumUpsell>`

***

### isStageStart()

> **isStageStart**(): `this is Message<StageStart>`

Defined in: [entities/message.ts:416](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L416)

#### Returns

`this is Message<StageStart>`

***

### isStageEnd()

> **isStageEnd**(): `this is Message<StageEnd>`

Defined in: [entities/message.ts:420](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L420)

#### Returns

`this is Message<StageEnd>`

***

### isStageSpeaker()

> **isStageSpeaker**(): `this is Message<StageSpeaker>`

Defined in: [entities/message.ts:424](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L424)

#### Returns

`this is Message<StageSpeaker>`

***

### isStageRaiseHand()

> **isStageRaiseHand**(): `this is Message<StageRaiseHand>`

Defined in: [entities/message.ts:428](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L428)

#### Returns

`this is Message<StageRaiseHand>`

***

### isStageTopic()

> **isStageTopic**(): `this is Message<StageTopic>`

Defined in: [entities/message.ts:432](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L432)

#### Returns

`this is Message<StageTopic>`

***

### isGuildApplicationPremiumSubscription()

> **isGuildApplicationPremiumSubscription**(): `this is Message<GuildApplicationPremiumSubscription>`

Defined in: [entities/message.ts:436](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L436)

#### Returns

`this is Message<GuildApplicationPremiumSubscription>`

***

### isGuildIncidentAlertModeEnabled()

> **isGuildIncidentAlertModeEnabled**(): `this is Message<GuildIncidentAlertModeEnabled>`

Defined in: [entities/message.ts:440](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L440)

#### Returns

`this is Message<GuildIncidentAlertModeEnabled>`

***

### isGuildIncidentAlertModeDisabled()

> **isGuildIncidentAlertModeDisabled**(): `this is Message<GuildIncidentAlertModeDisabled>`

Defined in: [entities/message.ts:444](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L444)

#### Returns

`this is Message<GuildIncidentAlertModeDisabled>`

***

### isGuildIncidentReportRaid()

> **isGuildIncidentReportRaid**(): `this is Message<GuildIncidentReportRaid>`

Defined in: [entities/message.ts:448](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L448)

#### Returns

`this is Message<GuildIncidentReportRaid>`

***

### isGuildIncidentReportFalseAlarm()

> **isGuildIncidentReportFalseAlarm**(): `this is Message<GuildIncidentReportFalseAlarm>`

Defined in: [entities/message.ts:452](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L452)

#### Returns

`this is Message<GuildIncidentReportFalseAlarm>`

***

### isPurchaseNotification()

> **isPurchaseNotification**(): `this is Message<PurchaseNotification>`

Defined in: [entities/message.ts:456](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L456)

#### Returns

`this is Message<PurchaseNotification>`

***

### isPollResult()

> **isPollResult**(): `this is Message<PollResult>`

Defined in: [entities/message.ts:460](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/message.ts#L460)

#### Returns

`this is Message<PollResult>`
