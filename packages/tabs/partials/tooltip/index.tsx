import React from 'react'
import Portal from '@reach/portal'
import { useTooltip, TooltipPopup } from '@reach/tooltip'
import classNames from 'classnames'
import s from './style.module.css'

interface TooltipProps {
  /** Element that, when hovered, will display the tooltip. */
  children: React.ReactElement
  /** Plain text for the tooltip to render */
  label: string
  /** What the screen reader announces  */
  'aria-label'?: string
  /** Minimum spacing from viewport edge */
  collisionBuffer?: number
  /** Theme for light or dark mode */
  theme: 'light' | 'dark'
}

function Tooltip({
  children,
  label,
  collisionBuffer = 8,
  'aria-label': ariaLabel,
  theme = 'light',
}: TooltipProps): React.ReactElement {
  const [trigger, tooltip] = useTooltip()
  const { isVisible, triggerRect } = tooltip

  return (
    <React.Fragment>
      {React.cloneElement(children, trigger)}
      {isVisible && (
        <Portal>
          <Arrow
            triggerRect={triggerRect}
            collisionBuffer={collisionBuffer}
            theme={theme}
          />
        </Portal>
      )}
      <TooltipPopup
        {...tooltip}
        className={classNames(s.box, s[`theme-${theme}`])}
        label={label}
        aria-label={ariaLabel}
        position={(triggerRect, tooltipRect) =>
          centeringFunction(triggerRect, tooltipRect, collisionBuffer)
        }
      />
    </React.Fragment>
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
function centeringFunction(triggerRect, tooltipRect, collisionBuffer) {
  const triggerCenter = triggerRect.left + triggerRect.width / 2
  const left = triggerCenter - tooltipRect.width / 2
  const maxLeft = window.innerWidth - tooltipRect.width - collisionBuffer
  return {
    left: Math.min(Math.max(collisionBuffer, left), maxLeft) + window.scrollX,
    top: triggerRect.bottom + collisionBuffer + window.scrollY,
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
function Arrow({ triggerRect, collisionBuffer, theme }) {
  const arrowThickness = 10
  const arrowLeft = triggerRect
    ? `${Math.min(
        // Centered position, covers most use cases
        triggerRect.left - arrowThickness + triggerRect.width / 2,
        // Ensure the arrow is not rendered even partially offscreen,
        // as it will look disconnected from our tooltip body,
        // which must be rendered within the viewport
        window.innerWidth - arrowThickness * 2 - collisionBuffer
      )}px`
    : 'auto'
  const arrowTop = triggerRect
    ? `${triggerRect.bottom + window.scrollY}px`
    : 'auto'

  return (
    <div
      className={classNames(s.arrow, s[`theme-${theme}`])}
      style={
        {
          '--left': arrowLeft,
          '--top': arrowTop,
        } as React.CSSProperties
      }
    />
  )
}

export default Tooltip
