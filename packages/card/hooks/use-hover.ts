/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

/**
 * DUPLICATE HOOK
 * Lifted from packages/button/hooks/use-hover.ts
 */

import { useRef, useState, useEffect, MutableRefObject } from 'react'

function useHover<T extends HTMLElement>(): [
  hoverRef: MutableRefObject<T | null>,
  isHovered: boolean
] {
  const [value, setValue] = useState(false)

  const ref = useRef<T>(null)
  const handleMouseOver = () => setValue(true)
  const handleMouseOut = () => setValue(false)

  useEffect(() => {
    const node = ref.current
    if (node) {
      node.addEventListener('mouseover', handleMouseOver)
      node.addEventListener('mouseout', handleMouseOut)

      return () => {
        node.removeEventListener('mouseover', handleMouseOver)
        node.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [ref.current])

  return [ref, value]
}

export default useHover
