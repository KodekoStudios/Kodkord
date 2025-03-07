---
editUrl: false
next: false
prev: false
title: "Sharder"
---

Defined in: [packages/kodkord/src/core/sharder.ts:16](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/sharder.ts#L16)

The Sharder class manages multiple shards for connecting to Discord's Gateway.

It extends a `Dictionary` to map shard ids to their respective `Shard` instances. This
class provides utilities to create, manage, and control the lifecycle of shards, enabling
efficient sharding for large bots.

## Extends

- [`Dictionary`](/api/kodkord/classes/dictionary/)\<`number`, [`Shard`](/api/kodkord/classes/shard/)\>

## Constructors

### new Sharder()

> **new Sharder**(`client`): [`Sharder`](/api/kodkord/classes/sharder/)

Defined in: [packages/kodkord/src/core/sharder.ts:25](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/sharder.ts#L25)

Creates a new Sharder instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `client` | [`Client`](/api/kodkord/classes/client/) | The client that owns the sharder and its shards. |

#### Returns

[`Sharder`](/api/kodkord/classes/sharder/)

#### Overrides

[`Dictionary`](/api/kodkord/classes/dictionary/).[`constructor`](/api/kodkord/classes/dictionary/#constructors)

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

### \[species\]

> `readonly` `static` **\[species\]**: `MapConstructor`

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:319

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`[species]`](/api/kodkord/classes/dictionary/#species)

***

### name

> `readonly` **name**: `string`

Defined in: [packages/kodkord/src/common/dictionary.ts:6](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/common/dictionary.ts#L6)

The name of the dictionary, used for identification.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`name`](/api/kodkord/classes/dictionary/#name-1)

***

### limit

> `readonly` **limit**: `number`

Defined in: [packages/kodkord/src/common/dictionary.ts:9](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/common/dictionary.ts#L9)

The maximum number of entries allowed in the dictionary.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`limit`](/api/kodkord/classes/dictionary/#limit-1)

***

### client

> `readonly` **client**: [`Client`](/api/kodkord/classes/client/)

Defined in: [packages/kodkord/src/core/sharder.ts:18](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/sharder.ts#L18)

The client instance that owns this sharder.

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
| `key` | `number` |

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

### get()

> **get**(`key`): `undefined` \| [`Shard`](/api/kodkord/classes/shard/)

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:33

Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `number` |

#### Returns

`undefined` \| [`Shard`](/api/kodkord/classes/shard/)

Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`get`](/api/kodkord/classes/dictionary/#get)

***

### has()

> **has**(`key`): `boolean`

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.collection.d.ts:37

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `key` | `number` |

#### Returns

`boolean`

boolean indicating whether an element with the specified key exists or not.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`has`](/api/kodkord/classes/dictionary/#has)

***

### \[iterator\]()

> **\[iterator\]**(): `MapIterator`\<\[`number`, [`Shard`](/api/kodkord/classes/shard/)\]\>

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:143

Returns an iterable of entries in the map.

#### Returns

`MapIterator`\<\[`number`, [`Shard`](/api/kodkord/classes/shard/)\]\>

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`[iterator]`](/api/kodkord/classes/dictionary/#iterator)

***

### entries()

> **entries**(): `MapIterator`\<\[`number`, [`Shard`](/api/kodkord/classes/shard/)\]\>

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:148

Returns an iterable of key, value pairs for every entry in the map.

#### Returns

`MapIterator`\<\[`number`, [`Shard`](/api/kodkord/classes/shard/)\]\>

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`entries`](/api/kodkord/classes/dictionary/#entries)

***

### keys()

> **keys**(): `MapIterator`\<`number`\>

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:153

Returns an iterable of keys in the map

#### Returns

`MapIterator`\<`number`\>

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`keys`](/api/kodkord/classes/dictionary/#keys)

***

### values()

> **values**(): `MapIterator`\<[`Shard`](/api/kodkord/classes/shard/)\>

Defined in: apps/docs/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:158

Returns an iterable of values in the map

#### Returns

`MapIterator`\<[`Shard`](/api/kodkord/classes/shard/)\>

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`values`](/api/kodkord/classes/dictionary/#values)

***

### filter()

> **filter**(`callback`): [`Dictionary`](/api/kodkord/classes/dictionary/)\<`number`, [`Shard`](/api/kodkord/classes/shard/)\>

Defined in: [packages/kodkord/src/common/dictionary.ts:52](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/common/dictionary.ts#L52)

Filters the entries of the dictionary based on the provided callback.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`, `key`, `dict`) => `boolean` | A function to test each entry. Returns `true` to keep the entry, `false` otherwise. |

#### Returns

[`Dictionary`](/api/kodkord/classes/dictionary/)\<`number`, [`Shard`](/api/kodkord/classes/shard/)\>

A new `Dictionary` with the filtered entries.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`filter`](/api/kodkord/classes/dictionary/#filter)

***

### find()

> **find**(`callback`): `undefined` \| [`Shard`](/api/kodkord/classes/shard/)

Defined in: [packages/kodkord/src/common/dictionary.ts:66](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/common/dictionary.ts#L66)

Finds the first value in the dictionary that satisfies the provided callback.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `callback` | (`value`, `key`, `dict`) => `boolean` | A function to test each entry. Returns `true` for the desired entry. |

#### Returns

`undefined` \| [`Shard`](/api/kodkord/classes/shard/)

The first value that satisfies the callback, or `undefined` if none do.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`find`](/api/kodkord/classes/dictionary/#find)

***

### every()

> **every**(`callback`): `boolean`

Defined in: [packages/kodkord/src/common/dictionary.ts:82](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/common/dictionary.ts#L82)

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

Defined in: [packages/kodkord/src/common/dictionary.ts:98](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/common/dictionary.ts#L98)

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

Defined in: [packages/kodkord/src/common/dictionary.ts:115](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/common/dictionary.ts#L115)

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

> **map**\<`T`\>(`callback`): [`Dictionary`](/api/kodkord/classes/dictionary/)\<`number`, `T`\>

Defined in: [packages/kodkord/src/common/dictionary.ts:128](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/common/dictionary.ts#L128)

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

[`Dictionary`](/api/kodkord/classes/dictionary/)\<`number`, `T`\>

A new `Dictionary` with the mapped values.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`map`](/api/kodkord/classes/dictionary/#map-1)

***

### set()

> **set**(`key`, `value`): `this`

Defined in: [packages/kodkord/src/common/dictionary.ts:145](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/common/dictionary.ts#L145)

Adds or updates an entry in the dictionary.

If the dictionary has reached its limit, the entry will not be added.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `key` | `number` | The key of the entry. |
| `value` | [`Shard`](/api/kodkord/classes/shard/) | The value of the entry. |

#### Returns

`this`

The current dictionary instance.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`set`](/api/kodkord/classes/dictionary/#set)

***

### first()

> **first**(): `undefined` \| [`Shard`](/api/kodkord/classes/shard/)

Defined in: [packages/kodkord/src/common/dictionary.ts:165](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/common/dictionary.ts#L165)

Retrieves the first value in the dictionary.

#### Returns

`undefined` \| [`Shard`](/api/kodkord/classes/shard/)

The first value, or `undefined` if the dictionary is empty.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`first`](/api/kodkord/classes/dictionary/#first)

***

### last()

> **last**(): `undefined` \| [`Shard`](/api/kodkord/classes/shard/)

Defined in: [packages/kodkord/src/common/dictionary.ts:174](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/common/dictionary.ts#L174)

Retrieves the last value in the dictionary.

#### Returns

`undefined` \| [`Shard`](/api/kodkord/classes/shard/)

The last value, or `undefined` if the dictionary is empty.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`last`](/api/kodkord/classes/dictionary/#last)

***

### clone()

> **clone**(): [`Dictionary`](/api/kodkord/classes/dictionary/)\<`number`, [`Shard`](/api/kodkord/classes/shard/)\>

Defined in: [packages/kodkord/src/common/dictionary.ts:183](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/common/dictionary.ts#L183)

Creates a shallow copy of the dictionary.

#### Returns

[`Dictionary`](/api/kodkord/classes/dictionary/)\<`number`, [`Shard`](/api/kodkord/classes/shard/)\>

A new `Dictionary` instance with the same entries, limit, and name.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`clone`](/api/kodkord/classes/dictionary/#clone)

***

### remaining()

> **remaining**(): `number`

Defined in: [packages/kodkord/src/common/dictionary.ts:192](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/common/dictionary.ts#L192)

Calculates the number of additional entries that can be added to the dictionary.

#### Returns

`number`

The number of remaining entries before reaching the limit.

#### Inherited from

[`Dictionary`](/api/kodkord/classes/dictionary/).[`remaining`](/api/kodkord/classes/dictionary/#remaining)

***

### create()

> **create**(`id`, `settings`?): [`Shard`](/api/kodkord/classes/shard/)

Defined in: [packages/kodkord/src/core/sharder.ts:40](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/sharder.ts#L40)

Creates a new shard with the given Id.

- If a shard with the specified Id already exists, logs a panic and returns the existing shard.
- Otherwise, it creates a new shard, stores it in the dictionary, and returns it.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `number` | The Id of the shard to create. |
| `settings`? | `Partial`\<[`WebSocketSettings`](/api/kodkord/interfaces/websocketsettings/)\> | Optional settings to override default shard configurations. |

#### Returns

[`Shard`](/api/kodkord/classes/shard/)

The newly created or existing shard.

***

### guildShardId()

> **guildShardId**(`guildId`): `Promise`\<`number`\>

Defined in: [packages/kodkord/src/core/sharder.ts:58](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/sharder.ts#L58)

Calculates the shard ID responsible for a specific guild.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `guildId` | `string` | The ID of the guild. |

#### Returns

`Promise`\<`number`\>

A Promise resolving to the shard ID.

***

### reashard()

> **reashard**(`shards`): `void`

Defined in: [packages/kodkord/src/core/sharder.ts:72](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/sharder.ts#L72)

Adjusts the number of shards dynamically.

- If the new shard count is less than the current count, logs a panic and does nothing.
- Otherwise, creates additional shards as needed to match the new count.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `shards` | `number` | The new number of shards. |

#### Returns

`void`

***

### forceIdentify()

> **forceIdentify**(`id`): `void`

Defined in: [packages/kodkord/src/core/sharder.ts:94](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/sharder.ts#L94)

Forces a specific shard to identify and reconnect to the Gateway.

- If the shard doesn't exist, it creates the shard first.
- If the shard is disconnected, it connects and identifies the shard.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `id` | `number` | The Id of the shard to force identification for. |

#### Returns

`void`

***

### connect()

> **connect**(): `void`

Defined in: [packages/kodkord/src/core/sharder.ts:111](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/sharder.ts#L111)

Connects all shards to Discord's Gateway.

Iterates over all stored shards and invokes their `connect` method.

#### Returns

`void`

***

### reconnet()

> **reconnet**(): `void`

Defined in: [packages/kodkord/src/core/sharder.ts:123](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/sharder.ts#L123)

Reconnects all shards to Discord's Gateway.

- Disconnects each shard.
- Reconnects each shard.

#### Returns

`void`

***

### disconnect()

> **disconnect**(): `void`

Defined in: [packages/kodkord/src/core/sharder.ts:135](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/core/sharder.ts#L135)

Disconnects all shards from Discord's Gateway.

Iterates over all stored shards and invokes their `disconnect` method.

#### Returns

`void`
