---
editUrl: false
next: false
prev: false
title: "Channel"
---

Defined in: [entities/channel.ts:21](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L21)

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

Defined in: [core/entity.ts:18](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/core/entity.ts#L18)

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

Defined in: [core/entity.ts:8](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/core/entity.ts#L8)

The `Rest` instance for interacting with the Discord API.

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`rest`](/api-classes/classes/entity/#rest-1)

***

### raw

> `readonly` **raw**: `object` & `APIChannel`

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Type declaration

##### type

> **type**: `Type`

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`raw`](/api-classes/classes/entity/#raw-1)

## Methods

### fetchMessage()

> **fetchMessage**(`id`): `Promise`\<`undefined` \| [`Message`](/api-classes/classes/message/)\<`MessageType`\>\>

Defined in: [entities/channel.ts:23](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L23)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`Promise`\<`undefined` \| [`Message`](/api-classes/classes/message/)\<`MessageType`\>\>

***

### postMessage()

> **postMessage**(`body`): `Promise`\<`undefined` \| [`Message`](/api-classes/classes/message/)\<`MessageType`\>\>

Defined in: [entities/channel.ts:38](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L38)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `body` | `RESTPostAPIChannelMessageJSONBody` |

#### Returns

`Promise`\<`undefined` \| [`Message`](/api-classes/classes/message/)\<`MessageType`\>\>

***

### destroy()

> **destroy**(): `Promise`\<`boolean`\>

Defined in: [entities/channel.ts:57](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L57)

#### Returns

`Promise`\<`boolean`\>

***

### fetch()

> **fetch**(): `Promise`\<`undefined` \| [`Channel`](/api-classes/classes/channel/)\<`Type`\>\>

Defined in: [entities/channel.ts:72](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L72)

#### Returns

`Promise`\<`undefined` \| [`Channel`](/api-classes/classes/channel/)\<`Type`\>\>

***

### modify()

> **modify**(`body`, `reason`?): `Promise`\<`boolean`\>

Defined in: [entities/channel.ts:85](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L85)

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

Defined in: [entities/channel.ts:102](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L102)

#### Returns

`Promise`\<`boolean`\>

***

### mention()

> **mention**(): `string`

Defined in: [entities/channel.ts:121](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L121)

Returns a string to mention the channel in Discord.

#### Returns

`string`

A string representing the channel mention.

***

### isGuildText()

> **isGuildText**(): `this is Channel<GuildText>`

Defined in: [entities/channel.ts:128](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L128)

Determines if this channel is a guild text channel.

#### Returns

`this is Channel<GuildText>`

***

### isDM()

> **isDM**(): `this is Channel<DM>`

Defined in: [entities/channel.ts:133](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L133)

Determines if this channel is a direct message channel.

#### Returns

`this is Channel<DM>`

***

### isGuildVoice()

> **isGuildVoice**(): `this is Channel<GuildVoice>`

Defined in: [entities/channel.ts:138](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L138)

Determines if this channel is a guild voice channel.

#### Returns

`this is Channel<GuildVoice>`

***

### isGroupDM()

> **isGroupDM**(): `this is Channel<GroupDM>`

Defined in: [entities/channel.ts:143](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L143)

Determines if this channel is a group DM channel.

#### Returns

`this is Channel<GroupDM>`

***

### isGuildCategory()

> **isGuildCategory**(): `this is Channel<GuildCategory>`

Defined in: [entities/channel.ts:148](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L148)

Determines if this channel is a guild category.

#### Returns

`this is Channel<GuildCategory>`

***

### isGuildAnnouncement()

> **isGuildAnnouncement**(): `this is Channel<GuildAnnouncement>`

Defined in: [entities/channel.ts:153](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L153)

Determines if this channel is a guild announcement channel.

#### Returns

`this is Channel<GuildAnnouncement>`

***

### isAnnouncementThread()

> **isAnnouncementThread**(): `this is Channel<AnnouncementThread>`

Defined in: [entities/channel.ts:158](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L158)

Determines if this channel is an announcement thread.

#### Returns

`this is Channel<AnnouncementThread>`

***

### isPublicThread()

> **isPublicThread**(): `this is Channel<PublicThread>`

Defined in: [entities/channel.ts:163](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L163)

Determines if this channel is a public thread.

#### Returns

`this is Channel<PublicThread>`

***

### isPrivateThread()

> **isPrivateThread**(): `this is Channel<PrivateThread>`

Defined in: [entities/channel.ts:168](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L168)

Determines if this channel is a private thread.

#### Returns

`this is Channel<PrivateThread>`

***

### isGuildStageVoice()

> **isGuildStageVoice**(): `this is Channel<GuildStageVoice>`

Defined in: [entities/channel.ts:173](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L173)

Determines if this channel is a guild stage voice channel.

#### Returns

`this is Channel<GuildStageVoice>`

***

### isGuildForum()

> **isGuildForum**(): `this is Channel<GuildForum>`

Defined in: [entities/channel.ts:178](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L178)

Determines if this channel is a guild forum channel.

#### Returns

`this is Channel<GuildForum>`

***

### isGuildMedia()

> **isGuildMedia**(): `this is Channel<GuildMedia>`

Defined in: [entities/channel.ts:183](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L183)

Determines if this channel is a guild media channel.

#### Returns

`this is Channel<GuildMedia>`

***

### bulkDelete()

> **bulkDelete**(`ids`): `Promise`\<`boolean`\>

Defined in: [entities/channel.ts:187](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/channel.ts#L187)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `ids` | `string`[] |

#### Returns

`Promise`\<`boolean`\>
