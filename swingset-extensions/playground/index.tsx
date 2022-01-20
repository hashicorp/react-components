import {
  useRef,
  useState,
  Children,
  FC,
  ElementType,
  ReactElement,
  useEffect,
} from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import classNames from 'classnames'
import {
  FileTabs,
  SandpackProvider,
  useActiveCode,
  useSandpack,
} from '@codesandbox/sandpack-react'
import s from './playground.module.css'
import PlaygroundEditor from './code-editor'
import { useCompiler } from './hooks/use-compiler'
import { evalComponent } from './lib/eval-component'
import { getCodeFromChildPre } from './lib/get-code-from-child-pre'
import { addStateToURL, getStateFromURL } from './lib/encode-state'
import { useRouter } from 'next/router'
import { ButtonWithIcon } from './components/button-with-icon'
import { IconRefresh } from './components/icon-refresh'
import copyToClipboard from 'copy-to-clipboard'
import { IconCopy } from './components/icon-copy'
import { IconMaximize } from './components/icon-maximize'
import { IconMinimize } from './components/icon-minimize'

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
  const { code: activeCode } = useActiveCode()
  const { files, activePath, resetAllFiles } = sandpack

  const styles = files['style.module.css']?.code
  const code = files['index.tsx'].code

  // TODO: handle accessibility in this scenario
  // TODO: disable body scrolling
  const [fullscreen, setFullscreen] = useState(false)
  const [error, setError] = useState<Error>()
  const [Component, setComponent] = useState<ElementType>(() => () => null)
  const styleRef = useRef<HTMLStyleElement>(null)

  const hasCompiled = useRef(false)
  useEffect(() => {
    if (!hasCompiled.current) {
      return
    }

    if (persistStateToUrl) {
      router.replace(addStateToURL({ code, style: styles }), undefined, {
        shallow: true,
        scroll: false,
      })
    }
  }, [code, styles])

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

          hasCompiled.current = true
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
        className={classNames(
          s.layout,
          layout === 'vertical' && s.vertical,
          fullscreen && s.fullscreen
        )}
      >
        <div className={s.editorStage}>
          <div className={s.toolbar}>
            {styles ? <FileTabs /> : null}
            <div className={s.controls}>
              <ButtonWithIcon
                title="Reset to original snippet"
                onClick={() => resetAllFiles()}
              >
                <IconRefresh width={16} height={16} />
              </ButtonWithIcon>
              <ButtonWithIcon
                title="Copy to clipboard"
                onClick={() => copyToClipboard(activeCode)}
              >
                <IconCopy width={16} height={16} />
              </ButtonWithIcon>
              <ButtonWithIcon
                title="Fullscreen"
                onClick={() => setFullscreen((cur) => !cur)}
              >
                {fullscreen ? (
                  <IconMinimize width={16} height={16} />
                ) : (
                  <IconMaximize width={16} height={16} />
                )}
              </ButtonWithIcon>
            </div>
          </div>
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

  const initialCode =
    typeof children === 'string'
      ? children
      : getCodeFromChildPre(codeChild as ReactElement)
  const initialStyle = getCodeFromChildPre(styleChild as ReactElement)

  const [stateFromURL] = useState(
    persistStateToUrl
      ? getStateFromURL(
          typeof window !== 'undefined'
            ? new URL(window.location.href)
            : undefined
        )
      : { code: null, style: null }
  )

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
