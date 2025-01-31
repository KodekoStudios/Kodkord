---
editUrl: false
next: false
prev: false
title: "Rest"
---

Defined in: [packages/kodkord/src/api/rest.ts:49](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/api/rest.ts#L49)

A class for managing RESTful interactions with the Discord API.

The `Rest` class provides methods to send HTTP requests to Discord's REST API.
It ensures proper rate-limiting using buckets and handles request retries when necessary.

## Constructors

### new Rest()

> **new Rest**(`settings`): [`Rest`](/api/kodkord/classes/rest/)

Defined in: [packages/kodkord/src/api/rest.ts:61](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/api/rest.ts#L61)

Creates a new `Rest` instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `settings` | `object` & [`RestSettings`](/api/kodkord/interfaces/restsettings/) | Configuration settings for the REST client. |

#### Returns

[`Rest`](/api/kodkord/classes/rest/)

## Methods

### latency()

> **latency**(`route`): `Promise`\<`number`\>

Defined in: [packages/kodkord/src/api/rest.ts:69](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/api/rest.ts#L69)

#### Parameters

| Parameter | Type | Default value |
| ------ | ------ | ------ |
| `route` | `string` | `"/users/@me"` |

#### Returns

`Promise`\<`number`\>

***

### delete()

> **delete**\<`Returns`\>(`route`, `parameters`?): `Promise`\<`Returns`\>

Defined in: [packages/kodkord/src/api/rest.ts:82](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/api/rest.ts#L82)

Sends a DELETE request to the specified API route.

#### Type Parameters

| Type Parameter |
| ------ |
| `Returns` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | `string` | API route to send the request to. |
| `parameters`? | [`APIRequestParameters`](/api/kodkord/interfaces/apirequestparameters/) | Optional parameters for the request. |

#### Returns

`Promise`\<`Returns`\>

A promise resolving to the response of the request.

***

### patch()

> **patch**\<`Returns`\>(`route`, `parameters`?): `Promise`\<`Returns`\>

Defined in: [packages/kodkord/src/api/rest.ts:93](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/api/rest.ts#L93)

Sends a PATCH request to the specified API route.

#### Type Parameters

| Type Parameter |
| ------ |
| `Returns` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | `string` | API route to send the request to. |
| `parameters`? | [`APIRequestParameters`](/api/kodkord/interfaces/apirequestparameters/) | Optional parameters for the request. |

#### Returns

`Promise`\<`Returns`\>

A promise resolving to the response of the request.

***

### post()

> **post**\<`Returns`\>(`route`, `parameters`?): `Promise`\<`Returns`\>

Defined in: [packages/kodkord/src/api/rest.ts:104](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/api/rest.ts#L104)

Sends a POST request to the specified API route.

#### Type Parameters

| Type Parameter |
| ------ |
| `Returns` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | `string` | API route to send the request to. |
| `parameters`? | [`APIRequestParameters`](/api/kodkord/interfaces/apirequestparameters/) | Optional parameters for the request. |

#### Returns

`Promise`\<`Returns`\>

A promise resolving to the response of the request.

***

### put()

> **put**\<`Returns`\>(`route`, `parameters`?): `Promise`\<`Returns`\>

Defined in: [packages/kodkord/src/api/rest.ts:115](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/api/rest.ts#L115)

Sends a PUT request to the specified API route.

#### Type Parameters

| Type Parameter |
| ------ |
| `Returns` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | `string` | API route to send the request to. |
| `parameters`? | [`APIRequestParameters`](/api/kodkord/interfaces/apirequestparameters/) | Optional parameters for the request. |

#### Returns

`Promise`\<`Returns`\>

A promise resolving to the response of the request.

***

### get()

> **get**\<`Returns`\>(`route`, `parameters`?): `Promise`\<`Returns`\>

Defined in: [packages/kodkord/src/api/rest.ts:126](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/api/rest.ts#L126)

Sends a GET request to the specified API route.

#### Type Parameters

| Type Parameter |
| ------ |
| `Returns` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | `string` | API route to send the request to. |
| `parameters`? | [`APIRequestParameters`](/api/kodkord/interfaces/apirequestparameters/) | Optional parameters for the request. |

#### Returns

`Promise`\<`Returns`\>

A promise resolving to the response of the request.

***

### request()

> **request**\<`Returns`\>(`method`, `route`, `parameters`): `Promise`\<`Returns`\>

Defined in: [packages/kodkord/src/api/rest.ts:141](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/api/rest.ts#L141)

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
| `method` | [`RequestMethod`](/api/kodkord/type-aliases/requestmethod/) | HTTP method for the request. |
| `route` | `string` | API route to send the request to. |
| `parameters` | [`APIRequestParameters`](/api/kodkord/interfaces/apirequestparameters/) | Optional parameters for the request. |

#### Returns

`Promise`\<`Returns`\>

A promise resolving to the response of the request.

***

### getBucket()

> **getBucket**(`route`): [`Bucket`](/api/kodkord/classes/bucket/)

Defined in: [packages/kodkord/src/api/rest.ts:195](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/api/rest.ts#L195)

Retrieves the rate-limiting bucket for the specified route.

If no bucket exists for the route, a new one is created.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `route` | `string` | API route for which the bucket is required. |

#### Returns

[`Bucket`](/api/kodkord/classes/bucket/)

The bucket associated with the route.
