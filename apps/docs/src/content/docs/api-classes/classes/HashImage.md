---
editUrl: false
next: false
prev: false
title: "HashImage"
---

Defined in: [entities/image.ts:32](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/image.ts#L32)

Abstract class representing a hash-based image entity.

This class provides a base for entities such as avatars, banners, and icons,
offering common functionality for retrieving and processing image-related data.
It extends the `Entity` class, allowing interaction with raw API data.

## Extends

- [`Entity`](/api-classes/classes/entity/)\<`Raw`\>

## Extended by

- [`Avatar`](/api-classes/classes/avatar/)
- [`Banner`](/api-classes/classes/banner/)

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `Raw` *extends* [`RawImage`](/api-classes/interfaces/rawimage/) | The raw data type for the image entity. |

## Constructors

### new HashImage()

> **new HashImage**\<`Raw`\>(`rest`, `raw`): [`HashImage`](/api-classes/classes/hashimage/)\<`Raw`\>

Defined in: [core/entity.ts:18](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | `Raw` | The raw data from the API response. |

#### Returns

[`HashImage`](/api-classes/classes/hashimage/)\<`Raw`\>

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`constructor`](/api-classes/classes/entity/#constructors)

## Properties

### rest

> `readonly` **rest**: `Rest`

Defined in: [core/entity.ts:8](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/core/entity.ts#L8)

The `Rest` instance for interacting with the Discord API.

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`rest`](/api-classes/classes/entity/#rest-1)

***

### raw

> `readonly` **raw**: `Raw`

Defined in: [core/entity.ts:11](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`raw`](/api-classes/classes/entity/#raw-1)

## Methods

### url()

> `abstract` **url**(`settings`?): `null` \| `string`

Defined in: [entities/image.ts:39](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/image.ts#L39)

Retrieves the URL of the image based on the hash and settings provided.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `ImageFormat`; `size`: [`Sizes`](/api-classes/type-aliases/sizes/); \} | Optional settings to specify the image format and size. |
| `settings.format`? | `ImageFormat` | - |
| `settings.size`? | [`Sizes`](/api-classes/type-aliases/sizes/) | - |

#### Returns

`null` \| `string`

The URL of the image or `null` if the hash is not available.

***

### default()

> `abstract` **default**(`settings`?): `undefined` \| `string`

Defined in: [entities/image.ts:50](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/image.ts#L50)

Retrieves the default URL of the image if a default is provided by Discord.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `ImageFormat`; `size`: [`Sizes`](/api-classes/type-aliases/sizes/); \} | Optional settings to specify the image format and size. |
| `settings.format`? | `ImageFormat` | - |
| `settings.size`? | [`Sizes`](/api-classes/type-aliases/sizes/) | - |

#### Returns

`undefined` \| `string`

The default image URL or `undefined` if not applicable.

***

### display()

> **display**(`settings`?): `string`

Defined in: [entities/image.ts:64](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/image.ts#L64)

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

***

### buffer()

> **buffer**(): `Promise`\<`ArrayBuffer`\>

Defined in: [entities/image.ts:76](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/image.ts#L76)

Converts the image to an ArrayBuffer for further processing or usage.

#### Returns

`Promise`\<`ArrayBuffer`\>

A promise resolving to an ArrayBuffer representing the image data.
