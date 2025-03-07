---
editUrl: false
next: false
prev: false
title: "Member"
---

Defined in: [entities/member.ts:15](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/member.ts#L15)

Represents a member within a Discord guild.

## Extends

- [`Entity`](/api/classes/classes/entity/)\<`APIGuildMember`\>

## Constructors

### new Member()

> **new Member**(`rest`, `raw`, `guild_raw`): [`Member`](/api/classes/classes/member/)

Defined in: [entities/member.ts:26](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/member.ts#L26)

Creates an instance of the Entity.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | The REST manager for making API requests. |
| `raw` | `APIGuildMember` | The raw data from the API response. |
| `guild_raw` | `APIGuild` | The raw data of the guild to which the member belongs. |

#### Returns

[`Member`](/api/classes/classes/member/)

#### Overrides

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

> `readonly` **raw**: `APIGuildMember`

Defined in: [core/entity.ts:11](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Inherited from

[`Entity`](/api/classes/classes/entity/).[`raw`](/api/classes/classes/entity/#raw-1)

***

### guild

> `readonly` **guild**: [`Guild`](/api/classes/classes/guild/)

Defined in: [entities/member.ts:17](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/member.ts#L17)

The [Guild](../../../../../../../api/classes/classes/guild) instance in which the member belongs.

## Accessors

### joined

#### Get Signature

> **get** **joined**(): `Date`

Defined in: [entities/member.ts:40](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/member.ts#L40)

Returns the joining date of the member.

##### Returns

`Date`

A `Date` object representing the member's joining date.

***

### premium

#### Get Signature

> **get** **premium**(): `null` \| `Date`

Defined in: [entities/member.ts:49](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/member.ts#L49)

Returns the date when the member started boosting the guild.

##### Returns

`null` \| `Date`

A `Date` object representing the date when the member started boosting the guild, or `null` if the member is not boosting.

## Methods

### banner()

> **banner**(): [`MemberBanner`](/api/classes/classes/memberbanner/)

Defined in: [entities/member.ts:64](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/member.ts#L64)

Retrieves the member's banner.

#### Returns

[`MemberBanner`](/api/classes/classes/memberbanner/)

A [MemberBanner](/api/classes/api/classes/classes/memberbanner/) instance representing the member's banner.

***

### avatar()

> **avatar**(): [`MemberAvatar`](/api/classes/classes/memberavatar/)

Defined in: [entities/member.ts:77](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/member.ts#L77)

Retrieves the member's avatar.

#### Returns

[`MemberAvatar`](/api/classes/classes/memberavatar/)

A [MemberAvatar](/api/classes/api/classes/classes/memberavatar/) instance representing the member's avatar.

***

### fetch()

> **fetch**(): `Promise`\<[`Member`](/api/classes/classes/member/)\>

Defined in: [entities/member.ts:95](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/member.ts#L95)

Fetches the latest data for the member from the Discord API.

#### Returns

`Promise`\<[`Member`](/api/classes/classes/member/)\>

A promise that resolves to an updated [Member](/api/classes/api/classes/classes/member/) instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### modify()

> **modify**(`data`): `Promise`\<[`Member`](/api/classes/classes/member/)\>

Defined in: [entities/member.ts:118](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/member.ts#L118)

Modifies a member's data in the Discord API.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `RESTPatchAPIGuildMemberJSONBody` | The data to update for the member. |

#### Returns

`Promise`\<[`Member`](/api/classes/classes/member/)\>

A promise that resolves to an updated [Member](/api/classes/api/classes/classes/member/) instance.

#### Throws

If the API request fails, an error is logged and re-thrown.

***

### voice()

> **voice**(): `Promise`\<`APIVoiceState`\>

Defined in: [entities/member.ts:147](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/classes/src/entities/member.ts#L147)

Fetches the voice state of the member in the guild.

#### Returns

`Promise`\<`APIVoiceState`\>

A promise that resolves to the APIVoiceState object representing the member's voice state.

#### Throws

If the API request fails, an error is logged and re-thrown.
