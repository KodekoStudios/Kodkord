---
editUrl: false
next: false
prev: false
title: "ansi"
---

> **ansi**(...`codes`): `` `[${string}m` ``

Defined in: [Kodcord/packages/kodkord/src/common/log.ts:218](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/common/log.ts#L218)

Generates an ANSI escape sequence for the provided ANSI codes.

This function returns a valid ANSI escape sequence that can be used
to style text in a terminal.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`codes` | [`ANSICodes`](/api-kodkord/enumerations/ansicodes/)[] | ANSI codes to include in the escape sequence. |

## Returns

`` `[${string}m` ``

The ANSI escape sequence as a string.
