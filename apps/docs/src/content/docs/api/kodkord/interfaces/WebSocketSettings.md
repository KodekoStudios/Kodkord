---
editUrl: false
next: false
prev: false
title: "WebSocketSettings"
---

Defined in: [packages/kodkord/src/api/ws.ts:16](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/ws.ts#L16)

Settings required for establishing a WebSocket connection to the Discord Gateway.

## Properties

### token

> **token**: `string`

Defined in: [packages/kodkord/src/api/ws.ts:18](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/ws.ts#L18)

The bot's authentication token.

***

### intents

> **intents**: `number`

Defined in: [packages/kodkord/src/api/ws.ts:21](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/ws.ts#L21)

The bitwise value representing the Gateway intents.

***

### device

> **device**: `string`

Defined in: [packages/kodkord/src/api/ws.ts:24](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/ws.ts#L24)

The device name to be sent in the identify payload.

***

### os

> **os**: `"windows"` \| `"linux"` \| `"macos"`

Defined in: [packages/kodkord/src/api/ws.ts:27](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/ws.ts#L27)

The operating system of the host machine.

***

### events

> **events**: [`Events`](/api/kodkord/interfaces/events/)

Defined in: [packages/kodkord/src/api/ws.ts:30](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/ws.ts#L30)

Event handlers for incoming Gateway events.
