---
editUrl: false
next: false
prev: false
title: "Guild"
---

Defined in: [entities/guild.ts:23](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L23)

Class that represents a base entity for API objects.

## Extends

- [`Entity`](/api-classes/classes/entity/)\<`APIGuild`\>

## Constructors

### new Guild()

> **new Guild**(`rest`, `raw`): [`Guild`](/api-classes/classes/guild/)

Defined in: [core/entity.ts:18](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | `APIGuild` | The raw data from the API response. |

#### Returns

[`Guild`](/api-classes/classes/guild/)

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

> `readonly` **raw**: `APIGuild`

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`raw`](/api-classes/classes/entity/#raw-1)

## Methods

### fetch()

> **fetch**(): `Promise`\<[`Guild`](/api-classes/classes/guild/)\>

Defined in: [entities/guild.ts:30](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L30)

Fetches the latest data for the guild from the Discord API.

#### Returns

`Promise`\<[`Guild`](/api-classes/classes/guild/)\>

A promise that resolves to an updated `Guild` instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### icon()

> **icon**(): [`GuildIcon`](/api-classes/classes/guildicon/)

Defined in: [entities/guild.ts:49](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L49)

Retrieves the guild's icon.

#### Returns

[`GuildIcon`](/api-classes/classes/guildicon/)

A `GuildIcon` instance representing the guild's icon.

***

### banner()

> **banner**(): [`GuildBanner`](/api-classes/classes/guildbanner/)

Defined in: [entities/guild.ts:61](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L61)

Retrieves the guild's banner.

#### Returns

[`GuildBanner`](/api-classes/classes/guildbanner/)

A `GuildBanner` instance representing the guild's banner.

***

### preview()

> **preview**(): `Promise`\<`APIGuildPreview`\>

Defined in: [entities/guild.ts:74](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L74)

Fetches the latest data for the guild preview from the Discord API.

#### Returns

`Promise`\<`APIGuildPreview`\>

A promise that resolves an updated [Guild Preview](https://discord.com/developers/docs/resources/guild#guild-preview-object) object from the `Guild`.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### modify()

> **modify**(`data`): `Promise`\<[`Guild`](/api-classes/classes/guild/)\>

Defined in: [entities/guild.ts:93](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L93)

Modifies a guild's data in the Discord API.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `Partial`\<`APIGuild`\> |

#### Returns

`Promise`\<[`Guild`](/api-classes/classes/guild/)\>

A promise that resolves to an updated `Guild` instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### channels()

> **channels**(): `Promise`\<`Dictionary`\<`string`[], [`Channel`](/api-classes/classes/channel/)\<`GuildText` \| `DM` \| `GuildVoice` \| `GroupDM` \| `GuildCategory` \| `GuildAnnouncement` \| `GuildStageVoice` \| `GuildForum` \| `GuildMedia` \| `ThreadChannelType`\>\>\>

Defined in: [entities/guild.ts:117](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L117)

Fetches the channel list of the guild from the Discord API.

This method doesn't include thread channels

#### Returns

`Promise`\<`Dictionary`\<`string`[], [`Channel`](/api-classes/classes/channel/)\<`GuildText` \| `DM` \| `GuildVoice` \| `GroupDM` \| `GuildCategory` \| `GuildAnnouncement` \| `GuildStageVoice` \| `GuildForum` \| `GuildMedia` \| `ThreadChannelType`\>\>\>

A promise resolving an `APIChannel` array in a `Channel` `Dictionary`.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### threads()

> **threads**(): `Promise`\<`Dictionary`\<`string`[], [`Channel`](/api-classes/classes/channel/)\<`ThreadChannelType`\>\>\>

Defined in: [entities/guild.ts:139](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L139)

Fetches the thread list of the guild from the Discord API.

#### Returns

`Promise`\<`Dictionary`\<`string`[], [`Channel`](/api-classes/classes/channel/)\<`ThreadChannelType`\>\>\>

A promise resolving an `APIThreadChannel` array in a `Channel` `Dictionary`.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### createChannel()

> **createChannel**(`data`): `Promise`\<[`Channel`](/api-classes/classes/channel/)\<`GuildText` \| `DM` \| `GuildVoice` \| `GroupDM` \| `GuildCategory` \| `GuildAnnouncement` \| `GuildStageVoice` \| `GuildForum` \| `GuildMedia` \| `ThreadChannelType`\>\>

Defined in: [entities/guild.ts:161](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L161)

Create a channel in the guild

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `RESTPostAPIGuildChannelJSONBody` |

#### Returns

`Promise`\<[`Channel`](/api-classes/classes/channel/)\<`GuildText` \| `DM` \| `GuildVoice` \| `GroupDM` \| `GuildCategory` \| `GuildAnnouncement` \| `GuildStageVoice` \| `GuildForum` \| `GuildMedia` \| `ThreadChannelType`\>\>

A promise that resolves the `Channel` instance of the created channel.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### members()

> **members**(): `Promise`\<`Dictionary`\<`string`[], [`Member`](/api-classes/classes/member/)\>\>

Defined in: [entities/guild.ts:183](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L183)

Fetches the member list of the guild from the Discord API.

#### Returns

`Promise`\<`Dictionary`\<`string`[], [`Member`](/api-classes/classes/member/)\>\>

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### kick()

> **kick**(`id`): `Promise`\<`boolean`\>

Defined in: [entities/guild.ts:203](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L203)

Removes a member from a guild in the Discord API.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`Promise`\<`boolean`\>

A promise of a Boolean that represents that it was a success.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### ban()

> **ban**(`id`, `seconds`?): `Promise`\<`boolean`\>

Defined in: [entities/guild.ts:225](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L225)

Bans a member from a guild in the Discord API.

A number is given which represents the seconds to delete messages between 0 and 604800 (7 days)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |
| `seconds`? | `number` |

#### Returns

`Promise`\<`boolean`\>

A promise of a Boolean that represents that it was a success.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### bulkBan()

> **bulkBan**(`ids`, `seconds`?): `Promise`\<`boolean`\>

Defined in: [entities/guild.ts:252](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L252)

Do a bulk ban of members in a guild in the Discord API.

A number is given which represents the seconds to delete messages between 0 and 604800 (7 days)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ids` | `string`[] | Fix Snowflakes of users to be banned. Maximum should be 200 |
| `seconds`? | `number` | - |

#### Returns

`Promise`\<`boolean`\>

A promise of a Boolean that represents that it was a success.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### unban()

> **unban**(`id`): `Promise`\<`boolean`\>

Defined in: [entities/guild.ts:277](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L277)

Unbans a member from a guild in the Discord API.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`Promise`\<`boolean`\>

A promise of a Boolean that represents that it was a success.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### bans()

> **bans**(`limit`?, `before`?, `after`?): `Promise`\<`APIBan`[]\>

Defined in: [entities/guild.ts:299](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L299)

Get all bans on a guild in the Discord API.

Provide a user id to `before` and `after` for pagination. Users will always be returned in ascending order by `user.id`. If both `before` and `after` are provided, only `before` is respected.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `limit`? | `number` |
| `before`? | `null` \| `string` |
| `after`? | `null` \| `string` |

#### Returns

`Promise`\<`APIBan`[]\>

A promise of a Array of [APIBan](https://discord.com/developers/docs/resources/guild#ban-object) that represents all of users banned.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### getBan()

> **getBan**(`id`): `Promise`\<`APIBan`\>

Defined in: [entities/guild.ts:328](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L328)

Get an especific ban data on a guild in the Discord API.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `id` | `string` |

#### Returns

`Promise`\<`APIBan`\>

A promise of [APIBan](https://discord.com/developers/docs/resources/guild#ban-object) that represents user ban data.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### roles()

> **roles**(): `Dictionary`\<`string`, [`Role`](/api-classes/classes/role/)\>

Defined in: [entities/guild.ts:346](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/guild.ts#L346)

Obtains a dictionary of roles in the Guild

#### Returns

`Dictionary`\<`string`, [`Role`](/api-classes/classes/role/)\>

A dictionary with all the roles on the server
