import { forwardRef } from 'react'

/**
 * This hidden element acts solely as a container
 * that we can fetch textContent to copy to clipboard.
 * This allows to ignore the "how will we copy this cleanly"
 * concern when splitting code into lines, and adding
 * line numbers and so on in other parts of code-block.
 */
function HiddenCopyContent({ code }, copyRef) {
  return (
    <pre ref={copyRef} style={{ display: 'none' }}>
      {typeof code === 'string' ? (
        <span dangerouslySetInnerHTML={{ __html: code }} />
      ) : (
        code
      )}
    </pre>
  )
}

export default forwardRef(HiddenCopyContent)
