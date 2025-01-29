---
editUrl: false
next: false
prev: false
title: "Shard"
---

Defined in: [packages/kodkord/src/core/shard.ts:19](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/core/shard.ts#L19)

Represents a single shard for handling Discord Gateway connections.

The Shard class manages an individual connection to Discord's Gateway for a specific
subset of guilds, based on Discord's sharding mechanism. It encapsulates the lifecycle
of the WebSocket connection, including connection, disconnection, and error handling.

## Constructors

### new Shard()

> **new Shard**(`client`, `id`, `settings`?): [`Shard`](/api-kodkord/classes/shard/)

Defined in: [packages/kodkord/src/core/shard.ts:47](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/core/shard.ts#L47)

Creates a new Shard instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `client` | [`Client`](/api-kodkord/classes/client/) | The parent client responsible for creating this shard. |
| `id` | `number` | The Id of the shard. |
| `settings`? | `Partial`\<[`WebSocketSettings`](/api-kodkord/interfaces/websocketsettings/)\> | Optional shard-specific settings that override the client's default WebSocket settings. |

#### Returns

[`Shard`](/api-kodkord/classes/shard/)

## Properties

### websocket

> `readonly` **websocket**: [`WebSocket`](/api-kodkord/classes/websocket/)

Defined in: [packages/kodkord/src/core/shard.ts:21](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/core/shard.ts#L21)

The WebSocket instance responsible for managing the Gateway connection.

***

### client

> `readonly` **client**: [`Client`](/api-kodkord/classes/client/)

Defined in: [packages/kodkord/src/core/shard.ts:24](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/core/shard.ts#L24)

Reference to the parent client that created this shard.

***

### id

> `readonly` **id**: `number`

Defined in: [packages/kodkord/src/core/shard.ts:27](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/core/shard.ts#L27)

The Id of this shard.

## Accessors

### rest

#### Get Signature

> **get** **rest**(): [`Rest`](/api-kodkord/classes/rest/)

Defined in: [packages/kodkord/src/core/shard.ts:177](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/core/shard.ts#L177)

Returns the REST client associated with this shard.

This provides access to the client's REST interface for making API requests.

##### Returns

[`Rest`](/api-kodkord/classes/rest/)

The REST client instance from the parent client.

## Methods

### calculateId()

> `static` **calculateId**(`guildId`, `shards`): `number`

Defined in: [packages/kodkord/src/core/shard.ts:36](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/core/shard.ts#L36)

Calculates the shard Id for a given guild based on Discord's sharding formula.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `guildId` | `string` | The Id of the guild as a string. |
| `shards` | `number` | The total number of shards. |

#### Returns

`number`

The shard Id that is responsible for the given guild.

***

### connect()

> **connect**(): `void`

Defined in: [packages/kodkord/src/core/shard.ts:65](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/core/shard.ts#L65)

Connects the shard to Discord's Gateway.

- If the shard is already connected, logs a warning and does nothing.
- Otherwise, attempts to establish a connection and logs the status.

#### Returns

`void`

***

### disconnect()

> **disconnect**(): `void`

Defined in: [packages/kodkord/src/core/shard.ts:89](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/core/shard.ts#L89)

Disconnects the shard from Discord's Gateway.

- If the shard is not connected, logs a warning and does nothing.
- Otherwise, attempts to cleanly close the connection and logs the status.

#### Returns

`void`

***

### send()

> **send**(`message`, `force`): `void`

Defined in: [packages/kodkord/src/core/shard.ts:123](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/core/shard.ts#L123)

Sends a message to the Discord gateway. Handles automatic reconnection if the shard is disconnected.

- If the shard is connected, the message is sent directly.
- Otherwise, it logs a warning and attempts reconnection if
  the `force` parameter is set to `true`.
- If reconnection fails, it logs a warning with details of the failure.

The token is masked in trace logs to ensure sensitive information is not exposed.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `message` | `GatewaySendPayload` | `undefined` | The payload to send to the Discord gateway. |
| `force` | `boolean` | `false` | Whether to attempt reconnection and resend the message if the shard is disconnected. |

#### Returns

`void`
