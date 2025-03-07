---
editUrl: false
next: false
prev: false
title: "Bucket"
---

Defined in: [packages/kodkord/src/api/bucket.ts:14](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/bucket.ts#L14)

A rate-limit-aware task processor.

Processes tasks in order while respecting a specific rate limit. Used primarily for API calls requiring rate-limit management, such as Discord's API.

## Constructors

### new Bucket()

> **new Bucket**(`limit`, `reset`): [`Bucket`](/api/kodkord/classes/bucket/)

Defined in: [packages/kodkord/src/api/bucket.ts:36](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/bucket.ts#L36)

Creates a new `Bucket` instance.

#### Parameters

| Parameter | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `limit` | `number` | `1` | Maximum number of tasks allowed in the rate limit window. Defaults to 1. |
| `reset` | `number` | `...` | Initial timestamp when the rate limit window resets. Defaults to the current time. |

#### Returns

[`Bucket`](/api/kodkord/classes/bucket/)

## Properties

### remaining

> **remaining**: `number`

Defined in: [packages/kodkord/src/api/bucket.ts:22](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/bucket.ts#L22)

Remaining requests in the current rate limit window.

***

### limit

> **limit**: `number`

Defined in: [packages/kodkord/src/api/bucket.ts:25](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/bucket.ts#L25)

Maximum number of requests allowed per rate limit window.

***

### reset

> **reset**: `number`

Defined in: [packages/kodkord/src/api/bucket.ts:28](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/bucket.ts#L28)

Timestamp when the current rate limit window resets.

## Methods

### process()

> **process**(): `Promise`\<`void`\>

Defined in: [packages/kodkord/src/api/bucket.ts:52](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/bucket.ts#L52)

Processes tasks in the queue while respecting the rate limit.

If the rate limit is reached, waits until the reset time before continuing.

#### Returns

`Promise`\<`void`\>

Resolves when all tasks in the queue are processed.

***

### add()

> **add**\<`Type`\>(`task`, `at`?): `Promise`\<`void`\>

Defined in: [packages/kodkord/src/api/bucket.ts:88](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/bucket.ts#L88)

Adds a new task to the queue.

If a position is provided, the task will be inserted at that position in the queue. Otherwise, it is added to the end.

#### Type Parameters

| Type Parameter |
| ------ |
| `Type` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `task` | [`Task`](/api/kodkord/type-aliases/task/)\<`Type`\> | The task to add. |
| `at`? | `number` | Optional position to insert the task in the queue. |

#### Returns

`Promise`\<`void`\>

***

### resetState()

> **resetState**(): `void`

Defined in: [packages/kodkord/src/api/bucket.ts:103](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/bucket.ts#L103)

Resets the state of the bucket.

Clears the task queue, resets rate-limit counters, and marks the bucket as ready to process tasks.

#### Returns

`void`

***

### pause()

> **pause**(): `void`

Defined in: [packages/kodkord/src/api/bucket.ts:111](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/bucket.ts#L111)

Pauses task processing.

#### Returns

`void`

***

### resume()

> **resume**(): `Promise`\<`void`\>

Defined in: [packages/kodkord/src/api/bucket.ts:120](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/api/bucket.ts#L120)

Resumes task processing if paused.

Tasks in the queue will start processing again.

#### Returns

`Promise`\<`void`\>
