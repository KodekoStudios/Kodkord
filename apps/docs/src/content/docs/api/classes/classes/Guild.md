---
editUrl: false
next: false
prev: false
title: "Guild"
---

Defined in: [entities/guild.ts:24](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L24)

Represents a Discord guild (server).

## Extends

- [`Entity`](/api/classes/classes/entity/)\<`APIGuild`\>

## Constructors

### new Guild()

> **new Guild**(`rest`, `raw`): [`Guild`](/api/classes/classes/guild/)

Defined in: [core/entity.ts:18](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | `APIGuild` | The raw data from the API response. |

#### Returns

[`Guild`](/api/classes/classes/guild/)

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

> `readonly` **raw**: `APIGuild`

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`Entity`](/api/classes/classes/entity/).[`raw`](/api/classes/classes/entity/#raw-1)

## Methods

### fetch()

> **fetch**(): `Promise`\<[`Guild`](/api/classes/classes/guild/)\>

Defined in: [entities/guild.ts:32](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L32)

Fetches the latest data for the guild from the Discord API.

#### Returns

`Promise`\<[`Guild`](/api/classes/classes/guild/)\>

A promise that resolves to an updated [Guild](/api/classes/api/classes/classes/guild/) instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### modify()

> **modify**(`data`): `Promise`\<[`Guild`](/api/classes/classes/guild/)\>

Defined in: [entities/guild.ts:53](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L53)

Modifies a guild's data in the Discord API.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `Partial`\<`APIGuild`\> | The data to update for the guild. |

#### Returns

`Promise`\<[`Guild`](/api/classes/classes/guild/)\>

A promise that resolves to an updated [Guild](/api/classes/api/classes/classes/guild/) instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### icon()

> **icon**(): [`GuildIcon`](/api/classes/classes/guildicon/)

Defined in: [entities/guild.ts:74](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L74)

Retrieves the guild's icon.

#### Returns

[`GuildIcon`](/api/classes/classes/guildicon/)

A [GuildIcon](/api/classes/api/classes/classes/guildicon/) instance representing the guild's icon.

***

### banner()

> **banner**(): [`GuildBanner`](/api/classes/classes/guildbanner/)

Defined in: [entities/guild.ts:86](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L86)

Retrieves the guild's banner.

#### Returns

[`GuildBanner`](/api/classes/classes/guildbanner/)

A [GuildBanner](/api/classes/api/classes/classes/guildbanner/) instance representing the guild's banner.

***

### preview()

> **preview**(): `Promise`\<`APIGuildPreview`\>

Defined in: [entities/guild.ts:99](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L99)

Fetches the latest data for the guild preview from the Discord API.

#### Returns

`Promise`\<`APIGuildPreview`\>

A promise that resolves to an updated APIGuildPreview object.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### channels()

> **channels**(): `Promise`\<`Dictionary`\<`string`[], [`Channel`](/api/classes/classes/channel/)\<`ChannelType`\>\>\>

Defined in: [entities/guild.ts:120](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L120)

Fetches the channel list of the guild from the Discord API.

This method doesn't include thread channels.

#### Returns

`Promise`\<`Dictionary`\<`string`[], [`Channel`](/api/classes/classes/channel/)\<`ChannelType`\>\>\>

A promise resolving to a Dictionary of [Channel](/api/classes/api/classes/classes/channel/) instances.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### threads()

> **threads**(): `Promise`\<`Dictionary`\<`string`[], [`Channel`](/api/classes/classes/channel/)\<`ChannelType`\>\>\>

Defined in: [entities/guild.ts:142](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L142)

Fetches the thread list of the guild from the Discord API.

#### Returns

`Promise`\<`Dictionary`\<`string`[], [`Channel`](/api/classes/classes/channel/)\<`ChannelType`\>\>\>

A promise resolving to a Dictionary of [Channel](/api/classes/api/classes/classes/channel/) instances representing threads.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### createChannel()

> **createChannel**(`data`): `Promise`\<[`Channel`](/api/classes/classes/channel/)\<`ChannelType`\>\>

Defined in: [entities/guild.ts:165](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L165)

Creates a channel in the guild.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `RESTPostAPIGuildChannelJSONBody` | The data for the new channel. |

#### Returns

`Promise`\<[`Channel`](/api/classes/classes/channel/)\<`ChannelType`\>\>

A promise resolving to the [Channel](/api/classes/api/classes/classes/channel/) instance of the created channel.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### members()

> **members**(): `Promise`\<`Dictionary`\<`string`[], [`Member`](/api/classes/classes/member/)\>\>

Defined in: [entities/guild.ts:187](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L187)

Fetches the member list of the guild from the Discord API.

#### Returns

`Promise`\<`Dictionary`\<`string`[], [`Member`](/api/classes/classes/member/)\>\>

A promise resolving to a Dictionary of [Member](/api/classes/api/classes/classes/member/) instances.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### kick()

> **kick**(`id`): `Promise`\<`boolean`\>

Defined in: [entities/guild.ts:208](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L208)

Removes a member from the guild.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | The ID of the member to kick. |

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the member was successfully kicked, or `false` if it failed.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### ban()

> **ban**(`id`, `seconds`?): `Promise`\<`boolean`\>

Defined in: [entities/guild.ts:230](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L230)

Bans a member from the guild.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | The ID of the member to ban. |
| `seconds`? | `number` | The number of seconds to delete messages for (between 0 and 604800). |

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the member was successfully banned, or `false` if it failed.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### bulkBan()

> **bulkBan**(`ids`, `seconds`?): `Promise`\<`boolean`\>

Defined in: [entities/guild.ts:256](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L256)

Performs a bulk ban of members in the guild.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `ids` | `string`[] | An array of user IDs to ban (maximum of 200). |
| `seconds`? | `number` | The number of seconds to delete messages for (between 0 and 604800). |

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the bulk ban was successful, or `false` if it failed.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### unban()

> **unban**(`id`): `Promise`\<`boolean`\>

Defined in: [entities/guild.ts:282](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L282)

Unbans a member from the guild.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | The ID of the member to unban. |

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the member was successfully unbanned, or `false` if it failed.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### bans()

> **bans**(`limit`?, `before`?, `after`?): `Promise`\<`APIBan`[]\>

Defined in: [entities/guild.ts:305](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L305)

Fetches the list of bans in the guild.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `limit`? | `number` | The maximum number of bans to return. |
| `before`? | `null` \| `string` | The ID of the user to get bans before. |
| `after`? | `null` \| `string` | The ID of the user to get bans after. |

#### Returns

`Promise`\<`APIBan`[]\>

A promise resolving to an array of APIBan objects.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### getBan()

> **getBan**(`id`): `Promise`\<`APIBan`\>

Defined in: [entities/guild.ts:335](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L335)

Fetches the ban data for a specific user in the guild.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `string` | The ID of the user to fetch ban data for. |

#### Returns

`Promise`\<`APIBan`\>

A promise resolving to an APIBan object.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### roles()

> **roles**(): `Dictionary`\<`string`, [`Role`](/api/classes/classes/role/)\>

Defined in: [entities/guild.ts:353](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/guild.ts#L353)

Retrieves a dictionary of roles in the guild.

#### Returns

`Dictionary`\<`string`, [`Role`](/api/classes/classes/role/)\>

A Dictionary of [Role](/api/classes/api/classes/classes/role/) instances.
