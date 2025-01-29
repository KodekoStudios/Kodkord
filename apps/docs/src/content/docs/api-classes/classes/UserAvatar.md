---
editUrl: false
next: false
prev: false
title: "UserAvatar"
---

Defined in: [entities/image.ts:97](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/image.ts#L97)

Class representing a user's avatar image.

This class extends the `HashImage` abstract class and implements methods to
retrieve user avatar URLs, including support for default Discord avatars.

## Extends

- [`HashImage`](/api-classes/classes/hashimage/)\<[`RawImage`](/api-classes/interfaces/rawimage/)\>

## Constructors

### new UserAvatar()

> **new UserAvatar**(`rest`, `raw`): [`UserAvatar`](/api-classes/classes/useravatar/)

Defined in: [core/entity.ts:18](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | [`RawImage`](/api-classes/interfaces/rawimage/) | The raw data from the API response. |

#### Returns

[`UserAvatar`](/api-classes/classes/useravatar/)

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

Defined in: [entities/image.ts:104](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/image.ts#L104)

Retrieves the URL of the user's avatar.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `UserAvatarFormat`; `size`: [`Sizes`](/api-classes/type-aliases/sizes/); \} | Optional settings to specify the avatar format and size. |
| `settings.format`? | `UserAvatarFormat` | - |
| `settings.size`? | [`Sizes`](/api-classes/type-aliases/sizes/) | - |

#### Returns

`null` \| `string`

The avatar URL or `null` if the user does not have a custom avatar.

#### Overrides

[`HashImage`](/api-classes/classes/hashimage/).[`url`](/api-classes/classes/hashimage/#url)

***

### default()

> **default**(`settings`?): `undefined` \| `string`

Defined in: [entities/image.ts:121](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/image.ts#L121)

Retrieves the default URL of the user's avatar.

The default avatar is determined based on the user's Id.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `ImageFormat`; `size`: [`Sizes`](/api-classes/type-aliases/sizes/); \} | Optional settings to specify the avatar size. |
| `settings.format`? | `ImageFormat` | - |
| `settings.size`? | [`Sizes`](/api-classes/type-aliases/sizes/) | - |

#### Returns

`undefined` \| `string`

The default avatar URL.

#### Overrides

[`HashImage`](/api-classes/classes/hashimage/).[`default`](/api-classes/classes/hashimage/#default)
