/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { useEffect, useRef } from 'react'

// {
//   type: "compile",
//   instance: '1234',
//   code: "...",
//   css: "..."
// }

// {
//   type: "compile_ok",
//   instance: '1234',
//   code: "...",
//   css: { }
// }

// {
//   type: "compile_error",
//   instance: '1234',
//   error: { }
// }

let worker: Worker
const listeners = new Map()

function getWorker() {
  if (!worker) {
    worker = new Worker(new URL('../lib/transpile.ts', import.meta.url))

    worker.onmessage = ({ data }) => {
      const cb = listeners.get(data.instance)
      if (cb?.current) cb.current(data)
    }
  }

  return worker
}

function getUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

/**
 * Communicates with a web worker which uses SWC and @parcel/css to compile TS source code and
 * CSS modules to something which can be executed in the browser
 *
 * @param code Code to compile
 * @param css CSS to compile
 * @param cbArg Callback to call with the compiled code and CSS
 */
export const useCompiler = (code, css, cbArg) => {
  const instanceId = useRef(getUniqueId())
  const cb = useRef(cbArg)

  /**
   * Easy way to ensure the callback reference remains "consistent"
   */
  useEffect(() => {
    cb.current = cbArg
  }, [cbArg])

  /**
   * Add our event listener once for the life of the hook only
   */
  useEffect(() => {
    const id = instanceId.current
    listeners.set(id, cb)

    return () => {
      listeners.delete(id)
    }
  }, [])

  useEffect(() => {
    /**
     * For each hook, create a unique id
     * send with events
     *
     * TODO: only send code OR css, whichever changed (can only edit one at once)
     */
    const worker = getWorker()

    worker.postMessage({
      type: 'compile',
      instance: instanceId.current,
      code,
      css: css,
    })
  }, [code, css])
}
