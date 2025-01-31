---
editUrl: false
next: false
prev: false
title: "Emoji"
---

Defined in: [entities/emoji.ts:19](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/emoji.ts#L19)

Represents an emoji within a Discord guild.

## Extends

- [`Entity`](/api/classes/classes/entity/)\<`APIEmoji`\>

## Constructors

### new Emoji()

> **new Emoji**(`rest`, `raw`, `guild_raw`): [`Emoji`](/api/classes/classes/emoji/)

Defined in: [entities/emoji.ts:30](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/emoji.ts#L30)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | The REST manager for making API requests. |
| `raw` | `APIEmoji` | The raw data from the API response. |
| `guild_raw` | `APIGuild` | The raw data of the guild to which the emoji belongs. |

#### Returns

[`Emoji`](/api/classes/classes/emoji/)

#### Overrides

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

> `readonly` **raw**: `APIEmoji`

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`Entity`](/api/classes/classes/entity/).[`raw`](/api/classes/classes/entity/#raw-1)

***

### guild

> `readonly` **guild**: [`Guild`](/api/classes/classes/guild/)

Defined in: [entities/emoji.ts:21](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/emoji.ts#L21)

The [Guild](../../../../../../../api/classes/classes/guild) instance in which the emoji belongs.

## Methods

### fetch()

> **fetch**(): `Promise`\<[`Emoji`](/api/classes/classes/emoji/)\>

Defined in: [entities/emoji.ts:41](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/emoji.ts#L41)

Fetches the latest data for the emoji from the Discord API.

#### Returns

`Promise`\<[`Emoji`](/api/classes/classes/emoji/)\>

A promise that resolves to an updated [Emoji](/api/classes/api/classes/classes/emoji/) instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### modify()

> **modify**(`data`): `Promise`\<[`Emoji`](/api/classes/classes/emoji/)\>

Defined in: [entities/emoji.ts:64](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/emoji.ts#L64)

Modifies the emoji's data in the Discord API.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `RESTPatchAPIGuildEmojiJSONBody` | The data to update for the emoji. |

#### Returns

`Promise`\<[`Emoji`](/api/classes/classes/emoji/)\>

A promise that resolves to an updated [Emoji](/api/classes/api/classes/classes/emoji/) instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### url()

> **url**(`settings`?): `null` \| `string`

Defined in: [entities/emoji.ts:89](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/emoji.ts#L89)

Retrieves the URL of the emoji.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `EmojiFormat`; `size`: [`Sizes`](/api/classes/type-aliases/sizes/); \} | Optional settings to specify the emoji format and size. |
| `settings.format`? | `EmojiFormat` | - |
| `settings.size`? | [`Sizes`](/api/classes/type-aliases/sizes/) | - |

#### Returns

`null` \| `string`

The URL of the emoji, or `null` if the emoji does not have an ID.

***

### buffer()

> **buffer**(): `Promise`\<`null` \| `ArrayBuffer`\>

Defined in: [entities/emoji.ts:103](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/emoji.ts#L103)

Converts the emoji image to an ArrayBuffer for further processing or usage.

#### Returns

`Promise`\<`null` \| `ArrayBuffer`\>

A promise that resolves to an `ArrayBuffer` representing the image data, or `null` if the emoji is not a guild emoji.

***

### mention()

> **mention**(): `string`

Defined in: [entities/emoji.ts:118](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/emoji.ts#L118)

Returns a string to mention the emoji in Discord.

#### Returns

`string`

A string representing the emoji mention.

***

### delete()

> **delete**(): `Promise`\<`boolean`\>

Defined in: [entities/emoji.ts:130](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/emoji.ts#L130)

Deletes the emoji from the Discord API.

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the emoji was successfully deleted, or `false` if it failed.

#### Throws

If the API request fails, an error is logged and re-thrown.
