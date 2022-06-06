import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { IconCheckSquare16 } from '@hashicorp/flight-icons/svg-react/check-square-16'
import { IconDuplicate16 } from '@hashicorp/flight-icons/svg-react/duplicate-16'
import { IconXSquare16 } from '@hashicorp/flight-icons/svg-react/x-square-16'
import copyToClipboard from './copy-to-clipboard'
import analytics, { heapAttributes } from '../../analytics'
import s from './style.module.css'

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

  // ref needed for re-focusing the button after `copiedState` change
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Handle copy button clicks
  async function onClick() {
    // Retrieve the text to copy, using the fn passed by the consumer
    const [getTextError, text] = await getText()

    // If text cannot be retrieved, exit early to handle the error
    if (getTextError) {
      return handleError(getTextError)
    }

    // Otherwise, continue on...
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const isCopied = copyToClipboard(text!)

    // If an onCopyCallback was provided, call it
    if (typeof onCopyCallback == 'function') {
      onCopyCallback(copiedState)
    }

    // If there's an internal failure copying text, exit early to handle the error
    if (!isCopied) {
      return handleError(`ClipboardButton failed. Text: ${text}.`)
    }

    // Otherwise, things went well, track the event, set state, invoke callback
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
    /**
     * This button loses focus when re-rendered on `copiedState` change. This
     * block brings the button back into focus if the current
     * `document.activeElement` is `document.body` and the button has not
     * already been re-focused. If the user has activated the button and then
     * immediately navigated away via keyboard, the check on
     * `document.activeElement` will prevent the user's focus from being moved
     * back to the copy button.
     */
    if (
      buttonRef &&
      buttonRef.current &&
      document.activeElement === document.body &&
      document.activeElement !== buttonRef.current
    ) {
      buttonRef.current.focus()
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
  }, [copiedState])

  let buttonText = 'Copy'
  let buttonIcon = <IconDuplicate16 className={s.svg} />
  if (copiedState === true) {
    buttonText = 'Copied'
    buttonIcon = <IconCheckSquare16 className={s.svg} />
  } else if (copiedState === false) {
    buttonText = 'Failed'
    buttonIcon = <IconXSquare16 className={s.svg} />
  }
  return (
    <button
      className={classnames(s.button, className, {
        [s.isCopied]: copiedState == true,
      })}
      data-heap-track={heapAttributes.copy}
      onClick={onClick}
      ref={buttonRef}
      type="button"
    >
      {buttonText}
      {buttonIcon}
    </button>
  )
}

export default ClipboardButton
