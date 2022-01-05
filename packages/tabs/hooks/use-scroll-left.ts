import { useState, useEffect, useRef, RefObject } from 'react'

export default function useScrollLeft<T extends HTMLElement>(): [
  scrollRef: RefObject<T>,
  scrollLeft: number | undefined
] {
  const scrollRef = useRef<T>(null)
  const [scrollLeft, setScrollLeft] = useState<number | undefined>()

  useEffect(() => {
    const scrollElem = scrollRef.current
    // Handler to call when scrollLeft may be affected
    function handleScroll() {
      if (!scrollRef.current) return null
      // Set scroll data to state
      setScrollLeft(scrollRef.current.scrollLeft)
    }
    if (scrollElem) {
      // Add event listener
      scrollElem.addEventListener('scroll', handleScroll)
      // Call handler right away so state gets updated with initial scroll position
      handleScroll()
    }

    // Remove event listener on cleanup
    return () => {
      if (scrollElem) {
        scrollElem.removeEventListener('scroll', handleScroll)
      }
    }
  }, [scrollRef])

  return [scrollRef, scrollLeft]
}
