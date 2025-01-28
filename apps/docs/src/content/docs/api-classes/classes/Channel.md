---
editUrl: false
next: false
prev: false
title: "Channel"
---

Defined in: [entities/channel.ts:20](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L20)

Represents a Discord channel.

## Extends

- [`Entity`](/api-classes/classes/entity/)\<`object` & `APIChannel`\>

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `Type` *extends* `ChannelType` | The specific type of the channel. |

## Constructors

### new Channel()

> **new Channel**\<`Type`\>(`rest`, `raw`): [`Channel`](/api-classes/classes/channel/)\<`Type`\>

Defined in: [core/entity.ts:18](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | `object` & `APIChannel` | The raw data from the API response. |

#### Returns

[`Channel`](/api-classes/classes/channel/)\<`Type`\>

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`constructor`](/api-classes/classes/entity/#constructors)

## Properties

### rest

> `readonly` **rest**: `Rest`

Defined in: [core/entity.ts:8](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/core/entity.ts#L8)

The `Rest` instance for interacting with the Discord API.

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`rest`](/api-classes/classes/entity/#rest-1)

***

### raw

> `readonly` **raw**: `object` & `APIChannel`

Defined in: [core/entity.ts:11](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Type declaration

##### type

> **type**: `Type`

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`raw`](/api-classes/classes/entity/#raw-1)

## Methods

### fetchMessage()

> **fetchMessage**(`id`): `Promise`\<`undefined` \| [`Message`](/api-classes/classes/message/)\<`MessageType`\>\>

Defined in: [entities/channel.ts:21](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L21)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`Promise`\<`undefined` \| [`Message`](/api-classes/classes/message/)\<`MessageType`\>\>

***

### postMessage()

> **postMessage**(`body`): `Promise`\<`undefined` \| [`Message`](/api-classes/classes/message/)\<`MessageType`\>\>

Defined in: [entities/channel.ts:36](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L36)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `body` | `RESTPostAPIChannelMessageJSONBody` |

#### Returns

`Promise`\<`undefined` \| [`Message`](/api-classes/classes/message/)\<`MessageType`\>\>

***

### fetch()

> **fetch**(): `Promise`\<`undefined` \| [`Channel`](/api-classes/classes/channel/)\<`Type`\>\>

Defined in: [entities/channel.ts:55](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L55)

#### Returns

`Promise`\<`undefined` \| [`Channel`](/api-classes/classes/channel/)\<`Type`\>\>

***

### modify()

> **modify**(`body`, `reason`?): `Promise`\<`boolean`\>

Defined in: [entities/channel.ts:68](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L68)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `body` | `RESTPatchAPIChannelJSONBody` |
| `reason`? | `string` |

#### Returns

`Promise`\<`boolean`\>

***

### delete()

> **delete**(): `Promise`\<`boolean`\>

Defined in: [entities/channel.ts:85](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L85)

#### Returns

`Promise`\<`boolean`\>

***

### mention()

> **mention**(): `string`

Defined in: [entities/channel.ts:104](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L104)

Returns a string to mention the channel in Discord.

#### Returns

`string`

A string representing the channel mention.

***

### isGuildText()

> **isGuildText**(): `this is Channel<GuildText>`

Defined in: [entities/channel.ts:111](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L111)

Determines if this channel is a guild text channel.

#### Returns

`this is Channel<GuildText>`

***

### isDM()

> **isDM**(): `this is Channel<DM>`

Defined in: [entities/channel.ts:116](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L116)

Determines if this channel is a direct message channel.

#### Returns

`this is Channel<DM>`

***

### isGuildVoice()

> **isGuildVoice**(): `this is Channel<GuildVoice>`

Defined in: [entities/channel.ts:121](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L121)

Determines if this channel is a guild voice channel.

#### Returns

`this is Channel<GuildVoice>`

***

### isGroupDM()

> **isGroupDM**(): `this is Channel<GroupDM>`

Defined in: [entities/channel.ts:126](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L126)

Determines if this channel is a group DM channel.

#### Returns

`this is Channel<GroupDM>`

***

### isGuildCategory()

> **isGuildCategory**(): `this is Channel<GuildCategory>`

Defined in: [entities/channel.ts:131](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L131)

Determines if this channel is a guild category.

#### Returns

`this is Channel<GuildCategory>`

***

### isGuildAnnouncement()

> **isGuildAnnouncement**(): `this is Channel<GuildAnnouncement>`

Defined in: [entities/channel.ts:136](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L136)

Determines if this channel is a guild announcement channel.

#### Returns

`this is Channel<GuildAnnouncement>`

***

### isAnnouncementThread()

> **isAnnouncementThread**(): `this is Channel<AnnouncementThread>`

Defined in: [entities/channel.ts:141](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L141)

Determines if this channel is an announcement thread.

#### Returns

`this is Channel<AnnouncementThread>`

***

### isPublicThread()

> **isPublicThread**(): `this is Channel<PublicThread>`

Defined in: [entities/channel.ts:146](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L146)

Determines if this channel is a public thread.

#### Returns

`this is Channel<PublicThread>`

***

### isPrivateThread()

> **isPrivateThread**(): `this is Channel<PrivateThread>`

Defined in: [entities/channel.ts:151](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L151)

Determines if this channel is a private thread.

#### Returns

`this is Channel<PrivateThread>`

***

### isGuildStageVoice()

> **isGuildStageVoice**(): `this is Channel<GuildStageVoice>`

Defined in: [entities/channel.ts:156](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L156)

Determines if this channel is a guild stage voice channel.

#### Returns

`this is Channel<GuildStageVoice>`

***

### isGuildForum()

> **isGuildForum**(): `this is Channel<GuildForum>`

Defined in: [entities/channel.ts:161](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L161)

Determines if this channel is a guild forum channel.

#### Returns

`this is Channel<GuildForum>`

***

### isGuildMedia()

> **isGuildMedia**(): `this is Channel<GuildMedia>`

Defined in: [entities/channel.ts:166](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/channel.ts#L166)

Determines if this channel is a guild media channel.

#### Returns

`this is Channel<GuildMedia>`
