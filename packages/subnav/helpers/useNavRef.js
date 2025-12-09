/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import useOverflowRef from './useOverflowRef'
import useStuckRef from './useStuckRef'

export default function useNavRef(deps) {
  const [isStuck, stuckRef] = useStuckRef()
  const [hasOverflow, overflowRef] = useOverflowRef()

  return [
    isStuck,
    hasOverflow,
    function navRef(target) {
      stuckRef(target, deps)
      overflowRef(target, deps)
    },
  ]
}
