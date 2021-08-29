import React from 'react'
import Portal from '@reach/portal'
import s from './tooltip-arrow.module.css'

interface TooltipArrowProps {
  shown: boolean
  triggerRect: DOMRect
  collisionBuffer: number
  arrowSize: number
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
function TooltipArrow({
  shown,
  triggerRect,
  collisionBuffer,
  arrowSize,
}: TooltipArrowProps): React.ReactElement {
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
        className={s.root}
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

export default TooltipArrow
