---
editUrl: false
next: false
prev: false
title: "Entity"
---

Defined in: [core/entity.ts:6](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L6)

Class that represents a base entity for API objects.

## Extended by

- [`Interaction`](/api/classes/classes/interaction/)
- [`Channel`](/api/classes/classes/channel/)
- [`Message`](/api/classes/classes/message/)
- [`HashImage`](/api/classes/classes/hashimage/)
- [`User`](/api/classes/classes/user/)
- [`Emoji`](/api/classes/classes/emoji/)
- [`Guild`](/api/classes/classes/guild/)
- [`Member`](/api/classes/classes/member/)
- [`Role`](/api/classes/classes/role/)
- [`Sticker`](/api/classes/classes/sticker/)

## Type Parameters

| Type Parameter |
| ------ |
| `Raw` |

## Constructors

### new Entity()

> **new Entity**\<`Raw`\>(`rest`, `raw`): [`Entity`](/api/classes/classes/entity/)\<`Raw`\>

Defined in: [core/entity.ts:18](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | `Raw` | The raw data from the API response. |

#### Returns

[`Entity`](/api/classes/classes/entity/)\<`Raw`\>

## Properties

### rest

> `readonly` **rest**: `Rest`

Defined in: [core/entity.ts:8](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L8)

The `Rest` instance for interacting with the Discord API.

***

### raw

> `readonly` **raw**: `Raw`

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.
