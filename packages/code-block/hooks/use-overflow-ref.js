import { useEffect, useRef, useState } from 'react'
import useWindowSize from './use-window-size'

/**
 * Returns a two-element array consisting of
 * a boolean indicating whether the target element
 * has a scrollWidth greater than its offsetWidth
 * (ie, whether it has overflow), and a ref
 * that must be placed on the target element
 * for the hook to function as expected.
 *
 * Overflow is re-calculated on window resize
 * events that affect the width of the window.
 *
 * If you need similar functionality in another
 * project or component, consider elevating this
 * hook to a shared hooks package of some sort.
 * Asana task: https://app.asana.com/0/1100423001970639/1200437064424402/f
 */
function useOverflowRef() {
  const [hasOverflow, setHasOverflow] = useState(true)
  const { width: windowWidth } = useWindowSize()
  const overflowRef = useRef()

  useEffect(() => {
    if (!overflowRef.current) return
    const { scrollWidth, offsetWidth } = overflowRef.current
    const nowHasOverflow = scrollWidth > offsetWidth
    if (hasOverflow !== nowHasOverflow) setHasOverflow(nowHasOverflow)
  }, [windowWidth])

  return [hasOverflow, overflowRef]
}

export default useOverflowRef
