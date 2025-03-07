---
editUrl: false
next: false
prev: false
title: "APIRequestParameters"
---

Defined in: [packages/kodkord/src/api/rest.ts:32](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/rest.ts#L32)

Parameters for a REST API request.

## Properties

### body?

> `optional` **body**: [`JSONObject`](/api/kodkord/type-aliases/jsonobject/)

Defined in: [packages/kodkord/src/api/rest.ts:34](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/rest.ts#L34)

Request body as a JSON object.

***

### query?

> `optional` **query**: `Record`\<`string`, `string`\>

Defined in: [packages/kodkord/src/api/rest.ts:37](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/rest.ts#L37)

Query parameters to append to the request URL.

***

### reason?

> `optional` **reason**: `string`

Defined in: [packages/kodkord/src/api/rest.ts:40](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/rest.ts#L40)

Reason for the request, logged in Discord's audit log if applicable.
