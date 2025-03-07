---
editUrl: false
next: false
prev: false
title: "WebSocket"
---

Defined in: [packages/kodkord/src/api/ws.ts:41](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/ws.ts#L41)

Manages the WebSocket connection to the Discord Gateway.

The `WebSocket` class handles the low-level communication with the Discord Gateway,
including sending the initial identify payload, responding to heartbeats, and
processing incoming Gateway events. It ensures the connection remains active and
will automatically attempt to reconnect in case of disconnections.

## Constructors

### new WebSocket()

> **new WebSocket**(`settings`): [`WebSocket`](/api/kodkord/classes/websocket/)

Defined in: [packages/kodkord/src/api/ws.ts:61](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/ws.ts#L61)

Creates a new `WebSocket` instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings` | [`WebSocketSettings`](/api/kodkord/interfaces/websocketsettings/) | The settings required to establish a WebSocket connection. |

#### Returns

[`WebSocket`](/api/kodkord/classes/websocket/)

## Properties

### settings

> `readonly` **settings**: [`WebSocketSettings`](/api/kodkord/interfaces/websocketsettings/)

Defined in: [packages/kodkord/src/api/ws.ts:54](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/ws.ts#L54)

Configuration settings for the WebSocket connection.

## Methods

### connect()

> **connect**(): `void`

Defined in: [packages/kodkord/src/api/ws.ts:72](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/ws.ts#L72)

Establishes a WebSocket connection to the Discord Gateway.

- Sets up event listeners for handling incoming messages, connection lifecycle events, and errors.
- Automatically sends the identify payload upon successful connection.
- Begins sending periodic heartbeats upon receiving the "Hello" event from the Gateway.

#### Returns

`void`

***

### disconnect()

> **disconnect**(): `void`

Defined in: [packages/kodkord/src/api/ws.ts:144](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/ws.ts#L144)

Disconnects the WebSocket connection and clears resources.

- Stops the heartbeat interval.
- Removes all event listeners from the WebSocket instance.
- Closes the WebSocket connection.

#### Returns

`void`

***

### identify()

> **identify**(): `void`

Defined in: [packages/kodkord/src/api/ws.ts:163](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/ws.ts#L163)

Sends the identify payload to the Discord Gateway.

This payload contains the bot's token, intents, and client properties. It is required
to authenticate the connection and begin receiving events.

#### Returns

`void`

***

### send()

> **send**(`message`): `void`

Defined in: [packages/kodkord/src/api/ws.ts:185](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/ws.ts#L185)

Sends a message through the WebSocket connection.

This method serializes the provided payload into a JSON string

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `message` | `GatewaySendPayload` | The payload to send through the WebSocket. |

#### Returns

`void`

***

### disconnected()

> **disconnected**(): `boolean`

Defined in: [packages/kodkord/src/api/ws.ts:194](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/ws.ts#L194)

Checks if the WebSocket connection is closed.

#### Returns

`boolean`

`true` if the WebSocket connection is closed, otherwise `false`.

***

### connected()

> **connected**(): `boolean`

Defined in: [packages/kodkord/src/api/ws.ts:203](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/ws.ts#L203)

Checks if the WebSocket connection is established.

#### Returns

`boolean`

`true` if the WebSocket connection is open, otherwise `false`.
