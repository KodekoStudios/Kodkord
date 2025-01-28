---
editUrl: false
next: false
prev: false
title: "WebSocketSettings"
---

Defined in: [Kodcord/packages/kodkord/src/api/ws.ts:16](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/ws.ts#L16)

Settings required for establishing a WebSocket connection to the Discord Gateway.

## Properties

### token

> **token**: `string`

Defined in: [Kodcord/packages/kodkord/src/api/ws.ts:18](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/ws.ts#L18)

The bot's authentication token.

***

### intents

> **intents**: `number`

Defined in: [Kodcord/packages/kodkord/src/api/ws.ts:21](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/ws.ts#L21)

The bitwise value representing the Gateway intents.

***

### device

> **device**: `string`

Defined in: [Kodcord/packages/kodkord/src/api/ws.ts:24](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/ws.ts#L24)

The device name to be sent in the identify payload.

***

### os

> **os**: `"windows"` \| `"linux"` \| `"macos"`

Defined in: [Kodcord/packages/kodkord/src/api/ws.ts:27](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/ws.ts#L27)

The operating system of the host machine.

***

### events

> **events**: [`Events`](/api-kodkord/interfaces/events/)

Defined in: [Kodcord/packages/kodkord/src/api/ws.ts:30](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/ws.ts#L30)

Event handlers for incoming Gateway events.
