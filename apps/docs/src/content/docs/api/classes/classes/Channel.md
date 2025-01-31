---
editUrl: false
next: false
prev: false
title: "Channel"
---

Defined in: [entities/channel.ts:21](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L21)

Represents a Discord channel.

## Extends

- [`Entity`](/api/classes/classes/entity/)\<`object` & `APIChannel`\>

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `Type` *extends* `ChannelType` | The specific type of the channel. |

## Constructors

### new Channel()

> **new Channel**\<`Type`\>(`rest`, `raw`): [`Channel`](/api/classes/classes/channel/)\<`Type`\>

Defined in: [core/entity.ts:18](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | `object` & `APIChannel` | The raw data from the API response. |

#### Returns

[`Channel`](/api/classes/classes/channel/)\<`Type`\>

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

> `readonly` **raw**: `object` & `APIChannel`

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Type declaration

##### type

> **type**: `Type`

#### Inherited from

[`Entity`](/api/classes/classes/entity/).[`raw`](/api/classes/classes/entity/#raw-1)

## Methods

### fetchMessage()

> **fetchMessage**(`id`): `Promise`\<`undefined` \| [`Message`](/api/classes/classes/message/)\<`MessageType`\>\>

Defined in: [entities/channel.ts:29](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L29)

Fetches a specific message from the channel.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | The ID of the message to fetch. |

#### Returns

`Promise`\<`undefined` \| [`Message`](/api/classes/classes/message/)\<`MessageType`\>\>

A promise resolving to a [Message](/api/classes/api/classes/classes/message/) instance, or `undefined` if the operation fails.

***

### postMessage()

> **postMessage**(`body`): `Promise`\<`undefined` \| [`Message`](/api/classes/classes/message/)\<`MessageType`\>\>

Defined in: [entities/channel.ts:50](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L50)

Posts a message in the channel.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `body` | `RESTPostAPIChannelMessageJSONBody` | The message payload to send. |

#### Returns

`Promise`\<`undefined` \| [`Message`](/api/classes/classes/message/)\<`MessageType`\>\>

A promise resolving to a [Message](/api/classes/api/classes/classes/message/) instance, or `undefined` if the operation fails.

***

### fetch()

> **fetch**(): `Promise`\<`undefined` \| [`Channel`](/api/classes/classes/channel/)\<`Type`\>\>

Defined in: [entities/channel.ts:74](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L74)

Fetches the latest data for the channel from the Discord API.

#### Returns

`Promise`\<`undefined` \| [`Channel`](/api/classes/classes/channel/)\<`Type`\>\>

A promise resolving to an updated [Channel](/api/classes/api/classes/classes/channel/) instance, or `undefined` if the operation fails.

***

### modify()

> **modify**(`body`, `reason`?): `Promise`\<`boolean`\>

Defined in: [entities/channel.ts:94](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L94)

Modifies the channel's data in the Discord API.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `body` | `RESTPatchAPIChannelJSONBody` | The data to update for the channel. |
| `reason`? | `string` | The reason for modifying the channel (optional). |

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the channel was successfully modified, or `false` if it failed.

***

### delete()

> **delete**(): `Promise`\<`boolean`\>

Defined in: [entities/channel.ts:116](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L116)

Deletes the channel.

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the channel was successfully deleted, or `false` if it failed.

***

### mention()

> **mention**(): `string`

Defined in: [entities/channel.ts:135](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L135)

Returns a string to mention the channel in Discord.

#### Returns

`string`

A string representing the channel mention.

***

### bulkDelete()

> **bulkDelete**(`ids`): `Promise`\<`boolean`\>

Defined in: [entities/channel.ts:146](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L146)

Deletes multiple messages in bulk from the channel.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ids` | `string`[] | An array of message IDs to delete. |

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the messages were successfully deleted, or `false` if it failed.

***

### isGuildText()

> **isGuildText**(): `this is Channel<GuildText>`

Defined in: [entities/channel.ts:165](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L165)

Determines if this channel is a guild text channel.

#### Returns

`this is Channel<GuildText>`

***

### isDM()

> **isDM**(): `this is Channel<DM>`

Defined in: [entities/channel.ts:170](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L170)

Determines if this channel is a direct message channel.

#### Returns

`this is Channel<DM>`

***

### isGuildVoice()

> **isGuildVoice**(): `this is Channel<GuildVoice>`

Defined in: [entities/channel.ts:175](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L175)

Determines if this channel is a guild voice channel.

#### Returns

`this is Channel<GuildVoice>`

***

### isGroupDM()

> **isGroupDM**(): `this is Channel<GroupDM>`

Defined in: [entities/channel.ts:180](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L180)

Determines if this channel is a group DM channel.

#### Returns

`this is Channel<GroupDM>`

***

### isGuildCategory()

> **isGuildCategory**(): `this is Channel<GuildCategory>`

Defined in: [entities/channel.ts:185](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L185)

Determines if this channel is a guild category.

#### Returns

`this is Channel<GuildCategory>`

***

### isGuildAnnouncement()

> **isGuildAnnouncement**(): `this is Channel<GuildAnnouncement>`

Defined in: [entities/channel.ts:190](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L190)

Determines if this channel is a guild announcement channel.

#### Returns

`this is Channel<GuildAnnouncement>`

***

### isAnnouncementThread()

> **isAnnouncementThread**(): `this is Channel<AnnouncementThread>`

Defined in: [entities/channel.ts:195](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L195)

Determines if this channel is an announcement thread.

#### Returns

`this is Channel<AnnouncementThread>`

***

### isPublicThread()

> **isPublicThread**(): `this is Channel<PublicThread>`

Defined in: [entities/channel.ts:200](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L200)

Determines if this channel is a public thread.

#### Returns

`this is Channel<PublicThread>`

***

### isPrivateThread()

> **isPrivateThread**(): `this is Channel<PrivateThread>`

Defined in: [entities/channel.ts:205](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L205)

Determines if this channel is a private thread.

#### Returns

`this is Channel<PrivateThread>`

***

### isGuildStageVoice()

> **isGuildStageVoice**(): `this is Channel<GuildStageVoice>`

Defined in: [entities/channel.ts:210](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L210)

Determines if this channel is a guild stage voice channel.

#### Returns

`this is Channel<GuildStageVoice>`

***

### isGuildForum()

> **isGuildForum**(): `this is Channel<GuildForum>`

Defined in: [entities/channel.ts:215](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L215)

Determines if this channel is a guild forum channel.

#### Returns

`this is Channel<GuildForum>`

***

### isGuildMedia()

> **isGuildMedia**(): `this is Channel<GuildMedia>`

Defined in: [entities/channel.ts:220](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/channel.ts#L220)

Determines if this channel is a guild media channel.

#### Returns

`this is Channel<GuildMedia>`
