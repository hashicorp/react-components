import { useRef, useEffect } from 'react'

type UseEventListener = <K extends keyof WindowEventMap>(
  eventName: K,
  handler: (ev: WindowEventMap[K]) => unknown,
  element: Element | typeof globalThis | Document | Window | null,
  options?: AddEventListenerOptions
) => void

const useEventListener: UseEventListener = (
  eventName,
  handler,
  element = global,
  options = {}
) => {
  const savedHandler = useRef<typeof handler>()
  const { capture, passive, once } = options

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const isSupported = element && element.addEventListener
    if (!isSupported) return

    const eventListener = (event) => savedHandler.current?.(event)
    const opts = { capture, passive, once }

    element.addEventListener(eventName, eventListener, opts)
    return () => element.removeEventListener(eventName, eventListener, opts)
  }, [eventName, element, capture, passive, once])
}

export default useEventListener
