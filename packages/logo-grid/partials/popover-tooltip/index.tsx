import React, { useRef, RefObject } from 'react'
import { useRect } from '@reach/rect'
import InlineSvg from '@hashicorp/react-inline-svg'
import Portal from '@reach/portal'
import Popover from '@reach/popover'
import classNames from 'classnames'
import svgX from '../../icons/x.svg?include'
import VisuallyHidden from '@reach/visually-hidden'
import useOnClickOutside from '../../hooks/use-on-click-outside'
import useOnFocusOutside from '../../hooks/use-on-focus-outside'
import s from './style.module.css'

interface PopoverTooltipProps {
  /** Elements to render in the content area of the popover. */
  children: React.ReactNode
  /** Function to set the shown state of the popover. Necessary for close functionality. */
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>
  /** Whether to show the popover or not. */
  shown: boolean
  /** Ref that points to the element that triggered the dialog. */
  triggerRef: RefObject<HTMLElement>
  /** */
  arrowSize?: number
  /** Minimum distance in pixels that the popover should be from the viewport edge.  */
  collisionBuffer?: number
  /** Color scheme appearance of the component. Works best in contexts with a matching theme. */
  theme?: 'light' | 'dark'
}

function PopoverTooltip({
  arrowSize = 10,
  children,
  collisionBuffer = 8,
  theme = 'light',
  triggerRef,
  shown,
  setIsShown,
}: PopoverTooltipProps): React.ReactElement {
  const triggerRect = useRect(triggerRef, { observe: true })
  const popoverRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside([triggerRef, popoverRef], () => setIsShown(false))
  useOnFocusOutside(popoverRef, () => setIsShown(false))

  return (
    <div>
      {shown ? (
        <>
          <Popover
            targetRef={triggerRef}
            ref={popoverRef}
            position={(targetRef, popoverRect) =>
              centeringFunction(targetRef, popoverRect, collisionBuffer)
            }
            className={classNames(s.popover, s[theme])}
            style={
              {
                '--collision-buffer': collisionBuffer + 'px',
              } as React.CSSProperties
            }
          >
            <button className={s.dialogClose} onClick={() => setIsShown(false)}>
              <VisuallyHidden>Close</VisuallyHidden>
              <InlineSvg src={svgX} aria-hidden />
            </button>
            {children}
          </Popover>
          <DialogArrow
            shown={true}
            triggerRect={triggerRect!}
            collisionBuffer={collisionBuffer}
            arrowSize={arrowSize}
            theme={theme}
          />
        </>
      ) : null}
    </div>
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
  /** Minimum distance in pixels that the arrow should be from the viewport edge  */
  collisionBuffer: number
  /** Size in pixels of the arrow */
  arrowSize: number
  /** Arrow coloration  */
  theme: 'light' | 'dark'
}): React.ReactElement | null {
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

export default PopoverTooltip
