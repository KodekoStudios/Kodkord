---
editUrl: false
next: false
prev: false
title: "MemberBanner"
---

Defined in: [entities/image.ts:297](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/image.ts#L297)

Class representing a member's banner image.

This class extends the `HashImage` abstract class and implements methods to
retrieve member banner URLs. Banners do not have default images.

## Extends

- [`HashImage`](/api-classes/classes/hashimage/)\<[`GuildRawImage`](/api-classes/type-aliases/guildrawimage/)\>

## Constructors

### new MemberBanner()

> **new MemberBanner**(`rest`, `raw`): [`MemberBanner`](/api-classes/classes/memberbanner/)

Defined in: [core/entity.ts:18](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | [`GuildRawImage`](/api-classes/type-aliases/guildrawimage/) | The raw data from the API response. |

#### Returns

[`MemberBanner`](/api-classes/classes/memberbanner/)

#### Inherited from

[`HashImage`](/api-classes/classes/hashimage/).[`constructor`](/api-classes/classes/hashimage/#constructors)

## Properties

### rest

> `readonly` **rest**: `Rest`

Defined in: [core/entity.ts:8](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/core/entity.ts#L8)

The `Rest` instance for interacting with the Discord API.

#### Inherited from

[`HashImage`](/api-classes/classes/hashimage/).[`rest`](/api-classes/classes/hashimage/#rest-1)

***

### raw

> `readonly` **raw**: [`GuildRawImage`](/api-classes/type-aliases/guildrawimage/)

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`HashImage`](/api-classes/classes/hashimage/).[`raw`](/api-classes/classes/hashimage/#raw-1)

## Methods

### display()

> **display**(`settings`?): `string`

Defined in: [entities/image.ts:72](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/image.ts#L72)

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

Defined in: [entities/image.ts:84](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/image.ts#L84)

Converts the image to an ArrayBuffer for further processing or usage.

#### Returns

`Promise`\<`ArrayBuffer`\>

A promise resolving to an ArrayBuffer representing the image data.

#### Inherited from

[`HashImage`](/api-classes/classes/hashimage/).[`buffer`](/api-classes/classes/hashimage/#buffer)

***

### url()

> **url**(`settings`?): `null` \| `string`

Defined in: [entities/image.ts:304](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/image.ts#L304)

Retrieves the URL of the member's banner.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `UserBannerFormat`; `size`: [`Sizes`](/api-classes/type-aliases/sizes/); \} | Optional settings to specify the banner format and size. |
| `settings.format`? | `UserBannerFormat` | - |
| `settings.size`? | [`Sizes`](/api-classes/type-aliases/sizes/) | - |

#### Returns

`null` \| `string`

The banner URL or `null` if the member does not have a custom banner.

#### Overrides

[`HashImage`](/api-classes/classes/hashimage/).[`url`](/api-classes/classes/hashimage/#url)

***

### default()

> **default**(): `undefined`

Defined in: [entities/image.ts:318](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/image.ts#L318)

Banners do not have a default URL.

#### Returns

`undefined`

`undefined` as there is no default banner image.

#### Overrides

[`HashImage`](/api-classes/classes/hashimage/).[`default`](/api-classes/classes/hashimage/#default)
