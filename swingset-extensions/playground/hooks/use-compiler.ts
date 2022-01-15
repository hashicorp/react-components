import { useEffect, useRef } from 'react'

/**
 * Communicates with a web worker which uses SWC and @parcel/css to compile TS source code and
 * CSS modules to something which can be executed in the browser
 *
 * @param code Code to compile
 * @param css CSS to compile
 * @param cbArg Callback to call with the compiled code and CSS
 */
export const useCompiler = (code, css, cbArg) => {
  const cb = useRef(cbArg)
  const worker = useRef<Worker>()

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL('../lib/transpile.ts', import.meta.url)
      )
    }

    worker.current.postMessage({ code, css: css })

    worker.current.onmessage = (msg) => cb.current(msg)
  }, [code, css])
}
