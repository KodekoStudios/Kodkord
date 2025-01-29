---
editUrl: false
next: false
prev: false
title: "Panic"
---

Defined in: [packages/kodkord/src/common/log.ts:149](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/common/log.ts#L149)

A log entry with a predefined "Panic" level and red background styling.

The `Panic` log entry includes an additional method for converting the log
into an `Error` object, useful for throwing or further handling.

## Extends

- [`Loggable`](/api-kodkord/classes/loggable/)

## Constructors

### new Panic()

> **new Panic**(`header`, ...`messages`): [`Panic`](/api-kodkord/classes/panic/)

Defined in: [packages/kodkord/src/common/log.ts:156](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/common/log.ts#L156)

Creates a new `Panic` log entry.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `header` | `string` | The header of the log, typically a title or identifier |
| ...`messages` | `string`[] | Additional lines or content for the log |

#### Returns

[`Panic`](/api-kodkord/classes/panic/)

#### Overrides

[`Loggable`](/api-kodkord/classes/loggable/).[`constructor`](/api-kodkord/classes/loggable/#constructors)

## Methods

### note()

> **note**(): `void`

Defined in: [packages/kodkord/src/common/log.ts:44](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/common/log.ts#L44)

Logs the message to the console as a standard note.

#### Returns

`void`

#### Inherited from

[`Loggable`](/api-kodkord/classes/loggable/).[`note`](/api-kodkord/classes/loggable/#note)

***

### trace()

> **trace**(): `void`

Defined in: [packages/kodkord/src/common/log.ts:49](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/common/log.ts#L49)

Logs the message to the console with a debug level.

#### Returns

`void`

#### Inherited from

[`Loggable`](/api-kodkord/classes/loggable/).[`trace`](/api-kodkord/classes/loggable/#trace)

***

### warn()

> **warn**(): `void`

Defined in: [packages/kodkord/src/common/log.ts:54](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/common/log.ts#L54)

Logs the message to the console as a warning.

#### Returns

`void`

#### Inherited from

[`Loggable`](/api-kodkord/classes/loggable/).[`warn`](/api-kodkord/classes/loggable/#warn)

***

### panic()

> **panic**(): `void`

Defined in: [packages/kodkord/src/common/log.ts:59](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/common/log.ts#L59)

Logs the message to the console as an error.

#### Returns

`void`

#### Inherited from

[`Loggable`](/api-kodkord/classes/loggable/).[`panic`](/api-kodkord/classes/loggable/#panic)

***

### format()

> **format**(): `string`

Defined in: [packages/kodkord/src/common/log.ts:69](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/common/log.ts#L69)

Formats the log into a styled string suitable for console output.

The format includes the log header, timestamp, and a separator.

#### Returns

`string`

A formatted log string

#### Inherited from

[`Loggable`](/api-kodkord/classes/loggable/).[`format`](/api-kodkord/classes/loggable/#format)

***

### formatLines()

> **formatLines**(): `string`

Defined in: [packages/kodkord/src/common/log.ts:86](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/common/log.ts#L86)

Formats the individual lines of the log with a consistent style.

Each line is prefixed with a vertical bar (`|`) for clarity.

#### Returns

`string`

A formatted string containing all log lines

#### Inherited from

[`Loggable`](/api-kodkord/classes/loggable/).[`formatLines`](/api-kodkord/classes/loggable/#formatlines)

***

### toError()

> **toError**(): `Error`

Defined in: [packages/kodkord/src/common/log.ts:168](https://github.com/KingsBeCattz/Kodkord/blob/5983eab654eb4f3b9082e138abddc2d7f9dac808/packages/kodkord/src/common/log.ts#L168)

Converts the log entry into an `Error` object.

The resulting `Error` will contain the concatenated lines of the log as its message.

#### Returns

`Error`

An `Error` object representing the log entry
