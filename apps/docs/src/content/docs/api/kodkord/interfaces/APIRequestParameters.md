---
editUrl: false
next: false
prev: false
title: "APIRequestParameters"
---

Defined in: [packages/kodkord/src/api/rest.ts:32](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/api/rest.ts#L32)

Parameters for a REST API request.

## Properties

### body?

> `optional` **body**: [`JSONObject`](/api/kodkord/type-aliases/jsonobject/)

Defined in: [packages/kodkord/src/api/rest.ts:34](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/api/rest.ts#L34)

Request body as a JSON object.

***

### query?

> `optional` **query**: `Record`\<`string`, `string`\>

Defined in: [packages/kodkord/src/api/rest.ts:37](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/api/rest.ts#L37)

Query parameters to append to the request URL.

***

### reason?

> `optional` **reason**: `string`

Defined in: [packages/kodkord/src/api/rest.ts:40](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/api/rest.ts#L40)

Reason for the request, logged in Discord's audit log if applicable.
