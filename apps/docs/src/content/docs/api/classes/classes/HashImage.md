---
editUrl: false
next: false
prev: false
title: "HashImage"
---

Defined in: [entities/image.ts:40](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/image.ts#L40)

Abstract class representing a hash-based image entity.

This class provides a base for entities such as avatars, banners, and icons,
offering common functionality for retrieving and processing image-related data.
It extends the `Entity` class, allowing interaction with raw API data.

## Extends

- [`Entity`](/api/classes/classes/entity/)\<`Raw`\>

## Extended by

- [`UserAvatar`](/api/classes/classes/useravatar/)
- [`UserBanner`](/api/classes/classes/userbanner/)
- [`GuildIcon`](/api/classes/classes/guildicon/)
- [`GuildBanner`](/api/classes/classes/guildbanner/)
- [`RoleIcon`](/api/classes/classes/roleicon/)
- [`MemberAvatar`](/api/classes/classes/memberavatar/)
- [`MemberBanner`](/api/classes/classes/memberbanner/)

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `Raw` *extends* [`RawImage`](/api/classes/interfaces/rawimage/) | The raw data type for the image entity. |

## Constructors

### new HashImage()

> **new HashImage**\<`Raw`\>(`rest`, `raw`): [`HashImage`](/api/classes/classes/hashimage/)\<`Raw`\>

Defined in: [core/entity.ts:18](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | `Raw` | The raw data from the API response. |

#### Returns

[`HashImage`](/api/classes/classes/hashimage/)\<`Raw`\>

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

> `readonly` **raw**: `Raw`

Defined in: [core/entity.ts:11](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`Entity`](/api/classes/classes/entity/).[`raw`](/api/classes/classes/entity/#raw-1)

## Methods

### url()

> `abstract` **url**(`settings`?): `null` \| `string`

Defined in: [entities/image.ts:47](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/image.ts#L47)

Retrieves the URL of the image based on the hash and settings provided.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `any`; `size`: [`Sizes`](/api/classes/type-aliases/sizes/); \} | Optional settings to specify the image format and size. |
| `settings.format`? | `any` | - |
| `settings.size`? | [`Sizes`](/api/classes/type-aliases/sizes/) | - |

#### Returns

`null` \| `string`

The URL of the image or `null` if the hash is not available.

***

### default()

> `abstract` **default**(`settings`?): `undefined` \| `string`

Defined in: [entities/image.ts:58](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/image.ts#L58)

Retrieves the default URL of the image if a default is provided by Discord.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `any`; `size`: [`Sizes`](/api/classes/type-aliases/sizes/); \} | Optional settings to specify the image format and size. |
| `settings.format`? | `any` | - |
| `settings.size`? | [`Sizes`](/api/classes/type-aliases/sizes/) | - |

#### Returns

`undefined` \| `string`

The default image URL or `undefined` if not applicable.

***

### display()

> **display**(`settings`?): `string`

Defined in: [entities/image.ts:72](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/image.ts#L72)

Retrieves the most appropriate image URL.

This method prioritizes the custom image URL and falls back to the default
URL if available. If neither is available, it returns an empty string.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `any`; `size`: [`Sizes`](/api/classes/type-aliases/sizes/); \} | Optional settings to specify the image format and size. |
| `settings.format`? | `any` | - |
| `settings.size`? | [`Sizes`](/api/classes/type-aliases/sizes/) | - |

#### Returns

`string`

The displayable URL of the image or an empty string.

***

### buffer()

> **buffer**(): `Promise`\<`ArrayBuffer`\>

Defined in: [entities/image.ts:84](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/image.ts#L84)

Converts the image to an ArrayBuffer for further processing or usage.

#### Returns

`Promise`\<`ArrayBuffer`\>

A promise resolving to an ArrayBuffer representing the image data.
