/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import lzString from 'lz-string'
import { SandpackFiles } from '@codesandbox/sandpack-react'

// TODO: put this somewhere else
type PlaygroundState = SandpackFiles

export function encode(playgroundState: PlaygroundState): string {
  if (playgroundState['/package.json']) delete playgroundState['/package.json']

  const stringified = JSON.stringify(playgroundState)
  return lzString.compressToEncodedURIComponent(stringified)
}

export function decode(encodedState: string): PlaygroundState {
  return JSON.parse(
    lzString.decompressFromEncodedURIComponent(encodedState) ?? ''
  )
}

export function addStateToURL(playgroundState: PlaygroundState): URL {
  const url = new URL(window.location.href)
  const encodedState = encode(playgroundState)

  url.hash = encodedState

  return url
}

export function getStateFromURL(url?: URL): PlaygroundState {
  if (!url) return {}

  try {
    return decode(url.hash.slice(1))
  } catch (error) {
    console.log(error)
    return {}
  }
}
