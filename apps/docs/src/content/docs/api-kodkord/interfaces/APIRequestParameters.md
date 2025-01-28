---
editUrl: false
next: false
prev: false
title: "APIRequestParameters"
---

Defined in: [Kodcord/packages/kodkord/src/api/rest.ts:27](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/rest.ts#L27)

Parameters for a REST API request.

## Properties

### body?

> `optional` **body**: `unknown`

Defined in: [Kodcord/packages/kodkord/src/api/rest.ts:29](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/rest.ts#L29)

Request body as a JSON object.

***

### query?

> `optional` **query**: `Record`\<`string`, `string`\>

Defined in: [Kodcord/packages/kodkord/src/api/rest.ts:32](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/rest.ts#L32)

Query parameters to append to the request URL.

***

### reason?

> `optional` **reason**: `string`

Defined in: [Kodcord/packages/kodkord/src/api/rest.ts:35](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/rest.ts#L35)

Reason for the request, logged in Discord's audit log if applicable.
