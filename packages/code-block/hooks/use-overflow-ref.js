import { useEffect, useRef, useState } from 'react'
import useWindowSize from './use-window-size'

/*

Overflow is determined by whether the width of a overflowRef.current element’s content is
greater than the width of its layout.

*/

function useOverflowRef() {
  const [hasOverflow, setHasOverflow] = useState(true)
  const { width: windowWidth } = useWindowSize()
  const overflowRef = useRef()

  useEffect(() => {
    const cleanup = () => null
    if (!overflowRef.current) return cleanup
    const { scrollWidth, offsetWidth } = overflowRef.current
    const nowHasOverflow = scrollWidth > offsetWidth
    if (hasOverflow !== nowHasOverflow) setHasOverflow(nowHasOverflow)
    return cleanup
  }, [windowWidth, overflowRef.current])

  return [hasOverflow, overflowRef]
}

export default useOverflowRef
