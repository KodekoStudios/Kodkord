---
editUrl: false
next: false
prev: false
title: "stylize"
---

> **stylize**(`input`, ...`codes`): `string`

Defined in: [Kodcord/packages/kodkord/src/common/log.ts:183](https://github.com/KodekoStudios/Kodcord/blob/6ab19d75069161c7cd299514170ea69cc40eca30/packages/kodkord/src/common/log.ts#L183)

Stylizes the given string by applying the specified ANSI codes.

The function resets specific styles automatically, such as text color, background color,
or other text formatting, based on the provided ANSI codes.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` | The string to be stylized. |
| ...`codes` | [`ANSICodes`](/api-kodkord/enumerations/ansicodes/)[] | ANSI codes to apply to the string. |

## Returns

`string`

The stylized string with the applied ANSI codes.
