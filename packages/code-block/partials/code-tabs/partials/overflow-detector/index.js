import React from 'react'
import useOverflowRef from '../../../../hooks/use-overflow-ref'

/**
 * This component helps automatically detect overflow,
 * which helps toggle UI changes based on available space.
 *
 * The first <div> container is rendered purely as a baseline
 * reference for whether overflow will happen if
 * we were to render with "hasOverflow: false".
 *
 * Without this element, the only way to check if overflow will
 * occur is to rapidly toggle between rendering with and
 * without overflow, but this is expensive, and often results in flickering.
 * This "rapid toggle" approach was taken in our Subnav component,
 * but seemed to be incompatible in this component, and also seemed to result
 * in certain effects not being cleaned up. We have a task to address this:
 * ref: https://app.asana.com/0/1100423001970639/1200437064424407/f
 *
 * @param {object} props
 * @param {function} props.render Render function that accepts ({ hasOverflow }, overflowRef as args)
 * @returns
 */
function OverflowDetector({ render }) {
  const [hasOverflow, overflowRef] = useOverflowRef()
  return (
    <>
      <div
        style={{ height: '0px', overflow: 'hidden', visibility: 'hidden' }}
        role="presentation"
        aria-hidden={true}
      >
        {render({ hasOverflow: false }, overflowRef)}
      </div>
      {render({ hasOverflow })}
    </>
  )
}

export default OverflowDetector
