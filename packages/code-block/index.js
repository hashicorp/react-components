import React, { useRef, useState } from 'react'
import processSnippet from './utils/process-snippet'
import copyToClipboard from './utils/copy-to-clipboard'
import InlineSvg from '@hashicorp/react-inline-svg'
import ClipboardIcon from './svg/clipboard-icon.svg.js'

function CodeBlock({ code, language, options = {} }) {
  const codeRef = useRef()
  const [tooltipText, setTooltipText] = useState('Copy')

  function copyCode() {
    const snippet = processSnippet(codeRef.current.innerText)
    const isCopied = copyToClipboard(snippet)
    setTooltipText(isCopied ? 'Copied!' : 'Failed')
    setTimeout(() => setTooltipText('Copy'), 2000)
  }

  const isHtmlString = typeof code === 'string'

  return (
    <div className="g-code-block">
      {options.showWindowBar && <WindowBar />}
      <pre
        className={`language-${language}`}
        data-has-window-bar={options.showWindowBar}
      >
        <code
          ref={codeRef}
          className={`language-${language}`}
          dangerouslySetInnerHTML={isHtmlString ? { __html: code } : null}
        >
          {isHtmlString ? null : code}
        </code>
        {!options.hideClipboard && (
          <button
            className="clipboard-icon g-type-body-small-strong"
            data-track="code-block-clipboard-icon"
            onClick={copyCode}
          >
            {tooltipText}
            <InlineSvg src={ClipboardIcon} />
          </button>
        )}
      </pre>
    </div>
  )
}

function WindowBar() {
  return (
    <div className="window-bar">
      <span />
      <span />
      <span />
    </div>
  )
}

export default CodeBlock
