---
editUrl: false
next: false
prev: false
title: "Interaction"
---

Defined in: [entities/interaction.ts:20](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/interaction.ts#L20)

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

Defined in: [entities/interaction.ts:25](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/interaction.ts#L25)

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

Defined in: [core/entity.ts:8](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/core/entity.ts#L8)

The `Rest` instance for interacting with the Discord API.

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`rest`](/api-classes/classes/entity/#rest-1)

***

### raw

> `readonly` **raw**: `APIInteraction` & `object`

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Type declaration

##### type

> **type**: `Type`

#### Inherited from

[`Entity`](/api-classes/classes/entity/).[`raw`](/api-classes/classes/entity/#raw-1)

## Methods

### deleteResponse()

> **deleteResponse**(`body`): `Promise`\<`boolean`\>

Defined in: [entities/interaction.ts:30](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/interaction.ts#L30)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `body` | `APIInteractionResponse` |

#### Returns

`Promise`\<`boolean`\>

***

### modifyResponse()

> **modifyResponse**(`body`): `Promise`\<`boolean`\>

Defined in: [entities/interaction.ts:47](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/interaction.ts#L47)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `body` | `APIInteractionResponse` |

#### Returns

`Promise`\<`boolean`\>

***

### pong()

> **pong**(): `Promise`\<`undefined` \| `RESTPostAPIInteractionCallbackWithResponseResult`\>

Defined in: [entities/interaction.ts:72](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/interaction.ts#L72)

#### Returns

`Promise`\<`undefined` \| `RESTPostAPIInteractionCallbackWithResponseResult`\>

***

### respond()

> **respond**(`body`): `Promise`\<`undefined` \| `RESTPostAPIInteractionCallbackWithResponseResult`\>

Defined in: [entities/interaction.ts:85](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/interaction.ts#L85)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `body` | `APIInteractionResponse` |

#### Returns

`Promise`\<`undefined` \| `RESTPostAPIInteractionCallbackWithResponseResult`\>

***

### guild()

> **guild**(): `Promise`\<`undefined` \| [`Entity`](/api-classes/classes/entity/)\<`APIGuild`\>\>

Defined in: [entities/interaction.ts:116](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/interaction.ts#L116)

#### Returns

`Promise`\<`undefined` \| [`Entity`](/api-classes/classes/entity/)\<`APIGuild`\>\>

***

### channel()

> **channel**(): `Promise`\<`undefined` \| [`Channel`](/api-classes/classes/channel/)\<`ChannelType`\>\>

Defined in: [entities/interaction.ts:133](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/interaction.ts#L133)

#### Returns

`Promise`\<`undefined` \| [`Channel`](/api-classes/classes/channel/)\<`ChannelType`\>\>

***

### user()

> **user**(): `null` \| [`User`](/api-classes/classes/user/)

Defined in: [entities/interaction.ts:150](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/interaction.ts#L150)

#### Returns

`null` \| [`User`](/api-classes/classes/user/)

***

### member()

> **member**(): `Promise`\<`null` \| [`Member`](/api-classes/classes/member/)\>

Defined in: [entities/interaction.ts:157](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/interaction.ts#L157)

#### Returns

`Promise`\<`null` \| [`Member`](/api-classes/classes/member/)\>

***

### isCompleted()

> **isCompleted**(): `boolean`

Defined in: [entities/interaction.ts:166](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/interaction.ts#L166)

#### Returns

`boolean`

***

### isPing()

> **isPing**(): `this is Interaction<Ping>`

Defined in: [entities/interaction.ts:170](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/interaction.ts#L170)

#### Returns

`this is Interaction<Ping>`

***

### isApplicationCommand()

> **isApplicationCommand**(): `this is Interaction<ApplicationCommand>`

Defined in: [entities/interaction.ts:174](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/interaction.ts#L174)

#### Returns

`this is Interaction<ApplicationCommand>`

***

### isMessageComponent()

> **isMessageComponent**(): `this is Interaction<MessageComponent>`

Defined in: [entities/interaction.ts:178](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/interaction.ts#L178)

#### Returns

`this is Interaction<MessageComponent>`

***

### isApplicationCommandAutocomplete()

> **isApplicationCommandAutocomplete**(): `this is Interaction<ApplicationCommandAutocomplete>`

Defined in: [entities/interaction.ts:182](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/interaction.ts#L182)

#### Returns

`this is Interaction<ApplicationCommandAutocomplete>`

***

### isModalSubmit()

> **isModalSubmit**(): `this is Interaction<ModalSubmit>`

Defined in: [entities/interaction.ts:186](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/classes/src/entities/interaction.ts#L186)

#### Returns

`this is Interaction<ModalSubmit>`
