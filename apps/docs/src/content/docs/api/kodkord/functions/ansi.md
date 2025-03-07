---
editUrl: false
next: false
prev: false
title: "ansi"
---

> **ansi**(...`codes`): `` `[${string}m` ``

Defined in: [packages/kodkord/src/common/log.ts:218](https://github.com/KodekoStudios/Kodkord/blob/dc3759533552e18eb6881d3858a982430eda469c/packages/kodkord/src/common/log.ts#L218)

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
