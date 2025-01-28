---
editUrl: false
next: false
prev: false
title: "User"
---

Defined in: [entities/user.ts:10](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/user.ts#L10)

Class representing a Discord user.

## Extends

- [`Entity`](/api-classes/classes/entity/)\<`APIUser`\>

## Constructors

### new User()

> **new User**(`rest`, `raw`): [`User`](/api-classes/classes/user/)

Defined in: [core/entity.ts:18](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/core/entity.ts#L18)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | `APIUser` | The raw data from the API response. |

#### Returns

[`User`](/api-classes/classes/user/)

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

> `readonly` **raw**: `APIUser`

Defined in: [core/entity.ts:11](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`raw`](/api-classes/classes/entity/#raw-1)

## Methods

### fetch()

> **fetch**(): `Promise`\<[`User`](/api-classes/classes/user/)\>

Defined in: [entities/user.ts:17](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/user.ts#L17)

Fetches the latest data for the user from the Discord API.

#### Returns

`Promise`\<[`User`](/api-classes/classes/user/)\>

A promise that resolves to an updated `User` instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### banner()

> **banner**(): [`Banner`](/api-classes/classes/banner/)

Defined in: [entities/user.ts:36](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/user.ts#L36)

Retrieves the user's banner.

#### Returns

[`Banner`](/api-classes/classes/banner/)

A `Banner` instance representing the user's banner.

***

### avatar()

> **avatar**(): [`Avatar`](/api-classes/classes/avatar/)

Defined in: [entities/user.ts:48](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/user.ts#L48)

Retrieves the user's avatar.

#### Returns

[`Avatar`](/api-classes/classes/avatar/)

An `Avatar` instance representing the user's avatar.

***

### createdAt()

> **createdAt**(): `Date`

Defined in: [entities/user.ts:60](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/user.ts#L60)

Returns the creation date of the user based on their Id.

#### Returns

`Date`

A `Date` object representing when the user was created.

***

### mention()

> **mention**(): `string`

Defined in: [entities/user.ts:70](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/user.ts#L70)

Returns a string to mention the user in Discord.

#### Returns

`string`

A string representing the user mention.
