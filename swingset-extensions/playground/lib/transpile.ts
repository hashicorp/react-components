import initSwc, { transformSync } from '@swc/wasm-web'
import initParcelCSS, {
  transform as transformCSS,
  TransformResult,
} from '@parcel/css-wasm'

const enc = new TextEncoder()
const dec = new TextDecoder()

let isInitialized = false

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
    filename: 'stlye.css',
    code: enc.encode(css),
    cssModules: true,
    drafts: {
      nesting: true,
    },
    minify: true,
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
function sendMessage(compiledCode, compiledCSS) {
  const { error, code } = compiledCode
  const css = compiledCSS
    ? {
        code: dec.decode(compiledCSS.code),
        exports: formatCSSExports(compiledCSS.exports),
      }
    : null

  ctx.postMessage({ code: { error, code }, css })
}

ctx.onmessage = ({ data: { code, css } }) => {
  if (!isInitialized) {
    Promise.all([initSwc(), initParcelCSS()]).then(() => {
      isInitialized = true
      const compiledCode = compileCode(code)
      const compiledCSS = compileCSS(css)
      sendMessage(compiledCode, compiledCSS)
    })
  } else {
    const compiledCode = compileCode(code)
    const compiledCSS = compileCSS(css)
    sendMessage(compiledCode, compiledCSS)
  }
}
