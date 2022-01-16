import lzString from 'lz-string'

// TODO: put this somewhere else
interface PlaygroundState {
  code: string | null
  style: string | null
}

export function encode(playgroundState: PlaygroundState): string {
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
  if (!url) return { code: null, style: null }

  try {
    return decode(url.hash.slice(1))
  } catch (error) {
    return { code: null, style: null }
  }
}
