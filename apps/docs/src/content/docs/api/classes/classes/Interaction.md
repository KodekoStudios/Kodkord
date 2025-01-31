---
editUrl: false
next: false
prev: false
title: "Interaction"
---

Defined in: [entities/interaction.ts:22](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/interaction.ts#L22)

Represents an interaction with Discord, such as a slash command or button click.

## Extends

- [`Entity`](/api/classes/classes/entity/)\<`APIInteraction` & `object`\>

## Type Parameters

| Type Parameter |
| ------ |
| `Type` *extends* `InteractionType` |

## Constructors

### new Interaction()

> **new Interaction**\<`Type`\>(`rest`, `raw`): [`Interaction`](/api/classes/classes/interaction/)\<`Type`\>

Defined in: [entities/interaction.ts:33](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/interaction.ts#L33)

Creates an instance of the Interaction.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `rest` | `Rest` | The REST manager for making API requests. |
| `raw` | `APIInteraction` & `object` | The raw data from the API response. |

#### Returns

[`Interaction`](/api/classes/classes/interaction/)\<`Type`\>

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

> `readonly` **raw**: `APIInteraction` & `object`

Defined in: [core/entity.ts:11](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/core/entity.ts#L11)

Raw data from the API response, read-only to prevent unnecessary mutations.

#### Type declaration

##### type

> **type**: `Type`

#### Inherited from

[`Entity`](/api/classes/classes/entity/).[`raw`](/api/classes/classes/entity/#raw-1)

## Methods

### deleteResponse()

> **deleteResponse**(`body`): `Promise`\<`boolean`\>

Defined in: [entities/interaction.ts:48](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/interaction.ts#L48)

Deletes the initial response to this interaction.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `body` | `APIInteractionResponse` | The interaction response payload. |

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the response was successfully deleted, or `false` if it failed.

***

### modifyResponse()

> **modifyResponse**(`body`): `Promise`\<`boolean`\>

Defined in: [entities/interaction.ts:71](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/interaction.ts#L71)

Modifies the initial response to this interaction.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `body` | `APIInteractionResponse` | The interaction response payload. |

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if the response was successfully modified, or `false` if it failed.

***

### pong()

> **pong**(): `Promise`\<`undefined` \| `RESTPostAPIInteractionCallbackWithResponseResult`\>

Defined in: [entities/interaction.ts:93](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/interaction.ts#L93)

Sends a Pong response to a Ping interaction.

#### Returns

`Promise`\<`undefined` \| `RESTPostAPIInteractionCallbackWithResponseResult`\>

A promise resolving to the interaction callback result, or `undefined` if the interaction is not a Ping.

***

### respond()

> **respond**(`body`): `Promise`\<`undefined` \| `RESTPostAPIInteractionCallbackWithResponseResult`\>

Defined in: [entities/interaction.ts:112](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/interaction.ts#L112)

Responds to the interaction.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `body` | `APIInteractionResponse` | The interaction response payload. |

#### Returns

`Promise`\<`undefined` \| `RESTPostAPIInteractionCallbackWithResponseResult`\>

A promise resolving to the interaction callback result, or `undefined` if the interaction has already been completed or the request fails.

***

### guild()

> **guild**(): `Promise`\<`undefined` \| [`Guild`](/api/classes/classes/guild/)\>

Defined in: [entities/interaction.ts:152](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/interaction.ts#L152)

Fetches the guild associated with this interaction, if applicable.

#### Returns

`Promise`\<`undefined` \| [`Guild`](/api/classes/classes/guild/)\>

A promise resolving to an [Guild](/api/classes/api/classes/classes/guild/) instance representing the guild, or `undefined` if the interaction is not in a guild or the request fails.

***

### channel()

> **channel**(): `Promise`\<`undefined` \| [`Channel`](/api/classes/classes/channel/)\<`ChannelType`\>\>

Defined in: [entities/interaction.ts:174](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/interaction.ts#L174)

Fetches the channel associated with this interaction, if applicable.

#### Returns

`Promise`\<`undefined` \| [`Channel`](/api/classes/classes/channel/)\<`ChannelType`\>\>

A promise resolving to a [\<ChannelType\>](/api/classes/api/classes/classes/channel/) instance representing the channel, or `undefined` if the interaction is not in a channel or the request fails.

***

### user()

> **user**(): `null` \| [`User`](/api/classes/classes/user/)

Defined in: [entities/interaction.ts:200](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/interaction.ts#L200)

Retrieves the user associated with this interaction.

#### Returns

`null` \| [`User`](/api/classes/classes/user/)

A [User](/api/classes/api/classes/classes/user/) instance representing the user, or `null` if the user is not available.

***

### member()

> **member**(): `Promise`\<`null` \| [`Member`](/api/classes/classes/member/)\>

Defined in: [entities/interaction.ts:212](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/interaction.ts#L212)

Retrieves the member associated with this interaction, if applicable.

#### Returns

`Promise`\<`null` \| [`Member`](/api/classes/classes/member/)\>

A promise resolving to a [Member](/api/classes/api/classes/classes/member/) instance representing the member, or `null` if the interaction is not in a guild or the member is not available.

***

### isCompleted()

> **isCompleted**(): `boolean`

Defined in: [entities/interaction.ts:226](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/interaction.ts#L226)

Checks if the interaction has been completed.

#### Returns

`boolean`

`true` if the interaction has been completed, otherwise `false`.

***

### isPing()

> **isPing**(): `this is Interaction<Ping>`

Defined in: [entities/interaction.ts:237](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/interaction.ts#L237)

Checks if the interaction is a Ping.

#### Returns

`this is Interaction<Ping>`

***

### isApplicationCommand()

> **isApplicationCommand**(): `this is Interaction<ApplicationCommand>`

Defined in: [entities/interaction.ts:244](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/interaction.ts#L244)

Checks if the interaction is an Application Command.

#### Returns

`this is Interaction<ApplicationCommand>`

***

### isMessageComponent()

> **isMessageComponent**(): `this is Interaction<MessageComponent>`

Defined in: [entities/interaction.ts:251](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/interaction.ts#L251)

Checks if the interaction is a Message Component.

#### Returns

`this is Interaction<MessageComponent>`

***

### isApplicationCommandAutocomplete()

> **isApplicationCommandAutocomplete**(): `this is Interaction<ApplicationCommandAutocomplete>`

Defined in: [entities/interaction.ts:258](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/interaction.ts#L258)

Checks if the interaction is an Application Command Autocomplete.

#### Returns

`this is Interaction<ApplicationCommandAutocomplete>`

***

### isModalSubmit()

> **isModalSubmit**(): `this is Interaction<ModalSubmit>`

Defined in: [entities/interaction.ts:265](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/classes/src/entities/interaction.ts#L265)

Checks if the interaction is a Modal Submit.

#### Returns

`this is Interaction<ModalSubmit>`
