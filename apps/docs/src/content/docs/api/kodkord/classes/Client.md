---
editUrl: false
next: false
prev: false
title: "Client"
---

Defined in: [packages/kodkord/src/core/client.ts:66](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/client.ts#L66)

Represents the main bot client.

This class encapsulates the client settings, shard management, event handling, and
communication with the Discord API via the `Rest` class. It manages the connection
and allows interaction with the Discord Gateway.

## Constructors

### new Client()

> **new Client**(`settings`): [`Client`](/api/kodkord/classes/client/)

Defined in: [packages/kodkord/src/core/client.ts:84](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/client.ts#L84)

Creates a new client instance with the provided settings.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings` | [`ClientSettings`](/api/kodkord/type-aliases/clientsettings/) | The settings used to configure the client. |

#### Returns

[`Client`](/api/kodkord/classes/client/)

## Properties

### settings

> `readonly` **settings**: [`ClientSettings`](/api/kodkord/type-aliases/clientsettings/)

Defined in: [packages/kodkord/src/core/client.ts:68](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/client.ts#L68)

The settings used to configure the client.

***

### shards

> `readonly` **shards**: [`Sharder`](/api/kodkord/classes/sharder/)

Defined in: [packages/kodkord/src/core/client.ts:71](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/client.ts#L71)

The sharding manager responsible for handling multiple shards.

***

### events

> `readonly` **events**: [`Events`](/api/kodkord/interfaces/events/)

Defined in: [packages/kodkord/src/core/client.ts:74](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/client.ts#L74)

The event handler for managing events.

***

### rest

> `readonly` **rest**: [`Rest`](/api/kodkord/classes/rest/)

Defined in: [packages/kodkord/src/core/client.ts:77](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/client.ts#L77)

The `Rest` instance for interacting with the Discord API.

## Methods

### connect()

> **connect**(): `void`

Defined in: [packages/kodkord/src/core/client.ts:92](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/client.ts#L92)

Connects the client by establishing a connection with the Discord Gateway.

#### Returns

`void`
