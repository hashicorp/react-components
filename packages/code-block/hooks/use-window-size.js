import { useState, useEffect } from 'react'

/**
 * Returns a { width, height } object
 * representing the size of the global window.
 * Updates the return value on window "resize".
 *
 * Swiped from:
 * https://usehooks.com/useWindowSize/
 *
 * If you need similar functionality in another
 * project or component, consider elevating this
 * hook to a shared hooks package of some sort.
 * Asana task: https://app.asana.com/0/1100423001970639/1200437064424402/f
 *
 * @returns {Object} A { width, height } object representing the size of the window
 */
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}

export default useWindowSize
