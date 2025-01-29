---
editUrl: false
next: false
prev: false
title: "Dictionary"
---

Defined in: [packages/kodkord/src/common/dictionary.ts:4](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/kodkord/src/common/dictionary.ts#L4)

A specialized extension of Map with array-like utility methods and an entry limit.

## Extends

- `Map`\<`Key`, `Type`\>

## Extended by

- [`Sharder`](/api-kodkord/classes/sharder/)
- [`Events`](/api-kodkord/interfaces/events/)

## Type Parameters

| Type Parameter |
| ------ |
| `Key` |
| `Type` |

## Constructors

### new Dictionary()

> **new Dictionary**\<`Key`, `Type`\>(`iterable`?, `limit`?, `name`?): [`Dictionary`](/api-kodkord/classes/dictionary/)\<`Key`, `Type`\>

Defined in: [packages/kodkord/src/common/dictionary.ts:20](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/kodkord/src/common/dictionary.ts#L20)

Creates a new `Dictionary` instance.

If a limit is provided and the initial iterable exceeds the limit, the dictionary will only include entries up to the limit.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `iterable`? | `Iterable`\<readonly \[`Key`, `Type`\]\> | Initial entries for the dictionary. |
| `limit`? | `number` | Maximum number of entries allowed. Defaults to Infinity. |
| `name`? | `string` | Name of the dictionary for identification. Defaults to "unknown". |

#### Returns

[`Dictionary`](/api-kodkord/classes/dictionary/)\<`Key`, `Type`\>

#### Overrides

`Map<Key, Type>.constructor`

## Properties

### size

> `readonly` **size**: `number`

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:45

#### Returns

the number of elements in the Map.

#### Inherited from

`Map.size`

***

### \[toStringTag\]

> `readonly` **\[toStringTag\]**: `string`

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:137

#### Inherited from

`Map.[toStringTag]`

***

### \[species\]

> `readonly` `static` **\[species\]**: `MapConstructor`

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:319

#### Inherited from

`Map.[species]`

***

### name

> `readonly` **name**: `string`

Defined in: [packages/kodkord/src/common/dictionary.ts:6](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/kodkord/src/common/dictionary.ts#L6)

The name of the dictionary, used for identification.

***

### limit

> `readonly` **limit**: `number`

Defined in: [packages/kodkord/src/common/dictionary.ts:9](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/kodkord/src/common/dictionary.ts#L9)

The maximum number of entries allowed in the dictionary.

## Methods

### clear()

> **clear**(): `void`

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:20

#### Returns

`void`

#### Inherited from

`Map.clear`

***

### delete()

> **delete**(`key`): `boolean`

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:24

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `Key` |

#### Returns

`boolean`

true if an element in the Map existed and has been removed, or false if the element does not exist.

#### Inherited from

`Map.delete`

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

`Map.forEach`

***

### get()

> **get**(`key`): `undefined` \| `Type`

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:33

Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `Key` |

#### Returns

`undefined` \| `Type`

Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.

#### Inherited from

`Map.get`

***

### has()

> **has**(`key`): `boolean`

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:37

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `Key` |

#### Returns

`boolean`

boolean indicating whether an element with the specified key exists or not.

#### Inherited from

`Map.has`

***

### \[iterator\]()

> **\[iterator\]**(): `MapIterator`\<\[`Key`, `Type`\]\>

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:143

Returns an iterable of entries in the map.

#### Returns

`MapIterator`\<\[`Key`, `Type`\]\>

#### Inherited from

`Map.[iterator]`

***

### entries()

> **entries**(): `MapIterator`\<\[`Key`, `Type`\]\>

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:148

Returns an iterable of key, value pairs for every entry in the map.

#### Returns

`MapIterator`\<\[`Key`, `Type`\]\>

#### Inherited from

`Map.entries`

***

### keys()

> **keys**(): `MapIterator`\<`Key`\>

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:153

Returns an iterable of keys in the map

#### Returns

`MapIterator`\<`Key`\>

#### Inherited from

`Map.keys`

***

### values()

> **values**(): `MapIterator`\<`Type`\>

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:158

Returns an iterable of values in the map

#### Returns

`MapIterator`\<`Type`\>

#### Inherited from

`Map.values`

***

### groupBy()

> `static` **groupBy**\<`K`, `T`\>(`items`, `keySelector`): `Map`\<`K`, `T`[]\>

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2024.collection.d.ts:25

Groups members of an iterable according to the return value of the passed callback.

#### Type Parameters

| Type Parameter |
| ------ |
| `K` |
| `T` |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `items` | `Iterable`\<`T`\> | An iterable. |
| `keySelector` | (`item`, `index`) => `K` | A callback which will be invoked for each item in items. |

#### Returns

`Map`\<`K`, `T`[]\>

#### Inherited from

`Map.groupBy`

***

### filter()

> **filter**(`callback`): [`Dictionary`](/api-kodkord/classes/dictionary/)\<`Key`, `Type`\>

Defined in: [packages/kodkord/src/common/dictionary.ts:52](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/kodkord/src/common/dictionary.ts#L52)

Filters the entries of the dictionary based on the provided callback.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`, `key`, `dict`) => `boolean` | A function to test each entry. Returns `true` to keep the entry, `false` otherwise. |

#### Returns

[`Dictionary`](/api-kodkord/classes/dictionary/)\<`Key`, `Type`\>

A new `Dictionary` with the filtered entries.

***

### find()

> **find**(`callback`): `undefined` \| `Type`

Defined in: [packages/kodkord/src/common/dictionary.ts:66](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/kodkord/src/common/dictionary.ts#L66)

Finds the first value in the dictionary that satisfies the provided callback.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`, `key`, `dict`) => `boolean` | A function to test each entry. Returns `true` for the desired entry. |

#### Returns

`undefined` \| `Type`

The first value that satisfies the callback, or `undefined` if none do.

***

### every()

> **every**(`callback`): `boolean`

Defined in: [packages/kodkord/src/common/dictionary.ts:82](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/kodkord/src/common/dictionary.ts#L82)

Tests whether all entries in the dictionary pass the provided callback.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`, `key`, `dict`) => `boolean` | A function to test each entry. Returns `true` for entries that pass. |

#### Returns

`boolean`

`true` if all entries pass the callback, otherwise `false`.

***

### some()

> **some**(`callback`): `boolean`

Defined in: [packages/kodkord/src/common/dictionary.ts:98](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/kodkord/src/common/dictionary.ts#L98)

Tests whether at least one entry in the dictionary passes the provided callback.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`, `key`, `dict`) => `boolean` | A function to test each entry. Returns `true` for entries that pass. |

#### Returns

`boolean`

`true` if at least one entry passes the callback, otherwise `false`.

***

### reduce()

> **reduce**\<`T`\>(`callback`, `initial`): `T`

Defined in: [packages/kodkord/src/common/dictionary.ts:115](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/kodkord/src/common/dictionary.ts#L115)

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

***

### map()

> **map**\<`T`\>(`callback`): [`Dictionary`](/api-kodkord/classes/dictionary/)\<`Key`, `T`\>

Defined in: [packages/kodkord/src/common/dictionary.ts:128](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/kodkord/src/common/dictionary.ts#L128)

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

[`Dictionary`](/api-kodkord/classes/dictionary/)\<`Key`, `T`\>

A new `Dictionary` with the mapped values.

***

### set()

> **set**(`key`, `value`): `this`

Defined in: [packages/kodkord/src/common/dictionary.ts:145](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/kodkord/src/common/dictionary.ts#L145)

Adds or updates an entry in the dictionary.

If the dictionary has reached its limit, the entry will not be added.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `Key` | The key of the entry. |
| `value` | `Type` | The value of the entry. |

#### Returns

`this`

The current dictionary instance.

#### Overrides

`Map.set`

***

### first()

> **first**(): `undefined` \| `Type`

Defined in: [packages/kodkord/src/common/dictionary.ts:165](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/kodkord/src/common/dictionary.ts#L165)

Retrieves the first value in the dictionary.

#### Returns

`undefined` \| `Type`

The first value, or `undefined` if the dictionary is empty.

***

### last()

> **last**(): `undefined` \| `Type`

Defined in: [packages/kodkord/src/common/dictionary.ts:174](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/kodkord/src/common/dictionary.ts#L174)

Retrieves the last value in the dictionary.

#### Returns

`undefined` \| `Type`

The last value, or `undefined` if the dictionary is empty.

***

### clone()

> **clone**(): [`Dictionary`](/api-kodkord/classes/dictionary/)\<`Key`, `Type`\>

Defined in: [packages/kodkord/src/common/dictionary.ts:183](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/kodkord/src/common/dictionary.ts#L183)

Creates a shallow copy of the dictionary.

#### Returns

[`Dictionary`](/api-kodkord/classes/dictionary/)\<`Key`, `Type`\>

A new `Dictionary` instance with the same entries, limit, and name.

***

### remaining()

> **remaining**(): `number`

Defined in: [packages/kodkord/src/common/dictionary.ts:192](https://github.com/KingsBeCattz/Kodkord/blob/d60ae5f731db3a8ab6bde538c1e575cda7085372/packages/kodkord/src/common/dictionary.ts#L192)

Calculates the number of additional entries that can be added to the dictionary.

#### Returns

`number`

The number of remaining entries before reaching the limit.
