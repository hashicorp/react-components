import { useRef, useState } from 'react'
import processSnippet from './utils/process-snippet'
import copyToClipboard from './utils/copy-to-clipboard'
import InlineSvg from '@hashicorp/react-inline-svg'
import svgClipboardIcon from './svg/clipboard-icon.svg.js'
import fragment from './fragment.graphql'
function CodeBlock({ code, language, options = {} }) {
  const codeRef = useRef()
  const [tooltipText, setTooltipText] = useState('Copy')

  function copyCode() {
    const snippet = processSnippet(codeRef.current.textContent)
    const isCopied = copyToClipboard(snippet)
    setTooltipText(isCopied ? 'Copied!' : 'Failed')
    setTimeout(() => setTooltipText('Copy'), 2000)
  }

  const isHtmlString = typeof code === 'string'

  return (
    <div className="g-code-block" data-heap-track="code-block">
      {options.showWindowBar && <WindowBar />}
      <div className="block-wrapper">
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
        </pre>
        {options.showClipboard && (
          <button
            className="clipboard-icon g-type-body-small-strong"
            data-heap-track="code-block-clipboard-icon"
            type="button"
            onClick={copyCode}
          >
            {tooltipText}
            <InlineSvg src={svgClipboardIcon} />
          </button>
        )}
      </div>
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

CodeBlock.fragmentSpec = { fragment }

export default CodeBlock
