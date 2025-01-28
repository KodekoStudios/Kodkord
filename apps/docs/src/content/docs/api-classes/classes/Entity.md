---
editUrl: false
next: false
prev: false
title: "Entity"
---

Defined in: [core/entity.ts:6](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/core/entity.ts#L6)

Class that represents a base entity for API objects.

## Extended by

- [`Interaction`](/api-classes/classes/interaction/)
- [`Channel`](/api-classes/classes/channel/)
- [`Message`](/api-classes/classes/message/)
- [`HashImage`](/api-classes/classes/hashimage/)
- [`User`](/api-classes/classes/user/)

## Type Parameters

| Type Parameter |
| ------ |
| `Raw` |

## Constructors

### new Entity()

> **new Entity**\<`Raw`\>(`rest`, `raw`): [`Entity`](/api-classes/classes/entity/)\<`Raw`\>

Defined in: [core/entity.ts:18](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | `Raw` | The raw data from the API response. |

#### Returns

[`Entity`](/api-classes/classes/entity/)\<`Raw`\>

## Properties

### rest

> `readonly` **rest**: `Rest`

Defined in: [core/entity.ts:8](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/core/entity.ts#L8)

The `Rest` instance for interacting with the Discord API.

***

### raw

> `readonly` **raw**: `Raw`

Defined in: [core/entity.ts:11](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.
