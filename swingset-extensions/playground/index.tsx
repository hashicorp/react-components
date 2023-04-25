/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import {
  useRef,
  useState,
  Children,
  ElementType,
  ReactElement,
  useEffect,
  type ReactNode,
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
import { useSafeLayoutEffect } from './hooks/use-safe-layout-effect'

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
  children: ReactNode
}

/**
 * Placing an abstraction at this level to gain access to the Sandpack provider
 */
const PlaygroundInner = ({ layout, persistStateToUrl }) => {
  const router = useRouter()
  const { sandpack } = useSandpack()
  const { code: activeCode } = useActiveCode()
  const { files, activeFile, resetAllFiles } = sandpack

  const styles = files['/style.module.css']?.code
  const code = files['/index.tsx']?.code

  // TODO: handle accessibility in this scenario
  const [isFullscreen, setIsFullscreen] = useState(false)
  const scrollPosRef = useRef(-1)
  const [error, setError] = useState<Error>()
  const [Component, setComponent] = useState<ElementType>(() => () => null)
  const styleRef = useRef<HTMLStyleElement>(null)

  useSafeLayoutEffect(() => {
    if (isFullscreen) {
      window.scroll(0, 0)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
      if (scrollPosRef.current > 0) {
        window.scroll(0, scrollPosRef.current)
        scrollPosRef.current = 0
      }
    }
  }, [isFullscreen])

  const hasCompiled = useRef(false)
  useEffect(() => {
    if (!hasCompiled.current) {
      return
    }

    if (persistStateToUrl) {
      router.replace(addStateToURL(files), undefined, {
        shallow: true,
        scroll: false,
      })
    }
  }, [files])

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

  const language = activeFile === '/index.tsx' ? 'tsx' : 'css'

  return (
    <>
      <style ref={styleRef} />
      <div
        className={classNames(
          s.layout,
          layout === 'vertical' && s.vertical,
          isFullscreen && s.fullscreen
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
                onClick={() => {
                  if (!isFullscreen) scrollPosRef.current = window.scrollY
                  setIsFullscreen((cur) => !cur)
                }}
              >
                {isFullscreen ? (
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

const Playground = ({
  children,
  title,
  layout,
  persistStateToUrl,
}: PlaygroundProps) => {
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
      : {}
  )

  const files = {
    'index.tsx': {
      code: initialCode,
      active: true,
    },
    ...(initialStyle ? { 'style.module.css': { code: initialStyle } } : {}),
    ...stateFromURL,
  }

  return (
    <div className={s.root}>
      <div className={s.header}>{title}</div>
      <SandpackProvider
        files={files}
        customSetup={{ entry: 'index.tsx' }}
        theme={{
          font: { body: '', mono: '', size: '14px' },
          colors: { surface1: '#f8f9fb' },
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
