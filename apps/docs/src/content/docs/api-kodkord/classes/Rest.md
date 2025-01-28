---
editUrl: false
next: false
prev: false
title: "Rest"
---

Defined in: [Kodcord/packages/kodkord/src/api/rest.ts:44](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/rest.ts#L44)

A class for managing RESTful interactions with the Discord API.

The `Rest` class provides methods to send HTTP requests to Discord's REST API.
It ensures proper rate-limiting using buckets and handles request retries when necessary.

## Constructors

### new Rest()

> **new Rest**(`settings`): [`Rest`](/api-kodkord/classes/rest/)

Defined in: [Kodcord/packages/kodkord/src/api/rest.ts:56](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/rest.ts#L56)

Creates a new `Rest` instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings` | `object` & [`RestSettings`](/api-kodkord/interfaces/restsettings/) | Configuration settings for the REST client. |

#### Returns

[`Rest`](/api-kodkord/classes/rest/)

## Methods

### latency()

> **latency**(`route`): `Promise`\<`number`\>

Defined in: [Kodcord/packages/kodkord/src/api/rest.ts:64](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/rest.ts#L64)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `route` | `string` | `"/users/@me"` |

#### Returns

`Promise`\<`number`\>

***

### delete()

> **delete**\<`Returns`\>(`route`, `parameters`?): `Promise`\<`Returns`\>

Defined in: [Kodcord/packages/kodkord/src/api/rest.ts:77](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/rest.ts#L77)

Sends a DELETE request to the specified API route.

#### Type Parameters

| Type Parameter |
| ------ |
| `Returns` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | `string` | API route to send the request to. |
| `parameters`? | [`APIRequestParameters`](/api-kodkord/interfaces/apirequestparameters/) | Optional parameters for the request. |

#### Returns

`Promise`\<`Returns`\>

A promise resolving to the response of the request.

***

### patch()

> **patch**\<`Returns`\>(`route`, `parameters`?): `Promise`\<`Returns`\>

Defined in: [Kodcord/packages/kodkord/src/api/rest.ts:88](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/rest.ts#L88)

Sends a PATCH request to the specified API route.

#### Type Parameters

| Type Parameter |
| ------ |
| `Returns` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | `string` | API route to send the request to. |
| `parameters`? | [`APIRequestParameters`](/api-kodkord/interfaces/apirequestparameters/) | Optional parameters for the request. |

#### Returns

`Promise`\<`Returns`\>

A promise resolving to the response of the request.

***

### post()

> **post**\<`Returns`\>(`route`, `parameters`?): `Promise`\<`Returns`\>

Defined in: [Kodcord/packages/kodkord/src/api/rest.ts:99](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/rest.ts#L99)

Sends a POST request to the specified API route.

#### Type Parameters

| Type Parameter |
| ------ |
| `Returns` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | `string` | API route to send the request to. |
| `parameters`? | [`APIRequestParameters`](/api-kodkord/interfaces/apirequestparameters/) | Optional parameters for the request. |

#### Returns

`Promise`\<`Returns`\>

A promise resolving to the response of the request.

***

### put()

> **put**\<`Returns`\>(`route`, `parameters`?): `Promise`\<`Returns`\>

Defined in: [Kodcord/packages/kodkord/src/api/rest.ts:110](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/rest.ts#L110)

Sends a PUT request to the specified API route.

#### Type Parameters

| Type Parameter |
| ------ |
| `Returns` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | `string` | API route to send the request to. |
| `parameters`? | [`APIRequestParameters`](/api-kodkord/interfaces/apirequestparameters/) | Optional parameters for the request. |

#### Returns

`Promise`\<`Returns`\>

A promise resolving to the response of the request.

***

### get()

> **get**\<`Returns`\>(`route`, `parameters`?): `Promise`\<`Returns`\>

Defined in: [Kodcord/packages/kodkord/src/api/rest.ts:121](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/rest.ts#L121)

Sends a GET request to the specified API route.

#### Type Parameters

| Type Parameter |
| ------ |
| `Returns` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | `string` | API route to send the request to. |
| `parameters`? | [`APIRequestParameters`](/api-kodkord/interfaces/apirequestparameters/) | Optional parameters for the request. |

#### Returns

`Promise`\<`Returns`\>

A promise resolving to the response of the request.

***

### request()

> **request**\<`Returns`\>(`method`, `route`, `parameters`): `Promise`\<`Returns`\>

Defined in: [Kodcord/packages/kodkord/src/api/rest.ts:136](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/rest.ts#L136)

Sends a request to the Discord API.

- Applies rate limits using buckets based on the API route.
- Automatically constructs headers and appends query parameters if provided.

#### Type Parameters

| Type Parameter |
| ------ |
| `Returns` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `method` | [`RequestMethod`](/api-kodkord/type-aliases/requestmethod/) | HTTP method for the request. |
| `route` | `string` | API route to send the request to. |
| `parameters` | [`APIRequestParameters`](/api-kodkord/interfaces/apirequestparameters/) | Optional parameters for the request. |

#### Returns

`Promise`\<`Returns`\>

A promise resolving to the response of the request.

***

### getBucket()

> **getBucket**(`route`): [`Bucket`](/api-kodkord/classes/bucket/)

Defined in: [Kodcord/packages/kodkord/src/api/rest.ts:190](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/api/rest.ts#L190)

Retrieves the rate-limiting bucket for the specified route.

If no bucket exists for the route, a new one is created.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | `string` | API route for which the bucket is required. |

#### Returns

[`Bucket`](/api-kodkord/classes/bucket/)

The bucket associated with the route.
