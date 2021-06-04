import { useRef } from 'react'
import classNames from 'classnames'
import processSnippet from './utils/process-snippet'
import ClipboardButton from './partials/clipboard-button'
import SnippetBar from './partials/snippet-bar'
import s from './style.module.css'
import themeDark from './theme-dark.module.css'
import themeLight from './theme-light.module.css'
import HiddenCopyContent from './partials/hidden-copy-content'
import CodeLines from './partials/code-lines'

import fragment from './fragment.graphql'

function CodeBlock({
  className,
  code,
  language,
  theme = 'dark',
  options = {
    chrome: false,
    highlight: false,
    lineNumbers: false,
    showClipboard: false,
    showWindowBar: false,
  },
}) {
  const copyRef = useRef()

  function getText() {
    // Gather the text content
    const rawSnippet = copyRef.current.textContent
    // Run additional processing, namely for shell commands
    const snippet = processSnippet(rawSnippet)
    return [null, snippet]
  }

  const {
    chrome,
    filename,
    heading,
    highlight,
    lineNumbers,
    showClipboard,
    showWindowBar,
  } = options
  if (showWindowBar) {
    console.warn(
      'The options.showWindowBar prop has been renamed, and will be deprecated in a future version. Please use options.chrome instead.'
    )
  }
  const hasChrome = showWindowBar || chrome
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
        syntaxClass
      )}
      data-heap-track="code-block"
    >
      <HiddenCopyContent ref={copyRef} code={code} />
      {hasTopBar ? (
        <SnippetBar
          chrome={hasChrome}
          filename={filename}
          heading={heading}
          getText={getText}
          showClipboard={showClipboard}
        />
      ) : null}
      <div className={s.linesWrapper}>
        <CodeLines
          code={code}
          language={language}
          highlight={highlight}
          lineNumbers={lineNumbers}
          hasFloatingCopyButton={hasFloatingCopyButton}
        />
        {hasFloatingCopyButton ? (
          <div className={s.copyButtonContainer}>
            <ClipboardButton getText={getText} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

/*

CodeBlock click event 
(fire on click anywhere in component)
(do we really want this?)

window.analytics.track("Click", {
  category: "CodeBlock",
  language,
  theme
})

CodeBlock copy event
(fire on click of copy button)

window.analytics.track("Copy", {
  category: "CodeBlock",
  language,
  theme
})

CodeTabs selection event
(fire on click of tab trigger)

window.analytics.track("Tab", {
  category: "CodeTabs",
  language
})

*/

CodeBlock.fragmentSpec = { fragment }

export default CodeBlock
