import { useEffect, useRef, useCallback, useState, Children } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import { ErrorBoundary } from 'react-error-boundary'
import { SandpackProvider, CodeEditor } from '@codesandbox/sandpack-react'
import s from './playground.module.css'
import { components } from 'swingset/__swingset_data'

const componentDeps = Object.fromEntries(
  Object.values(components).map((component) => {
    const lastPathPiece = component.path.split('/').slice(-1)
    return [lastPathPiece, component.exports]
  })
)

const dependencies = {
  'react/jsx-runtime': jsxRuntime,
  ...componentDeps,
}

function getComponent(source) {
  const exports = { default: () => null }
  const require = (mod) => {
    if (dependencies[mod]) return dependencies[mod]

    throw new Error('module not found')
  }
  const fn = new Function('exports', 'require', source)
  fn(exports, require)
  return exports.default
}

function debounce(fn, ms) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, ms)
  }
}

const Playground = ({ children, title }) => {
  const [code, setCode] = useState(
    () => Children.only(children).props.children.props.children
  )
  const [error, setError] = useState()
  const [Component, setComponent] = useState(() => () => null)
  const worker = useRef<Worker>()

  const handleCodeUpdate = useCallback(
    debounce((code) => {
      setCode(code)
    }, 500),
    []
  )

  const language = Children.only(
    children
  ).props.children.props.className.replace('language-', '')

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./transpile.ts', import.meta.url))
    }

    worker.current.postMessage(code)

    worker.current.onmessage = ({ data }) => {
      if (data.error) {
        setError(() => data.error)
      } else {
        setError(null)
        try {
          const newComponent = getComponent(data.code)
          setComponent(() => newComponent)
        } catch (err) {
          setError(err)
        }
      }
    }
  }, [code])

  return (
    <div className={s.root}>
      <div className={s.header}>{title}</div>
      <div className={s.layout}>
        <SandpackProvider>
          <CodeEditor
            code={code}
            initMode="lazy"
            fileType={language}
            showLineNumbers
            onCodeUpdate={handleCodeUpdate}
          />
        </SandpackProvider>
        <div className={s.previewStage}>
          <ErrorBoundary
            fallbackRender={({ error }) => {
              return (
                <>
                  <div>Oh no!</div>
                  <pre>
                    {error.message} {error.stack}
                  </pre>
                </>
              )
            }}
            resetKeys={[code, Component]}
          >
            <Component />
          </ErrorBoundary>
        </div>
      </div>
      {error ? <div style={{ color: 'red' }}>{error.message}</div> : null}
    </div>
  )
}

export default Playground
