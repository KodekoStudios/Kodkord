---
editUrl: false
next: false
prev: false
title: "GuildBanner"
---

Defined in: [entities/image.ts:201](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/image.ts#L201)

Class representing a guild's banner image.

This class extends the `HashImage` abstract class and implements methods to
retrieve guild banner URLs. Banners do not have default images.

## Extends

- [`HashImage`](/api/classes/classes/hashimage/)\<[`RawImage`](/api/classes/interfaces/rawimage/)\>

## Constructors

### new GuildBanner()

> **new GuildBanner**(`rest`, `raw`): [`GuildBanner`](/api/classes/classes/guildbanner/)

Defined in: [core/entity.ts:18](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | [`RawImage`](/api/classes/interfaces/rawimage/) | The raw data from the API response. |

#### Returns

[`GuildBanner`](/api/classes/classes/guildbanner/)

#### Inherited from

[`HashImage`](/api/classes/classes/hashimage/).[`constructor`](/api/classes/classes/hashimage/#constructors)

## Properties

### rest

> `readonly` **rest**: `Rest`

Defined in: [core/entity.ts:8](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L8)

The `Rest` instance for interacting with the Discord API.

#### Inherited from

[`HashImage`](/api/classes/classes/hashimage/).[`rest`](/api/classes/classes/hashimage/#rest-1)

***

### raw

> `readonly` **raw**: [`RawImage`](/api/classes/interfaces/rawimage/)

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`HashImage`](/api/classes/classes/hashimage/).[`raw`](/api/classes/classes/hashimage/#raw-1)

## Methods

### display()

> **display**(`settings`?): `string`

Defined in: [entities/image.ts:72](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/image.ts#L72)

Retrieves the most appropriate image URL.

This method prioritizes the custom image URL and falls back to the default
URL if available. If neither is available, it returns an empty string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `ImageFormat`; `size`: [`Sizes`](/api/classes/type-aliases/sizes/); \} | Optional settings to specify the image format and size. |
| `settings.format`? | `ImageFormat` | - |
| `settings.size`? | [`Sizes`](/api/classes/type-aliases/sizes/) | - |

#### Returns

`string`

The displayable URL of the image or an empty string.

#### Inherited from

[`HashImage`](/api/classes/classes/hashimage/).[`display`](/api/classes/classes/hashimage/#display)

***

### buffer()

> **buffer**(): `Promise`\<`ArrayBuffer`\>

Defined in: [entities/image.ts:84](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/image.ts#L84)

Converts the image to an ArrayBuffer for further processing or usage.

#### Returns

`Promise`\<`ArrayBuffer`\>

A promise resolving to an ArrayBuffer representing the image data.

#### Inherited from

[`HashImage`](/api/classes/classes/hashimage/).[`buffer`](/api/classes/classes/hashimage/#buffer)

***

### url()

> **url**(`settings`?): `null` \| `string`

Defined in: [entities/image.ts:208](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/image.ts#L208)

Retrieves the URL of the guild's banner.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `GuildBannerFormat`; `size`: [`Sizes`](/api/classes/type-aliases/sizes/); \} | Optional settings to specify the banner format and size. |
| `settings.format`? | `GuildBannerFormat` | - |
| `settings.size`? | [`Sizes`](/api/classes/type-aliases/sizes/) | - |

#### Returns

`null` \| `string`

The banner URL or `null` if the guild does not have a custom banner.

#### Overrides

[`HashImage`](/api/classes/classes/hashimage/).[`url`](/api/classes/classes/hashimage/#url)

***

### default()

> **default**(): `undefined`

Defined in: [entities/image.ts:222](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/image.ts#L222)

Banners do not have a default URL.

#### Returns

`undefined`

`undefined` as there is no default banner image.

#### Overrides

[`HashImage`](/api/classes/classes/hashimage/).[`default`](/api/classes/classes/hashimage/#default)
