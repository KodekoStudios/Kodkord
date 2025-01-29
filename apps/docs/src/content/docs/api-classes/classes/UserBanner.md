---
editUrl: false
next: false
prev: false
title: "UserBanner"
---

Defined in: [entities/image.ts:136](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/image.ts#L136)

Class representing a user's banner image.

This class extends the `HashImage` abstract class and implements methods to
retrieve user banner URLs. Banners do not have default images.

## Extends

- [`HashImage`](/api-classes/classes/hashimage/)\<[`RawImage`](/api-classes/interfaces/rawimage/)\>

## Constructors

### new UserBanner()

> **new UserBanner**(`rest`, `raw`): [`UserBanner`](/api-classes/classes/userbanner/)

Defined in: [core/entity.ts:18](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | [`RawImage`](/api-classes/interfaces/rawimage/) | The raw data from the API response. |

#### Returns

[`UserBanner`](/api-classes/classes/userbanner/)

#### Inherited from

[`HashImage`](/api-classes/classes/hashimage/).[`constructor`](/api-classes/classes/hashimage/#constructors)

## Properties

### rest

> `readonly` **rest**: `Rest`

Defined in: [core/entity.ts:8](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/core/entity.ts#L8)

The `Rest` instance for interacting with the Discord API.

#### Inherited from

[`HashImage`](/api-classes/classes/hashimage/).[`rest`](/api-classes/classes/hashimage/#rest-1)

***

### raw

> `readonly` **raw**: [`RawImage`](/api-classes/interfaces/rawimage/)

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`HashImage`](/api-classes/classes/hashimage/).[`raw`](/api-classes/classes/hashimage/#raw-1)

## Methods

### display()

> **display**(`settings`?): `string`

Defined in: [entities/image.ts:72](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/image.ts#L72)

Retrieves the most appropriate image URL.

This method prioritizes the custom image URL and falls back to the default
URL if available. If neither is available, it returns an empty string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `ImageFormat`; `size`: [`Sizes`](/api-classes/type-aliases/sizes/); \} | Optional settings to specify the image format and size. |
| `settings.format`? | `ImageFormat` | - |
| `settings.size`? | [`Sizes`](/api-classes/type-aliases/sizes/) | - |

#### Returns

`string`

The displayable URL of the image or an empty string.

#### Inherited from

[`HashImage`](/api-classes/classes/hashimage/).[`display`](/api-classes/classes/hashimage/#display)

***

### buffer()

> **buffer**(): `Promise`\<`ArrayBuffer`\>

Defined in: [entities/image.ts:84](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/image.ts#L84)

Converts the image to an ArrayBuffer for further processing or usage.

#### Returns

`Promise`\<`ArrayBuffer`\>

A promise resolving to an ArrayBuffer representing the image data.

#### Inherited from

[`HashImage`](/api-classes/classes/hashimage/).[`buffer`](/api-classes/classes/hashimage/#buffer)

***

### url()

> **url**(`settings`?): `null` \| `string`

Defined in: [entities/image.ts:143](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/image.ts#L143)

Retrieves the URL of the user's banner.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `UserBannerFormat`; `size`: [`Sizes`](/api-classes/type-aliases/sizes/); \} | Optional settings to specify the banner format and size. |
| `settings.format`? | `UserBannerFormat` | - |
| `settings.size`? | [`Sizes`](/api-classes/type-aliases/sizes/) | - |

#### Returns

`null` \| `string`

The banner URL or `null` if the user does not have a custom banner.

#### Overrides

[`HashImage`](/api-classes/classes/hashimage/).[`url`](/api-classes/classes/hashimage/#url)

***

### default()

> **default**(): `undefined`

Defined in: [entities/image.ts:157](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/image.ts#L157)

Banners do not have a default URL.

#### Returns

`undefined`

`undefined` as there is no default banner image.

#### Overrides

[`HashImage`](/api-classes/classes/hashimage/).[`default`](/api-classes/classes/hashimage/#default)
