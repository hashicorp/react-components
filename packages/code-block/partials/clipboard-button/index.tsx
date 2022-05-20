import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import InlineSvg from '@hashicorp/react-inline-svg'
import copyToClipboard from './copy-to-clipboard'
import svgCopyAction from './svg/copy-action.svg?include'
import svgCopySuccess from './svg/copy-success.svg?include'
import s from './style.module.css'
import analytics, { heapAttributes } from '../../analytics'

export interface ClipboardButtonProps {
  className?: string
  getText: () => Promise<[unknown, null] | [null, string]>
  onCopyCallback?: (copiedState: boolean | null) => void
}

function ClipboardButton({
  className,
  getText,
  onCopyCallback,
}: ClipboardButtonProps) {
  // copiedState can be null (initial), true (success), or false (failure)
  const [copiedState, setCopiedState] = useState<boolean | null>(null)
  // we reset copiedState to its initial value using a timeout
  const [resetTimeout, setResetTimeout] = useState<number>()

  // Handle copy button clicks
  async function onClick() {
    // Retrieve the text to copy, using the fn passed by the consumer
    const [getTextError, text] = await getText()
    // If text cannot be retrieved, exit early to handle the error
    if (getTextError) return handleError(getTextError)
    // Otherwise, continue on...
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const isCopied = copyToClipboard(text!)
    // If there's an internal failure copying text, exit early to handle the error
    if (!isCopied) return handleError(`ClipboardButton failed. Text: ${text}.`)
    // Otherwise, things went well, track the event and set state
    analytics.trackCopy()
    setCopiedState(true)
  }

  // Handle errors from copying-to-clipboard
  function handleError(errorMessage) {
    // Enhancement - is there anywhere we can send this error for tracking?
    console.error(errorMessage)
    setCopiedState(false)
  }

  // After displaying feedback on the success state,
  // reset to the default appearance so that it's clear
  // the "Copy" button can be used again
  useEffect(() => {
    // If an onCopyCallback was provided, call it
    if (typeof onCopyCallback == 'function') {
      onCopyCallback(copiedState)
    }
    // Clear any pending timeouts, which can occur if the
    // button is quickly clicked multiple times
    window.clearTimeout(resetTimeout)
    // Only run the copiedState reset if it's needed
    const needsReset = copiedState != null
    if (needsReset) {
      // Let failure messages linger a bit longer
      const resetDelay = copiedState == false ? 4000 : 1750
      // Set the timeout to reset the copy success state
      setResetTimeout(window.setTimeout(() => setCopiedState(null), resetDelay))
    }
    // Clean up if the component unmounts with a pending timeout
    return () => clearTimeout(resetTimeout)
  }, [copiedState, onCopyCallback])

  return (
    <button
      className={classnames(s.button, className, {
        [s.isCopied]: copiedState == true,
      })}
      data-heap-track={heapAttributes.copy}
      onClick={onClick}
      type="button"
    >
      {copiedState == true
        ? 'Copied'
        : copiedState == false
        ? 'Failed'
        : 'Copy'}
      <InlineSvg
        className={s.svg}
        src={copiedState == true ? svgCopySuccess : svgCopyAction}
      />
    </button>
  )
}

export default ClipboardButton
