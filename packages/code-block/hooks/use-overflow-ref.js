import { useEffect, useRef, useState } from 'react'
import useWindowSize from './use-window-size'

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
