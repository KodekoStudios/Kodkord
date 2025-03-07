---
editUrl: false
next: false
prev: false
title: "Sticker"
---

Defined in: [entities/sticker.ts:16](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/sticker.ts#L16)

Represents a sticker within a Discord guild.

## Extends

- [`Entity`](/api/classes/classes/entity/)\<`APISticker`\>

## Constructors

### new Sticker()

> **new Sticker**(`rest`, `raw`): [`Sticker`](/api/classes/classes/sticker/)

Defined in: [core/entity.ts:18](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | `APISticker` | The raw data from the API response. |

#### Returns

[`Sticker`](/api/classes/classes/sticker/)

#### Inherited from

[`Entity`](/api/classes/classes/entity/).[`constructor`](/api/classes/classes/entity/#constructors)

## Properties

### rest

> `readonly` **rest**: `Rest`

Defined in: [core/entity.ts:8](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/core/entity.ts#L8)

The `Rest` instance for interacting with the Discord API.

#### Inherited from

[`Entity`](/api/classes/classes/entity/).[`rest`](/api/classes/classes/entity/#rest-1)

***

### raw

> `readonly` **raw**: `APISticker`

Defined in: [core/entity.ts:11](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`Entity`](/api/classes/classes/entity/).[`raw`](/api/classes/classes/entity/#raw-1)

## Methods

### fetch()

> **fetch**(): `Promise`\<[`Sticker`](/api/classes/classes/sticker/)\>

Defined in: [entities/sticker.ts:24](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/sticker.ts#L24)

Fetches the latest data for the sticker from the Discord API.

#### Returns

`Promise`\<[`Sticker`](/api/classes/classes/sticker/)\>

A promise that resolves to an updated [Sticker](/api/classes/api/classes/classes/sticker/) instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### modify()

> **modify**(`data`): `Promise`\<[`Sticker`](/api/classes/classes/sticker/)\>

Defined in: [entities/sticker.ts:45](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/sticker.ts#L45)

Modifies the sticker's data in the Discord API.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `RESTPatchAPIGuildStickerJSONBody` | The data to update for the sticker. |

#### Returns

`Promise`\<[`Sticker`](/api/classes/classes/sticker/)\>

A promise that resolves to an updated [Sticker](/api/classes/api/classes/classes/sticker/) instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### url()

> **url**(`settings`?): `string`

Defined in: [entities/sticker.ts:70](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/sticker.ts#L70)

Retrieves the URL of the sticker.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `any`; `size`: [`Sizes`](/api/classes/type-aliases/sizes/); \} | Optional settings to specify the sticker format and size. |
| `settings.format`? | `any` | - |
| `settings.size`? | [`Sizes`](/api/classes/type-aliases/sizes/) | - |

#### Returns

`string`

The URL of the sticker.

***

### buffer()

> **buffer**(): `Promise`\<`ArrayBuffer`\>

Defined in: [entities/sticker.ts:82](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/sticker.ts#L82)

Converts the sticker image to an ArrayBuffer for further processing or usage.

#### Returns

`Promise`\<`ArrayBuffer`\>

A promise that resolves to an `ArrayBuffer` representing the image data.

***

### delete()

> **delete**(): `Promise`\<`boolean`\>

Defined in: [entities/sticker.ts:93](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/sticker.ts#L93)

Deletes the sticker from the Discord API.

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the sticker was successfully deleted, or `false` if it failed.
