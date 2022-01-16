import {
  useRef,
  useState,
  Children,
  FC,
  ElementType,
  ReactElement,
} from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import classNames from 'classnames'
import {
  FileTabs,
  SandpackProvider,
  useSandpack,
} from '@codesandbox/sandpack-react'
import s from './playground.module.css'
import PlaygroundEditor from './code-editor'
import { useCompiler } from './hooks/use-compiler'
import { evalComponent } from './lib/eval-component'
import { getCodeFromChildPre } from './lib/get-code-from-child-pre'
import { addStateToURL, getStateFromURL } from './lib/encode-state'
import { useRouter } from 'next/router'

interface PlaygroundProps {
  /**
   * Optional title which is rendered above the playground element
   */
  title?: string
  /**
   * Playground layout, determines how the editor and preview stage are oriented
   */
  layout: 'horizontal' | 'vertical'
  /**
   * Whether or not the editor state should be persisted to the URL. Defaults to false.
   *
   * WARNING: only one Playground per page can have its state persisted to the URL
   */
  persistStateToUrl?: boolean
}

/**
 * Placing an abstraction at this level to gain access to the Sandpack provider
 */
const PlaygroundInner = ({ layout, persistStateToUrl }) => {
  const router = useRouter()
  const { sandpack } = useSandpack()
  const { files, activePath } = sandpack

  const styles = files['style.module.css']?.code
  const code = files['index.tsx'].code

  const [error, setError] = useState<Error>()
  const [Component, setComponent] = useState<ElementType>(() => () => null)
  const styleRef = useRef<HTMLStyleElement>(null)

  useCompiler(code, styles, (data) => {
    switch (data.type) {
      case 'compile_ok': {
        setError(undefined)
        try {
          const newComponent = evalComponent(data.code.code, data?.css?.exports)
          setComponent(() => newComponent)

          if (styleRef.current && data.css) {
            styleRef.current.innerHTML = data.css.code
          }

          if (persistStateToUrl) {
            router.replace(addStateToURL({ code, style: styles }), undefined, {
              shallow: true,
              scroll: false,
            })
          }
        } catch (err) {
          setError(err as Error)
        }
        break
      }
      case 'compile_error': {
        setError(() => data.error)
        break
      }
      default: {
        console.log(data)
        throw new Error(`received unknown event type: ${data.type}`)
      }
    }
  })

  const language = activePath === 'index.tsx' ? 'tsx' : 'css'

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

const Playground: FC<PlaygroundProps> = ({
  children,
  title,
  layout,
  persistStateToUrl,
}) => {
  const [codeChild, styleChild] = Children.toArray(children)

  const initialCode = getCodeFromChildPre(codeChild as ReactElement)
  const initialStyle = getCodeFromChildPre(styleChild as ReactElement)

  const stateFromURL = persistStateToUrl
    ? getStateFromURL(
        typeof window !== 'undefined'
          ? new URL(window.location.href)
          : undefined
      )
    : { code: null, style: null }

  const files = {
    'index.tsx': {
      code: stateFromURL?.code ?? initialCode,
      active: true,
    },
    ...(initialStyle
      ? { 'style.module.css': { code: stateFromURL?.style ?? initialStyle } }
      : {}),
  }

  return (
    <div className={s.root}>
      <div className={s.header}>{title}</div>
      <SandpackProvider
        customSetup={{
          files,
          entry: 'index.tsx',
        }}
      >
        <PlaygroundInner
          layout={layout}
          persistStateToUrl={persistStateToUrl}
        />
      </SandpackProvider>
    </div>
  )
}

export default Playground
