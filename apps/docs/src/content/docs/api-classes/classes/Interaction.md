---
editUrl: false
next: false
prev: false
title: "Interaction"
---

Defined in: [entities/interaction.ts:21](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/interaction.ts#L21)

Class that represents a base entity for API objects.

## Extends

- [`Entity`](/api-classes/classes/entity/)\<`APIInteraction` & `object`\>

## Type Parameters

| Type Parameter |
| ------ |
| `Type` *extends* `InteractionType` |

## Constructors

### new Interaction()

> **new Interaction**\<`Type`\>(`rest`, `raw`): [`Interaction`](/api-classes/classes/interaction/)\<`Type`\>

Defined in: [entities/interaction.ts:26](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/interaction.ts#L26)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `rest` | `Rest` |
| `raw` | `APIInteraction` & `object` |

#### Returns

[`Interaction`](/api-classes/classes/interaction/)\<`Type`\>

#### Overrides

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

> `readonly` **raw**: `APIInteraction` & `object`

Defined in: [core/entity.ts:11](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Type declaration

##### type

> **type**: `Type`

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`raw`](/api-classes/classes/entity/#raw-1)

## Methods

### deleteResponse()

> **deleteResponse**(`body`): `Promise`\<`boolean`\>

Defined in: [entities/interaction.ts:31](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/interaction.ts#L31)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `body` | `APIInteractionResponse` |

#### Returns

`Promise`\<`boolean`\>

***

### modifyResponse()

> **modifyResponse**(`body`): `Promise`\<`boolean`\>

Defined in: [entities/interaction.ts:48](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/interaction.ts#L48)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `body` | `APIInteractionResponse` |

#### Returns

`Promise`\<`boolean`\>

***

### pong()

> **pong**(): `Promise`\<`undefined` \| `RESTPostAPIInteractionCallbackWithResponseResult`\>

Defined in: [entities/interaction.ts:73](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/interaction.ts#L73)

#### Returns

`Promise`\<`undefined` \| `RESTPostAPIInteractionCallbackWithResponseResult`\>

***

### respond()

> **respond**(`body`): `Promise`\<`undefined` \| `RESTPostAPIInteractionCallbackWithResponseResult`\>

Defined in: [entities/interaction.ts:86](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/interaction.ts#L86)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `body` | `APIInteractionResponse` |

#### Returns

`Promise`\<`undefined` \| `RESTPostAPIInteractionCallbackWithResponseResult`\>

***

### guild()

> **guild**(): `Promise`\<`undefined` \| [`Entity`](/api-classes/classes/entity/)\<`APIGuild`\>\>

Defined in: [entities/interaction.ts:112](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/interaction.ts#L112)

#### Returns

`Promise`\<`undefined` \| [`Entity`](/api-classes/classes/entity/)\<`APIGuild`\>\>

***

### channel()

> **channel**(): `Promise`\<`undefined` \| [`Channel`](/api-classes/classes/channel/)\<`ChannelType`\>\>

Defined in: [entities/interaction.ts:131](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/interaction.ts#L131)

#### Returns

`Promise`\<`undefined` \| [`Channel`](/api-classes/classes/channel/)\<`ChannelType`\>\>

***

### user()

> **user**(): `null` \| [`User`](/api-classes/classes/user/)

Defined in: [entities/interaction.ts:150](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/interaction.ts#L150)

#### Returns

`null` \| [`User`](/api-classes/classes/user/)

***

### isCompleted()

> **isCompleted**(): `boolean`

Defined in: [entities/interaction.ts:156](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/interaction.ts#L156)

#### Returns

`boolean`

***

### isPing()

> **isPing**(): `this is Interaction<Ping>`

Defined in: [entities/interaction.ts:160](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/interaction.ts#L160)

#### Returns

`this is Interaction<Ping>`

***

### isApplicationCommand()

> **isApplicationCommand**(): `this is Interaction<ApplicationCommand>`

Defined in: [entities/interaction.ts:164](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/interaction.ts#L164)

#### Returns

`this is Interaction<ApplicationCommand>`

***

### isMessageComponent()

> **isMessageComponent**(): `this is Interaction<MessageComponent>`

Defined in: [entities/interaction.ts:168](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/interaction.ts#L168)

#### Returns

`this is Interaction<MessageComponent>`

***

### isApplicationCommandAutocomplete()

> **isApplicationCommandAutocomplete**(): `this is Interaction<ApplicationCommandAutocomplete>`

Defined in: [entities/interaction.ts:172](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/interaction.ts#L172)

#### Returns

`this is Interaction<ApplicationCommandAutocomplete>`

***

### isModalSubmit()

> **isModalSubmit**(): `this is Interaction<ModalSubmit>`

Defined in: [entities/interaction.ts:176](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/classes/src/entities/interaction.ts#L176)

#### Returns

`this is Interaction<ModalSubmit>`
