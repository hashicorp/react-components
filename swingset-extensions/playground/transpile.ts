import initSwc, { transformSync } from '@swc/wasm-web'

let isInitialized = false

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

self.onmessage = ({ data }) => {
  if (!isInitialized) {
    initSwc().then(() => {
      isInitialized = true
      const compiled = compileCode(data)
      self.postMessage(compiled)
    })
  } else {
    const compiled = compileCode(data)
    self.postMessage(compiled)
  }
}
