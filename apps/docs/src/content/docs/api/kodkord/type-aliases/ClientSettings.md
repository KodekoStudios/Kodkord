---
editUrl: false
next: false
prev: false
title: "ClientSettings"
---

> **ClientSettings**: `object` & [`RestSettings`](/api/kodkord/interfaces/restsettings/)

Defined in: [packages/kodkord/src/core/client.ts:57](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/client.ts#L57)

Represents the settings required to initialize a client.

This type extends `RestSettings` and adds an additional property `intents` to manage
the events the client will listen to.

## Type declaration

### intents

> **intents**: `number`
