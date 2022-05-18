import { useRef } from 'react'
import type { ReactElement } from 'react'
import classNames from 'classnames'
import processSnippet from './utils/process-snippet'
import ClipboardButton, {
  ClipboardButtonProps,
} from './partials/clipboard-button'
import SnippetBar from './partials/snippet-bar'
import themeDark from './theme-dark.module.css'
import themeLight from './theme-light.module.css'
import HiddenCopyContent from './partials/hidden-copy-content'
import CodeLines from './partials/code-lines'
import analytics, { heapAttributes } from './analytics'
import fragment from './fragment.graphql'
import s from './style.module.css'

export interface CodeBlockOptions {
  showChrome?: boolean
  highlight?: boolean
  lineNumbers?: boolean
  showClipboard?: boolean
  showWindowBar?: boolean
  filename?: string
  heading?: string
}

export interface CodeBlockProps {
  className?: string
  code: string | ReactElement
  language?: string
  theme?: 'light' | 'dark'
  hasBarAbove?: boolean
  onCopyCallBack?: ClipboardButtonProps['onCopyCallback']
  options?: CodeBlockOptions
}

function CodeBlock({
  className,
  code,
  language,
  theme = 'dark',
  hasBarAbove = false,
  onCopyCallBack,
  options = {
    showChrome: false,
    highlight: false,
    lineNumbers: false,
    showClipboard: false,
    showWindowBar: false,
  },
}: CodeBlockProps) {
  const copyRef = useRef<HTMLPreElement>()

  async function getText(): Promise<[null, string] | [unknown, null]> {
    try {
      // Gather the text content
      const rawSnippet = copyRef.current?.textContent
      // Run additional processing, namely for shell commands
      const snippet = processSnippet(rawSnippet)
      return [null, snippet]
    } catch (err) {
      return [err, null]
    }
  }

  const {
    showChrome,
    filename,
    heading,
    highlight,
    lineNumbers,
    showClipboard,
    showWindowBar,
  } = options
  if (showWindowBar) {
    console.warn(
      'The options.showWindowBar prop has been renamed, and will be deprecated in a future version. Please use options.showChrome instead.'
    )
  }
  const hasChrome = showWindowBar || showChrome
  const hasTopBar = hasChrome || filename || heading
  const hasFloatingCopyButton = !hasTopBar && showClipboard

  const baseThemeClass = theme == 'dark' ? themeDark.base : themeLight.base
  const syntaxClass = theme == 'dark' ? themeDark.syntax : themeLight.syntax

  return (
    <div
      className={classNames(
        'g-code-block',
        s.root,
        className,
        baseThemeClass,
        syntaxClass,
        { [s.hasBarAbove]: hasBarAbove }
      )}
      data-heap-track={heapAttributes.root}
      onClick={analytics.trackCodeClick}
    >
      <HiddenCopyContent ref={copyRef} code={code} />
      {hasTopBar ? (
        <SnippetBar
          showChrome={hasChrome}
          filename={filename}
          heading={heading}
          getText={getText}
          showClipboard={showClipboard}
        />
      ) : null}
      <div className={s.linesContainer}>
        <CodeLines
          code={code}
          language={language}
          highlight={highlight}
          lineNumbers={lineNumbers}
          hasFloatingCopyButton={hasFloatingCopyButton}
        />
        {hasFloatingCopyButton ? (
          <div className={s.copyButtonContainer}>
            <div className={s.copyButtonBackground}>
              <ClipboardButton
                getText={getText}
                onCopyCallback={onCopyCallBack}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

CodeBlock.fragmentSpec = { fragment }

export default CodeBlock
