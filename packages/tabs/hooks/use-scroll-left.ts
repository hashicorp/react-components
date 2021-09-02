import { useState, useEffect, useRef, MutableRefObject } from 'react'

export default function useScrollLeft(): [
  scrollRef: MutableRefObject<$TSFixMe>,
  scrollLeft: number
] {
  const scrollRef = useRef(null)
  const [scrollLeft, setScrollLeft] = useState()

  useEffect(() => {
    const scrollElem = scrollRef.current
    // Handler to call when scrollLeft may be affected
    function handleScroll() {
      if (!scrollRef.current) return null
      // Set scroll data to state
      setScrollLeft(scrollRef.current.scrollLeft)
    }
    // Add event listener
    scrollElem.addEventListener('scroll', handleScroll)
    // Call handler right away so state gets updated with initial scroll position
    handleScroll()
    // Remove event listener on cleanup
    return () => scrollElem.removeEventListener('scroll', handleScroll)
  }, [scrollRef])

  return [scrollRef, scrollLeft]
}
