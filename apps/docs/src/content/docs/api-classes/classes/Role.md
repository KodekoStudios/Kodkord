---
editUrl: false
next: false
prev: false
title: "Role"
---

Defined in: [entities/role.ts:14](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/role.ts#L14)

It represents a role within a Discord guild.

## Extends

- [`Entity`](/api-classes/classes/entity/)\<`APIRole`\>

## Constructors

### new Role()

> **new Role**(`rest`, `raw`, `guildRaw`): [`Role`](/api-classes/classes/role/)

Defined in: [entities/role.ts:23](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/role.ts#L23)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | `APIRole` | The raw data from the API response. |
| `guildRaw` | `APIGuild` | - |

#### Returns

[`Role`](/api-classes/classes/role/)

#### Overrides

[`Entity`](/api-classes/classes/entity/).[`constructor`](/api-classes/classes/entity/#constructors)

## Properties

### rest

> `readonly` **rest**: `Rest`

Defined in: [core/entity.ts:8](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/core/entity.ts#L8)

The `Rest` instance for interacting with the Discord API.

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`rest`](/api-classes/classes/entity/#rest-1)

***

### raw

> `readonly` **raw**: `APIRole`

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`raw`](/api-classes/classes/entity/#raw-1)

***

### guild

> `readonly` **guild**: [`Guild`](/api-classes/classes/guild/)

Defined in: [entities/role.ts:16](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/role.ts#L16)

The `Guild` instance in which Role belongs.

## Methods

### icon()

> **icon**(): [`RoleIcon`](/api-classes/classes/roleicon/)

Defined in: [entities/role.ts:33](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/role.ts#L33)

Retrieves the roles's icon.

#### Returns

[`RoleIcon`](/api-classes/classes/roleicon/)

A `RoleIcon` instance representing the role's icon.

***

### fetch()

> **fetch**(): `Promise`\<[`Role`](/api-classes/classes/role/)\>

Defined in: [entities/role.ts:46](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/role.ts#L46)

Fetches the latest data for the role from the Discord API.

#### Returns

`Promise`\<[`Role`](/api-classes/classes/role/)\>

A promise that resolves to an updated `Role` instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### mention()

> **mention**(): `string`

Defined in: [entities/role.ts:65](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/role.ts#L65)

Returns a string to mention the emoji in Discord.

#### Returns

`string`

A string representing the emoji mention.

***

### modify()

> **modify**(`data`): `Promise`\<[`Role`](/api-classes/classes/role/)\>

Defined in: [entities/role.ts:75](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/role.ts#L75)

Modifies a role's data in the Discord API.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `RESTPatchAPIGuildRoleJSONBody` & `object` |

#### Returns

`Promise`\<[`Role`](/api-classes/classes/role/)\>

A promise that resolves to an updated `Role` instance.

#### Throws

If the API request fails, an error is logged and re-thrown.
