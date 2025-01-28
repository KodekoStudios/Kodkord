---
editUrl: false
next: false
prev: false
title: "Loggable"
---

Defined in: [Kodcord/packages/kodkord/src/common/log.ts:14](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/common/log.ts#L14)

Provides a lightweight, extensible logging mechanism with customizable formatting.

The `Loggable` class is designed to be extended and used for temporary logging purposes,
avoiding the memory overhead of persistent logger instances. Each instance is created
when needed and goes out of scope once used, improving performance.

## Extended by

- [`Note`](/api-kodkord/classes/note/)
- [`Warn`](/api-kodkord/classes/warn/)
- [`Trace`](/api-kodkord/classes/trace/)
- [`Panic`](/api-kodkord/classes/panic/)

## Constructors

### new Loggable()

> **new Loggable**(`level`, `header`, ...`messages`): [`Loggable`](/api-kodkord/classes/loggable/)

Defined in: [Kodcord/packages/kodkord/src/common/log.ts:34](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/common/log.ts#L34)

Creates a new `Loggable` instance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `level` | `string` | The log level used to identify the type of log |
| `header` | `string` | The header of the log, typically a title or identifier |
| ...`messages` | `string`[] | Additional lines or content for the log |

#### Returns

[`Loggable`](/api-kodkord/classes/loggable/)

## Methods

### note()

> **note**(): `void`

Defined in: [Kodcord/packages/kodkord/src/common/log.ts:44](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/common/log.ts#L44)

Logs the message to the console as a standard note.

#### Returns

`void`

***

### trace()

> **trace**(): `void`

Defined in: [Kodcord/packages/kodkord/src/common/log.ts:49](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/common/log.ts#L49)

Logs the message to the console with a debug level.

#### Returns

`void`

***

### warn()

> **warn**(): `void`

Defined in: [Kodcord/packages/kodkord/src/common/log.ts:54](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/common/log.ts#L54)

Logs the message to the console as a warning.

#### Returns

`void`

***

### panic()

> **panic**(): `void`

Defined in: [Kodcord/packages/kodkord/src/common/log.ts:59](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/common/log.ts#L59)

Logs the message to the console as an error.

#### Returns

`void`

***

### format()

> **format**(): `string`

Defined in: [Kodcord/packages/kodkord/src/common/log.ts:69](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/common/log.ts#L69)

Formats the log into a styled string suitable for console output.

The format includes the log header, timestamp, and a separator.

#### Returns

`string`

A formatted log string

***

### formatLines()

> **formatLines**(): `string`

Defined in: [Kodcord/packages/kodkord/src/common/log.ts:86](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/common/log.ts#L86)

Formats the individual lines of the log with a consistent style.

Each line is prefixed with a vertical bar (`|`) for clarity.

#### Returns

`string`

A formatted string containing all log lines
