---
editUrl: false
next: false
prev: false
title: "ansi"
---

> **ansi**(...`codes`): `` `[${string}m` ``

Defined in: [packages/kodkord/src/common/log.ts:218](https://github.com/KingsBeCattz/Kodkord/blob/e64d9a769150751981b0359a2c19703ea8677956/packages/kodkord/src/common/log.ts#L218)

Generates an ANSI escape sequence for the provided ANSI codes.

This function returns a valid ANSI escape sequence that can be used
to style text in a terminal.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`codes` | [`ANSICodes`](/api/kodkord/enumerations/ansicodes/)[] | ANSI codes to include in the escape sequence. |

## Returns

`` `[${string}m` ``

The ANSI escape sequence as a string.
