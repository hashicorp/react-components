import { useState, useEffect, useRef } from 'react'

export default function useScroll() {
  const scrollRef = useRef()
  const [scrollData, setScrollData] = useState({
    scrollLeft: undefined,
  })

  useEffect(() => {
    const scrollElem = scrollRef.current
    // Handler to call when scroll data may be affected
    function handleScroll() {
      if (!scrollRef.current) return null
      // Set scroll data to state
      setScrollData({
        scrollLeft: scrollRef.current.scrollLeft,
      })
    }
    // Add event listener
    scrollElem.addEventListener('scroll', handleScroll)
    // Call handler right away so state gets updated with initial scroll position
    handleScroll()
    // Remove event listener on cleanup
    return () => scrollElem.removeEventListener('scroll', handleScroll)
  }, [scrollRef])

  // function smoothScrollTo() {
  //   if (!scrollRef.current) return null
  //   scrollRef.current.scrollLeft = 0
  // }

  return [scrollRef, scrollData]
}
