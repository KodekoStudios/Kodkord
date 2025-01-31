---
editUrl: false
next: false
prev: false
title: "Warn"
---

Defined in: [packages/kodkord/src/common/log.ts:113](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/log.ts#L113)

A log entry with a predefined "Warning" level and yellow background styling.

## Extends

- [`Loggable`](/api/kodkord/classes/loggable/)

## Constructors

### new Warn()

> **new Warn**(`header`, ...`messages`): [`Warn`](/api/kodkord/classes/warn/)

Defined in: [packages/kodkord/src/common/log.ts:120](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/log.ts#L120)

Creates a new `Warn` log entry.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `header` | `string` | The header of the log, typically a title or identifier |
| ...`messages` | `string`[] | Additional lines or content for the log |

#### Returns

[`Warn`](/api/kodkord/classes/warn/)

#### Overrides

[`Loggable`](/api/kodkord/classes/loggable/).[`constructor`](/api/kodkord/classes/loggable/#constructors)

## Methods

### note()

> **note**(): `void`

Defined in: [packages/kodkord/src/common/log.ts:44](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/log.ts#L44)

Logs the message to the console as a standard note.

#### Returns

`void`

#### Inherited from

[`Loggable`](/api/kodkord/classes/loggable/).[`note`](/api/kodkord/classes/loggable/#note)

***

### trace()

> **trace**(): `void`

Defined in: [packages/kodkord/src/common/log.ts:49](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/log.ts#L49)

Logs the message to the console with a debug level.

#### Returns

`void`

#### Inherited from

[`Loggable`](/api/kodkord/classes/loggable/).[`trace`](/api/kodkord/classes/loggable/#trace)

***

### warn()

> **warn**(): `void`

Defined in: [packages/kodkord/src/common/log.ts:54](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/log.ts#L54)

Logs the message to the console as a warning.

#### Returns

`void`

#### Inherited from

[`Loggable`](/api/kodkord/classes/loggable/).[`warn`](/api/kodkord/classes/loggable/#warn)

***

### panic()

> **panic**(): `void`

Defined in: [packages/kodkord/src/common/log.ts:59](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/log.ts#L59)

Logs the message to the console as an error.

#### Returns

`void`

#### Inherited from

[`Loggable`](/api/kodkord/classes/loggable/).[`panic`](/api/kodkord/classes/loggable/#panic)

***

### format()

> **format**(): `string`

Defined in: [packages/kodkord/src/common/log.ts:69](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/log.ts#L69)

Formats the log into a styled string suitable for console output.

The format includes the log header, timestamp, and a separator.

#### Returns

`string`

A formatted log string

#### Inherited from

[`Loggable`](/api/kodkord/classes/loggable/).[`format`](/api/kodkord/classes/loggable/#format)

***

### formatLines()

> **formatLines**(): `string`

Defined in: [packages/kodkord/src/common/log.ts:86](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/log.ts#L86)

Formats the individual lines of the log with a consistent style.

Each line is prefixed with a vertical bar (`|`) for clarity.

#### Returns

`string`

A formatted string containing all log lines

#### Inherited from

[`Loggable`](/api/kodkord/classes/loggable/).[`formatLines`](/api/kodkord/classes/loggable/#formatlines)
