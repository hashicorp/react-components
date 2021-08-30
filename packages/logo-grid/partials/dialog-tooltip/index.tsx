import React, { useState, useRef, useEffect } from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { useRect } from '@reach/rect'
import s from './style.module.css'
import Portal from '@reach/portal'
import InlineSvg from '@hashicorp/react-inline-svg'
import svgX from '../../icons/x.svg?include'
import classNames from 'classnames'

interface DialogTooltipProps {
  children: React.ReactNode
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>
  shown: boolean
  triggerRect: DOMRect
  arrowSize?: number
  collisionBuffer?: number
  theme?: 'light' | 'dark'
}

function DialogTooltip({
  children,
  setIsShown,
  shown,
  triggerRect,
  arrowSize = 10,
  collisionBuffer = 8,
  theme = 'light',
}: DialogTooltipProps): React.ReactElement {
  /* Forces update, need to fix, see useEffect
  comment below */
  const [, setDate] = useState(0)
  const setNow = () => setDate(Date.now())

  const tooltipRef = useRef(null)
  const tooltipRect = useRect(tooltipRef, { observe: true })

  const position = calcDialogPosition(
    triggerRect,
    tooltipRect,
    collisionBuffer,
    arrowSize
  )

  /* Dumb hot-fix for issue with useRect, where
  tooltipRect did not seem to be set as expected.
  I think this works because it forces a re-render
  when shown changes, which is exactly when we need
  to look at the tooltipRef again and re-measure.
  Not actually sure why this works. Need to investigate. */
  useEffect(setNow, [shown])

  return (
    <>
      <DialogOverlay
        className={classNames(s.dialogOverlay, s[theme])}
        isOpen={shown}
        onDismiss={() => setIsShown(false)}
        /* We don't want scroll lock, as this is more of a tooltip than a dialog.
        We might want to automatically closing the dialog if it is scrolled
        out of view. We could achieve this by monitoring the "bottom" of the 
        DOMRect of the dialog content. Perhaps something we'll already want
        to monitor to achieve the desired positioning. */
        dangerouslyBypassScrollLock={true}
      >
        <DialogContent
          className={s.dialogContent}
          ref={tooltipRef}
          aria-label="some stuff"
          style={
            {
              '--left': position.left + 'px',
              '--top': position.top + 'px',
            } as React.CSSProperties
          }
        >
          <button className={s.dialogClose} onClick={() => setIsShown(false)}>
            <VisuallyHidden>Close</VisuallyHidden>
            <InlineSvg src={svgX} aria-hidden />
          </button>
          {children}
        </DialogContent>
      </DialogOverlay>
      <DialogArrow
        shown={shown}
        triggerRect={triggerRect}
        collisionBuffer={8}
        arrowSize={arrowSize}
        theme={theme}
      />
    </>
  )
}

/**
 * Given the bounding rectangle for both
 * the tooltip trigger and tooltip popup,
 * render the tooltip centered and below
 * the trigger.
 *
 * Allow viewport collisions to override
 * the centered position where needed,
 * using the collisionBuffer argument
 * to inset the collision area so the tooltip
 * doesn't appear at the very edge of the
 * viewport.
 */
function calcDialogPosition(
  triggerRect,
  tooltipRect,
  collisionBuffer,
  arrowSize
) {
  if (!triggerRect || !tooltipRect) return { left: 0, top: 0 }
  const triggerCenter = triggerRect.left + triggerRect.width / 2
  const left = triggerCenter - tooltipRect.width / 2
  const maxLeft = window.innerWidth - tooltipRect.width - collisionBuffer
  return {
    left: Math.min(Math.max(collisionBuffer, left), maxLeft),
    top: triggerRect.bottom + arrowSize,
  }
}

/**
 * Given the bounding rectangle for
 * the tooltip trigger, render a small
 * triangular arrow.
 *
 * This arrow is centered relative to
 * the trigger, but accounts for possible
 * viewport collisions, as we would prefer
 * to have the arrow connected to the popup
 * (which is bound by the viewport) rather
 * than have it perfectly centered but
 * disconnected from the popup.
 */
function DialogArrow({
  shown,
  triggerRect,
  collisionBuffer,
  arrowSize,
  theme,
}: {
  /** Whether the arrow should be shown */
  shown: boolean
  /** DOMRect of the target element, for positioning the arrow */
  triggerRect: DOMRect
  /** Distance in pixels that the arrow should always be from the viewport edge  */
  collisionBuffer: number
  /** Size in pixels of the arrow */
  arrowSize: number
  /** Arrow coloration  */
  theme: 'light' | 'dark'
}): React.ReactElement {
  if (!shown) return null
  const arrowLeft = triggerRect
    ? `${Math.min(
        // Centered position, covers most use cases
        triggerRect.left - arrowSize + triggerRect.width / 2,
        // Ensure the arrow is not rendered even partially offscreen,
        // as it will look disconnected from our tooltip body,
        // which must be rendered within the viewport
        window.innerWidth - arrowSize * 2 - collisionBuffer
      )}px`
    : 'auto'
  const arrowTop = triggerRect ? `${triggerRect.bottom}px` : 'auto'

  return (
    <Portal>
      <div
        className={classNames(s.dialogArrow, s[theme])}
        style={
          {
            '--left': arrowLeft,
            '--top': arrowTop,
            '--arrow-size': arrowSize + 'px',
          } as React.CSSProperties
        }
      />
    </Portal>
  )
}

export default DialogTooltip
