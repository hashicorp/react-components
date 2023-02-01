/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import initSwc, { transformSync } from '@swc/wasm-web'
import initParcelCSS, {
  transform as transformCSS,
  TransformResult,
} from 'lightningcss-wasm'

const enc = new TextEncoder()
const dec = new TextDecoder()

let isInitialized = false
let initPromise: Promise<any[]>

const ctx: Worker = self as any

function compileCode(code: string) {
  try {
    return transformSync(`${code}`, {
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
        },
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
      },
      module: {
        type: 'commonjs',
      },
    })
  } catch (error) {
    return { error }
  }
}

function compileCSS(css?: string) {
  if (!css) return null
  return transformCSS({
    filename: 'style.css',
    code: enc.encode(css),
    cssModules: true,
    minify: true,
    drafts: {
      nesting: true,
      customMedia: true,
    },
  })
}

// TODO: handle composes
function formatCSSExports(exports: TransformResult['exports']) {
  if (!exports) return {}
  return Object.fromEntries(
    Object.entries(exports).map(([key, { name }]) => [key, name])
  )
}

// TODO: send different message types, will make for easier handling
function sendMessage(instance, compiledCode, compiledCSS) {
  const { error, code } = compiledCode
  const css = compiledCSS
    ? {
        code: dec.decode(compiledCSS.code),
        exports: formatCSSExports(compiledCSS.exports),
      }
    : null

  if (error) {
    ctx.postMessage({ type: 'compile_error', instance, error })
  } else {
    ctx.postMessage({
      type: 'compile_ok',
      instance,
      code: { error, code },
      css,
    })
  }
}

ctx.onmessage = ({ data: { type, instance, code, css } }) => {
  if (!isInitialized) {
    // ensure we only call the initialization once, to prevent unnecessary additional requests
    // for the wasm files
    if (!initPromise) initPromise = Promise.all([initSwc(), initParcelCSS()])

    initPromise.then(() => {
      isInitialized = true
      const compiledCode = compileCode(code)
      const compiledCSS = compileCSS(css)
      sendMessage(instance, compiledCode, compiledCSS)
    })
  } else {
    const compiledCode = compileCode(code)
    const compiledCSS = compileCSS(css)
    sendMessage(instance, compiledCode, compiledCSS)
  }
}
