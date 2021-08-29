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
function centeringFunction(
  triggerRect,
  tooltipRect,
  collisionBuffer,
  arrowSize = 0
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

export default centeringFunction
