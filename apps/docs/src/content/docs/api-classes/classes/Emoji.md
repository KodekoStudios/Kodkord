---
editUrl: false
next: false
prev: false
title: "Emoji"
---

Defined in: [entities/emoji.ts:26](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/emoji.ts#L26)

It represents an emoji within a Discord guild.

## Extends

- [`Entity`](/api-classes/classes/entity/)\<`APIEmoji`\>

## Constructors

### new Emoji()

> **new Emoji**(`rest`, `raw`, `guild_raw`): [`Emoji`](/api-classes/classes/emoji/)

Defined in: [entities/emoji.ts:36](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/emoji.ts#L36)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | `APIEmoji` | The raw data from the API response. |
| `guild_raw` | `APIGuild` | - |

#### Returns

[`Emoji`](/api-classes/classes/emoji/)

#### Overrides

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

> `readonly` **raw**: `APIEmoji`

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`raw`](/api-classes/classes/entity/#raw-1)

***

### guild

> `readonly` **guild**: [`Guild`](/api-classes/classes/guild/)

Defined in: [entities/emoji.ts:28](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/emoji.ts#L28)

The `Guild` instance in which Emoji belongs.

## Methods

### fetch()

> **fetch**(): `Promise`\<[`Emoji`](/api-classes/classes/emoji/)\>

Defined in: [entities/emoji.ts:47](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/emoji.ts#L47)

Fetches the latest data for the emoji from the Discord API.

#### Returns

`Promise`\<[`Emoji`](/api-classes/classes/emoji/)\>

A promise that resolves to an updated `Emoji` instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### url()

> **url**(`settings`?): `null` \| `string`

Defined in: [entities/emoji.ts:69](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/emoji.ts#L69)

Retrieves the URL of the emoji.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `EmojiFormat`; `size`: [`Sizes`](/api-classes/type-aliases/sizes/); \} | Optional settings to specify the emoji format and size. |
| `settings.format`? | `EmojiFormat` | - |
| `settings.size`? | [`Sizes`](/api-classes/type-aliases/sizes/) | - |

#### Returns

`null` \| `string`

The URL of the emoji or `null` if the emoji does not have an id.

***

### buffer()

> **buffer**(): `Promise`\<`null` \| `ArrayBuffer`\>

Defined in: [entities/emoji.ts:83](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/emoji.ts#L83)

Converts the image to an ArrayBuffer for further processing or usage.

#### Returns

`Promise`\<`null` \| `ArrayBuffer`\>

A promise that resolves an ArrayBuffer representing the image data or `null` if it is not a guild emoji.

***

### mention()

> **mention**(): `string`

Defined in: [entities/emoji.ts:98](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/emoji.ts#L98)

Returns a string to mention the emoji in Discord.

#### Returns

`string`

A string representing the emoji mention.

***

### modify()

> **modify**(`data`): `Promise`\<[`Emoji`](/api-classes/classes/emoji/)\>

Defined in: [entities/emoji.ts:110](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/emoji.ts#L110)

Modifies a emoji's data in the Discord API.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `RESTPatchAPIGuildEmojiJSONBody` |

#### Returns

`Promise`\<[`Emoji`](/api-classes/classes/emoji/)\>

A promise that resolves to an updated `Emoji` instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### delete()

> **delete**(): `Promise`\<`boolean`\>

Defined in: [entities/emoji.ts:135](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/emoji.ts#L135)

Deletes the emoji in the Discord API.

#### Returns

`Promise`\<`boolean`\>

A promise of a Boolean that represents that it was a success..

#### Throws

If the API request fails, an error is logged and re-thrown.
