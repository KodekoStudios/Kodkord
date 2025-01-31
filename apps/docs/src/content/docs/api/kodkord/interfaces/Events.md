---
editUrl: false
next: false
prev: false
title: "Events"
---

Defined in: [packages/kodkord/src/core/client.ts:18](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/core/client.ts#L18)

Represents a mapping of event types to their corresponding callback functions.

This interface extends `Dictionary`, allowing each event to have a handler function
that processes the payload for that event type. The event type is inferred based on
the generic `Event`, which defaults to `GatewayDispatchEvents`.

## Extends

- [`Dictionary`](/api/kodkord/classes/dictionary/)\<`Event`, (`data`) => `unknown`\>

## Type Parameters

| Type Parameter | Default type | Description |
| ------ | ------ | ------ |
| `Event` *extends* `GatewayDispatchEvents` \| `"raw"` | `GatewayDispatchEvents` \| `"raw"` | The event type to which the handler applies. |

## Properties

### size

> `readonly` **size**: `number`

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:45

#### Returns

the number of elements in the Map.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`size`](/api/kodkord/classes/dictionary/#size)

***

### \[toStringTag\]

> `readonly` **\[toStringTag\]**: `string`

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:137

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`[toStringTag]`](/api/kodkord/classes/dictionary/#tostringtag)

***

### name

> `readonly` **name**: `string`

Defined in: [packages/kodkord/src/common/dictionary.ts:6](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/dictionary.ts#L6)

The name of the dictionary, used for identification.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`name`](/api/kodkord/classes/dictionary/#name-1)

***

### limit

> `readonly` **limit**: `number`

Defined in: [packages/kodkord/src/common/dictionary.ts:9](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/dictionary.ts#L9)

The maximum number of entries allowed in the dictionary.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`limit`](/api/kodkord/classes/dictionary/#limit-1)

## Methods

### clear()

> **clear**(): `void`

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:20

#### Returns

`void`

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`clear`](/api/kodkord/classes/dictionary/#clear)

***

### delete()

> **delete**(`key`): `boolean`

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:24

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `Event` |

#### Returns

`boolean`

true if an element in the Map existed and has been removed, or false if the element does not exist.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`delete`](/api/kodkord/classes/dictionary/#delete)

***

### forEach()

> **forEach**(`callbackfn`, `thisArg`?): `void`

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:28

Executes a provided function once per each key/value pair in the Map, in insertion order.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `callbackfn` | (`value`, `key`, `map`) => `void` |
| `thisArg`? | `any` |

#### Returns

`void`

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`forEach`](/api/kodkord/classes/dictionary/#foreach)

***

### has()

> **has**(`key`): `boolean`

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:37

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `Event` |

#### Returns

`boolean`

boolean indicating whether an element with the specified key exists or not.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`has`](/api/kodkord/classes/dictionary/#has)

***

### \[iterator\]()

> **\[iterator\]**(): `MapIterator`\<\[`Event`, (`data`) => `unknown`\]\>

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:143

Returns an iterable of entries in the map.

#### Returns

`MapIterator`\<\[`Event`, (`data`) => `unknown`\]\>

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`[iterator]`](/api/kodkord/classes/dictionary/#iterator)

***

### entries()

> **entries**(): `MapIterator`\<\[`Event`, (`data`) => `unknown`\]\>

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:148

Returns an iterable of key, value pairs for every entry in the map.

#### Returns

`MapIterator`\<\[`Event`, (`data`) => `unknown`\]\>

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`entries`](/api/kodkord/classes/dictionary/#entries)

***

### keys()

> **keys**(): `MapIterator`\<`Event`\>

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:153

Returns an iterable of keys in the map

#### Returns

`MapIterator`\<`Event`\>

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`keys`](/api/kodkord/classes/dictionary/#keys)

***

### values()

> **values**(): `MapIterator`\<(`data`) => `unknown`\>

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:158

Returns an iterable of values in the map

#### Returns

`MapIterator`\<(`data`) => `unknown`\>

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`values`](/api/kodkord/classes/dictionary/#values)

***

### filter()

> **filter**(`callback`): [`Dictionary`](/api/kodkord/classes/dictionary/)\<`Event`, (`data`) => `unknown`\>

Defined in: [packages/kodkord/src/common/dictionary.ts:52](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/dictionary.ts#L52)

Filters the entries of the dictionary based on the provided callback.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`, `key`, `dict`) => `boolean` | A function to test each entry. Returns `true` to keep the entry, `false` otherwise. |

#### Returns

[`Dictionary`](/api/kodkord/classes/dictionary/)\<`Event`, (`data`) => `unknown`\>

A new `Dictionary` with the filtered entries.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`filter`](/api/kodkord/classes/dictionary/#filter)

***

### find()

> **find**(`callback`): `undefined` \| (`data`) => `unknown`

Defined in: [packages/kodkord/src/common/dictionary.ts:66](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/dictionary.ts#L66)

Finds the first value in the dictionary that satisfies the provided callback.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`, `key`, `dict`) => `boolean` | A function to test each entry. Returns `true` for the desired entry. |

#### Returns

`undefined` \| (`data`) => `unknown`

The first value that satisfies the callback, or `undefined` if none do.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`find`](/api/kodkord/classes/dictionary/#find)

***

### every()

> **every**(`callback`): `boolean`

Defined in: [packages/kodkord/src/common/dictionary.ts:82](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/dictionary.ts#L82)

Tests whether all entries in the dictionary pass the provided callback.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`, `key`, `dict`) => `boolean` | A function to test each entry. Returns `true` for entries that pass. |

#### Returns

`boolean`

`true` if all entries pass the callback, otherwise `false`.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`every`](/api/kodkord/classes/dictionary/#every)

***

### some()

> **some**(`callback`): `boolean`

Defined in: [packages/kodkord/src/common/dictionary.ts:98](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/dictionary.ts#L98)

Tests whether at least one entry in the dictionary passes the provided callback.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`, `key`, `dict`) => `boolean` | A function to test each entry. Returns `true` for entries that pass. |

#### Returns

`boolean`

`true` if at least one entry passes the callback, otherwise `false`.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`some`](/api/kodkord/classes/dictionary/#some)

***

### reduce()

> **reduce**\<`T`\>(`callback`, `initial`): `T`

Defined in: [packages/kodkord/src/common/dictionary.ts:115](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/dictionary.ts#L115)

Reduces the dictionary's entries to a single value using the provided callback.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`accumulator`, `value`, `key`, `dict`) => `T` | A function to process each entry. |
| `initial` | `T` | The initial accumulator value. |

#### Returns

`T`

The result of the reduction.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`reduce`](/api/kodkord/classes/dictionary/#reduce)

***

### map()

> **map**\<`T`\>(`callback`): [`Dictionary`](/api/kodkord/classes/dictionary/)\<`Event`, `T`\>

Defined in: [packages/kodkord/src/common/dictionary.ts:128](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/dictionary.ts#L128)

Maps the dictionary's entries to a new `Dictionary` with transformed values.

#### Type Parameters

| Type Parameter |
| ------ |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`, `key`, `dict`) => `T` | A function to transform each entry. |

#### Returns

[`Dictionary`](/api/kodkord/classes/dictionary/)\<`Event`, `T`\>

A new `Dictionary` with the mapped values.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`map`](/api/kodkord/classes/dictionary/#map-1)

***

### first()

> **first**(): `undefined` \| (`data`) => `unknown`

Defined in: [packages/kodkord/src/common/dictionary.ts:165](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/dictionary.ts#L165)

Retrieves the first value in the dictionary.

#### Returns

`undefined` \| (`data`) => `unknown`

The first value, or `undefined` if the dictionary is empty.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`first`](/api/kodkord/classes/dictionary/#first)

***

### last()

> **last**(): `undefined` \| (`data`) => `unknown`

Defined in: [packages/kodkord/src/common/dictionary.ts:174](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/dictionary.ts#L174)

Retrieves the last value in the dictionary.

#### Returns

`undefined` \| (`data`) => `unknown`

The last value, or `undefined` if the dictionary is empty.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`last`](/api/kodkord/classes/dictionary/#last)

***

### clone()

> **clone**(): [`Dictionary`](/api/kodkord/classes/dictionary/)\<`Event`, (`data`) => `unknown`\>

Defined in: [packages/kodkord/src/common/dictionary.ts:183](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/dictionary.ts#L183)

Creates a shallow copy of the dictionary.

#### Returns

[`Dictionary`](/api/kodkord/classes/dictionary/)\<`Event`, (`data`) => `unknown`\>

A new `Dictionary` instance with the same entries, limit, and name.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`clone`](/api/kodkord/classes/dictionary/#clone)

***

### remaining()

> **remaining**(): `number`

Defined in: [packages/kodkord/src/common/dictionary.ts:192](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/dictionary.ts#L192)

Calculates the number of additional entries that can be added to the dictionary.

#### Returns

`number`

The number of remaining entries before reaching the limit.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`remaining`](/api/kodkord/classes/dictionary/#remaining)

***

### set()

> **set**\<`E`\>(`event`, `callback`): `this`

Defined in: [packages/kodkord/src/core/client.ts:27](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/core/client.ts#L27)

Sets a callback function for a specific event.

#### Type Parameters

| Type Parameter |
| ------ |
| `E` *extends* `GatewayDispatchEvents` \| `"raw"` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `E` | The event to bind the callback to. |
| `callback` | `undefined` \| (`data`) => `unknown` | The function to handle the event data. |

#### Returns

`this`

The instance of the `Events` interface, allowing method chaining.

#### Overrides

[`Dictionary`](/api/kodkord/classes/dictionary/).[`set`](/api/kodkord/classes/dictionary/#set)

***

### get()

> **get**\<`E`\>(`event`): `undefined` \| (`data`) => `unknown`

Defined in: [packages/kodkord/src/core/client.ts:42](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/core/client.ts#L42)

Gets the callback function associated with a specific event.

#### Type Parameters

| Type Parameter |
| ------ |
| `E` *extends* `GatewayDispatchEvents` \| `"raw"` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `event` | `E` | The event for which to retrieve the callback function. |

#### Returns

`undefined` \| (`data`) => `unknown`

The callback function for the event, or `undefined` if no handler is set.

#### Overrides

[`Dictionary`](/api/kodkord/classes/dictionary/).[`get`](/api/kodkord/classes/dictionary/#get)
