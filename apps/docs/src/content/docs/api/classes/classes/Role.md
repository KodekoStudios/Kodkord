---
editUrl: false
next: false
prev: false
title: "Role"
---

Defined in: [entities/role.ts:14](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/role.ts#L14)

Represents a role within a Discord guild.

## Extends

- [`Entity`](/api/classes/classes/entity/)\<`APIRole`\>

## Constructors

### new Role()

> **new Role**(`rest`, `raw`, `guildRaw`): [`Role`](/api/classes/classes/role/)

Defined in: [entities/role.ts:25](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/role.ts#L25)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | The REST manager for making API requests. |
| `raw` | `APIRole` | The raw data from the API response. |
| `guildRaw` | `APIGuild` | The raw data of the guild to which the role belongs. |

#### Returns

[`Role`](/api/classes/classes/role/)

#### Overrides

[`Entity`](/api/classes/classes/entity/).[`constructor`](/api/classes/classes/entity/#constructors)

## Properties

### rest

> `readonly` **rest**: `Rest`

Defined in: [core/entity.ts:8](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L8)

The `Rest` instance for interacting with the Discord API.

#### Inherited from

[`Entity`](/api/classes/classes/entity/).[`rest`](/api/classes/classes/entity/#rest-1)

***

### raw

> `readonly` **raw**: `APIRole`

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`Entity`](/api/classes/classes/entity/).[`raw`](/api/classes/classes/entity/#raw-1)

***

### guild

> `readonly` **guild**: [`Guild`](/api/classes/classes/guild/)

Defined in: [entities/role.ts:16](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/role.ts#L16)

The [Guild](../../../../../../../api/classes/classes/guild) instance in which the role belongs.

## Methods

### icon()

> **icon**(): [`RoleIcon`](/api/classes/classes/roleicon/)

Defined in: [entities/role.ts:35](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/role.ts#L35)

Retrieves the role's icon.

#### Returns

[`RoleIcon`](/api/classes/classes/roleicon/)

A [RoleIcon](/api/classes/api/classes/classes/roleicon/) instance representing the role's icon.

***

### fetch()

> **fetch**(): `Promise`\<[`Role`](/api/classes/classes/role/)\>

Defined in: [entities/role.ts:48](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/role.ts#L48)

Fetches the latest data for the role from the Discord API.

#### Returns

`Promise`\<[`Role`](/api/classes/classes/role/)\>

A promise that resolves to an updated [Role](/api/classes/api/classes/classes/role/) instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### modify()

> **modify**(`data`): `Promise`\<[`Role`](/api/classes/classes/role/)\>

Defined in: [entities/role.ts:69](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/role.ts#L69)

Modifies the role's data in the Discord API.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `RESTPatchAPIGuildRoleJSONBody` & `object` | The data to update for the role, including an optional `position` field. |

#### Returns

`Promise`\<[`Role`](/api/classes/classes/role/)\>

A promise that resolves to an updated [Role](/api/classes/api/classes/classes/role/) instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### mention()

> **mention**(): `string`

Defined in: [entities/role.ts:107](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/role.ts#L107)

Returns a string to mention the role in Discord.

#### Returns

`string`

A string representing the role mention.
