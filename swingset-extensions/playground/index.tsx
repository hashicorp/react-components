import { useEffect, useRef, useState, Children, FC } from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import { ErrorBoundary } from 'react-error-boundary'
import classNames from 'classnames'
import {
  FileTabs,
  SandpackProvider,
  useSandpack,
} from '@codesandbox/sandpack-react'
import s from './playground.module.css'
import { components } from 'swingset/__swingset_data'
import PlaygroundEditor from './code-editor'

interface PlaygroundProps {
  title?: string
  layout: 'horizontal' | 'vertical'
}

const componentDeps = Object.fromEntries(
  Object.values(components).map((component) => {
    // @ts-expect-error -- swingset has no types
    const lastPathPiece = component.path.split('/').slice(-1)
    // @ts-expect-error -- swingset has no types
    return [lastPathPiece, component.exports]
  })
)

const dependencies = {
  'react/jsx-runtime': jsxRuntime,
  ...componentDeps,
}

function getComponent(source, cssExports) {
  const exports = { default: () => null }
  const require = (mod) => {
    if (dependencies[mod]) return dependencies[mod]
    if (mod == 'style.module.css') return cssExports
  }
  const fn = new Function('exports', 'require', source)
  fn(exports, require)
  return exports.default
}

const PlaygroundInner = ({ layout }) => {
  const { sandpack } = useSandpack()
  const { files, activePath } = sandpack

  const styles = files['style.module.css']?.code
  const code = files['index.tsx'].code

  const [error, setError] = useState<Error>()
  const [Component, setComponent] = useState(() => () => null)
  const worker = useRef<Worker>()
  const styleRef = useRef<HTMLStyleElement>(null)

  const language = activePath === 'index.tsx' ? 'tsx' : 'css'

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./transpile.ts', import.meta.url))
    }

    worker.current.postMessage({ code, css: styles })

    worker.current.onmessage = ({ data }) => {
      if (data.code.error) {
        setError(() => data.code.error)
      } else {
        setError(undefined)
        try {
          const newComponent = getComponent(data.code.code, data?.css?.exports)
          setComponent(() => newComponent)

          if (styleRef.current && data.css) {
            styleRef.current.innerHTML = data.css.code
          }
        } catch (err) {
          setError(err as Error)
        }
      }
    }
  }, [code, styles])

  return (
    <>
      <style ref={styleRef} />
      <div
        className={classNames(s.layout, layout === 'vertical' && s.vertical)}
      >
        <div className={s.editorStage}>
          <FileTabs />
          <PlaygroundEditor language={language} />
        </div>
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
      {error ? (
        <pre style={{ color: 'red' }}>{error.message ?? error}</pre>
      ) : null}
    </>
  )
}

const Playground: FC<PlaygroundProps> = ({ children, title, layout }) => {
  const [codeChild, styleChild] = Children.toArray(children)

  // @ts-expect-error -- gotta figure out how to infer proper types here
  const initialCode = codeChild.props.children.props.children
  const initialStyle = styleChild
    ? // @ts-expect-error -- gotta figure out how to infer proper types here
      styleChild.props.children.props.children
    : null

  const files = {
    'index.tsx': {
      code: initialCode,
      active: true,
    },
    ...(initialStyle ? { 'style.module.css': { code: initialStyle } } : {}),
  }

  // const language = codeChild.props.children.props.className.replace(
  //   'language-',
  //   ''
  // )

  return (
    <div className={s.root}>
      <div className={s.header}>{title}</div>
      <SandpackProvider
        customSetup={{
          files,
          entry: 'index.tsx',
        }}
      >
        <PlaygroundInner layout={layout} />
      </SandpackProvider>
    </div>
  )
}

export default Playground
