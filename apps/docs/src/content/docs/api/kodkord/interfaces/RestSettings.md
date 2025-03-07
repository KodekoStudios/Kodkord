---
editUrl: false
next: false
prev: false
title: "RestSettings"
---

Defined in: [packages/kodkord/src/api/rest.ts:12](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/rest.ts#L12)

Configuration settings for the `Rest` class.

## Properties

### baseURL?

> `optional` **baseURL**: `string`

Defined in: [packages/kodkord/src/api/rest.ts:14](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/rest.ts#L14)

Base URL for API requests. Defaults to Discord's API base URL.

***

### token

> **token**: `string`

Defined in: [packages/kodkord/src/api/rest.ts:17](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/rest.ts#L17)

Authorization token for the bot or application.

***

### type?

> `optional` **type**: `"Bearer"` \| `"Bot"`

Defined in: [packages/kodkord/src/api/rest.ts:20](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/rest.ts#L20)

Type of authorization token, defaults to "Bot".

***

### agent?

> `optional` **agent**: `string`

Defined in: [packages/kodkord/src/api/rest.ts:23](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/rest.ts#L23)

User-Agent header to identify the client.
