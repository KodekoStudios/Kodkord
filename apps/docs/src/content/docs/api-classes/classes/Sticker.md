---
editUrl: false
next: false
prev: false
title: "Sticker"
---

Defined in: [entities/sticker.ts:16](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/sticker.ts#L16)

It represents a sticker within a Discord guild.

## Extends

- [`Entity`](/api-classes/classes/entity/)\<`APISticker`\>

## Constructors

### new Sticker()

> **new Sticker**(`rest`, `raw`): [`Sticker`](/api-classes/classes/sticker/)

Defined in: [core/entity.ts:18](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | `APISticker` | The raw data from the API response. |

#### Returns

[`Sticker`](/api-classes/classes/sticker/)

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

> `readonly` **raw**: `APISticker`

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`raw`](/api-classes/classes/entity/#raw-1)

## Methods

### fetch()

> **fetch**(): `Promise`\<[`Sticker`](/api-classes/classes/sticker/)\>

Defined in: [entities/sticker.ts:23](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/sticker.ts#L23)

Fetches the latest data for the emoji from the Discord API.

#### Returns

`Promise`\<[`Sticker`](/api-classes/classes/sticker/)\>

A promise that resolves to an updated `Emoji` instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### url()

> **url**(`settings`?): `string`

Defined in: [entities/sticker.ts:43](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/sticker.ts#L43)

Retrieves the URL of the sticker.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `StickerFormat`; `size`: [`Sizes`](/api-classes/type-aliases/sizes/); \} | Optional settings to specify the sticker format and size. |
| `settings.format`? | `StickerFormat` | - |
| `settings.size`? | [`Sizes`](/api-classes/type-aliases/sizes/) | - |

#### Returns

`string`

The URL of the sticker.

***

### buffer()

> **buffer**(): `Promise`\<`ArrayBuffer`\>

Defined in: [entities/sticker.ts:55](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/sticker.ts#L55)

Converts the image to an ArrayBuffer for further processing or usage.

#### Returns

`Promise`\<`ArrayBuffer`\>

A promise that resolves an ArrayBuffer representing the image data.

***

### modify()

> **modify**(`data`): `Promise`\<[`Sticker`](/api-classes/classes/sticker/)\>

Defined in: [entities/sticker.ts:67](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/sticker.ts#L67)

Modifies a emoji's data in the Discord API.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `RESTPatchAPIGuildStickerJSONBody` |

#### Returns

`Promise`\<[`Sticker`](/api-classes/classes/sticker/)\>

A promise that resolves to an updated `Emoji` instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### delete()

> **delete**(): `Promise`\<`boolean`\>

Defined in: [entities/sticker.ts:91](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/sticker.ts#L91)

Deletes the sticker in the Discord API.

#### Returns

`Promise`\<`boolean`\>

A promise of a Boolean that represents that it was a success.
