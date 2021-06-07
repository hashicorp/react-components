import React from 'react'
import useOverflowRef from '../../../../hooks/use-overflow-ref'

/* The first item here is rendered purely as a baseline reference for whether overflow will happen if we were to render with "hasOverflow: false".
Without this element, the only way to check if overflow will occur is to rapidly toggle between rendering with and without overflow, but this is expensive, and often results in flickering. */
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
