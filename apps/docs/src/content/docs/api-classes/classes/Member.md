---
editUrl: false
next: false
prev: false
title: "Member"
---

Defined in: [entities/member.ts:14](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/member.ts#L14)

It represents a member within a Discord guild.

## Extends

- [`Entity`](/api-classes/classes/entity/)\<`APIGuildMember`\>

## Constructors

### new Member()

> **new Member**(`rest`, `raw`, `guild_raw`): [`Member`](/api-classes/classes/member/)

Defined in: [entities/member.ts:24](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/member.ts#L24)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | - |
| `raw` | `APIGuildMember` | The raw data from the API response. |
| `guild_raw` | `APIGuild` | - |

#### Returns

[`Member`](/api-classes/classes/member/)

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

> `readonly` **raw**: `APIGuildMember`

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`raw`](/api-classes/classes/entity/#raw-1)

***

### guild

> `readonly` **guild**: [`Guild`](/api-classes/classes/guild/)

Defined in: [entities/member.ts:16](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/member.ts#L16)

The `Guild` instance in which Member belongs.

## Methods

### banner()

> **banner**(): [`MemberBanner`](/api-classes/classes/memberbanner/)

Defined in: [entities/member.ts:34](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/member.ts#L34)

Retrieves the member's banner.

#### Returns

[`MemberBanner`](/api-classes/classes/memberbanner/)

A `MemberBanner` instance representing the member's banner.

***

### avatar()

> **avatar**(): [`MemberAvatar`](/api-classes/classes/memberavatar/)

Defined in: [entities/member.ts:47](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/member.ts#L47)

Retrieves the member's avatar.

#### Returns

[`MemberAvatar`](/api-classes/classes/memberavatar/)

An `MemberAvatar` instance representing the member's avatar.

***

### joined()

> **joined**(): `Date`

Defined in: [entities/member.ts:60](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/member.ts#L60)

Returns the joining date of the member.

#### Returns

`Date`

A `Date` object representing the member's joining date.

***

### premium()

> **premium**(): `null` \| `Date`

Defined in: [entities/member.ts:69](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/member.ts#L69)

Returns the date when the member started boosting the guild.

#### Returns

`null` \| `Date`

A `Date` object representing the date when the member started boosting the guild.

***

### fetch()

> **fetch**(): `Promise`\<[`Member`](/api-classes/classes/member/)\>

Defined in: [entities/member.ts:81](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/member.ts#L81)

Fetches the latest data for the member from the Discord API.

#### Returns

`Promise`\<[`Member`](/api-classes/classes/member/)\>

A promise that resolves to an updated `Member` instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### modify()

> **modify**(`data`): `Promise`\<[`Member`](/api-classes/classes/member/)\>

Defined in: [entities/member.ts:103](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/classes/src/entities/member.ts#L103)

Modifies a member's data in the Discord API.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `data` | `RESTPatchAPIGuildMemberJSONBody` |

#### Returns

`Promise`\<[`Member`](/api-classes/classes/member/)\>

A promise that resolves to an updated `Member` instance.

#### Throws

If the API request fails, an error is logged and re-thrown.
