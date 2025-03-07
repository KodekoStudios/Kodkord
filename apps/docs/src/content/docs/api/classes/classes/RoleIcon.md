---
editUrl: false
next: false
prev: false
title: "RoleIcon"
---

Defined in: [entities/image.ts:233](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/image.ts#L233)

Class representing a role icon's image.

This class extends the `HashImage` abstract class and implements methods to
retrieve role role icon URLs. Role icons do not have default images

## Extends

- [`HashImage`](/api/classes/classes/hashimage/)\<[`RawImage`](/api/classes/interfaces/rawimage/)\>

## Constructors

### new RoleIcon()

> **new RoleIcon**(`rest`, `raw`): [`RoleIcon`](/api/classes/classes/roleicon/)

Defined in: [core/entity.ts:18](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | [`RawImage`](/api/classes/interfaces/rawimage/) | The raw data from the API response. |

#### Returns

[`RoleIcon`](/api/classes/classes/roleicon/)

#### Inherited from

[`HashImage`](/api/classes/classes/hashimage/).[`constructor`](/api/classes/classes/hashimage/#constructors)

## Properties

### rest

> `readonly` **rest**: `Rest`

Defined in: [core/entity.ts:8](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/core/entity.ts#L8)

The `Rest` instance for interacting with the Discord API.

#### Inherited from

[`HashImage`](/api/classes/classes/hashimage/).[`rest`](/api/classes/classes/hashimage/#rest-1)

***

### raw

> `readonly` **raw**: [`RawImage`](/api/classes/interfaces/rawimage/)

Defined in: [core/entity.ts:11](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`HashImage`](/api/classes/classes/hashimage/).[`raw`](/api/classes/classes/hashimage/#raw-1)

## Methods

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

#### Inherited from

[`HashImage`](/api/classes/classes/hashimage/).[`display`](/api/classes/classes/hashimage/#display)

***

### buffer()

> **buffer**(): `Promise`\<`ArrayBuffer`\>

Defined in: [entities/image.ts:84](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/image.ts#L84)

Converts the image to an ArrayBuffer for further processing or usage.

#### Returns

`Promise`\<`ArrayBuffer`\>

A promise resolving to an ArrayBuffer representing the image data.

#### Inherited from

[`HashImage`](/api/classes/classes/hashimage/).[`buffer`](/api/classes/classes/hashimage/#buffer)

***

### url()

> **url**(`settings`?): `null` \| `string`

Defined in: [entities/image.ts:240](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/image.ts#L240)

Retrieves the URL of the role's icon.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings`? | \{ `format`: `any`; `size`: [`Sizes`](/api/classes/type-aliases/sizes/); \} | Optional settings to specify the icon format and size. |
| `settings.format`? | `any` | - |
| `settings.size`? | [`Sizes`](/api/classes/type-aliases/sizes/) | - |

#### Returns

`null` \| `string`

The icon URL or `null` if the user does not have a custom icon.

#### Overrides

[`HashImage`](/api/classes/classes/hashimage/).[`url`](/api/classes/classes/hashimage/#url)

***

### default()

> **default**(): `undefined`

Defined in: [entities/image.ts:254](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/image.ts#L254)

Icons do not have a default URL.

#### Returns

`undefined`

`undefined` as there is no default icon image.

#### Overrides

[`HashImage`](/api/classes/classes/hashimage/).[`default`](/api/classes/classes/hashimage/#default)
