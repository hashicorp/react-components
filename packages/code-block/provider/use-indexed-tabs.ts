import { useEffect, useState } from 'react'
import { useTabGroups } from './'
import clamp from '../utils/clamp'

const IS_DEV = process.env.NODE_ENV !== 'production'

function useIndexedTabs(
  tabGroupIds: string[],
  defaultTabIdx = 0
): [
  number,
  (idx: number) => void,
  string | null | undefined,
  ((group: string) => void) | undefined
] {
  // Clamp the default value to ensure it doesn't cause issues
  const clampedDefault = clamp(defaultTabIdx, 0, tabGroupIds.length - 1)
  const [localTabIdx, setLocalTabIdx] = useState(clampedDefault)
  // Note that useTabGroups may return undefined if context is not present.
  const { activeTabGroup, setActiveTabGroup, preferredTabGroups } =
    useTabGroups() || {}

  // In dev, warn if we're missing context
  useEffect(() => {
    const hasExplicitGroups = tabGroupIds.filter(Boolean).length > 0
    const isMissingProvider = hasExplicitGroups && !setActiveTabGroup
    if (IS_DEV && isMissingProvider) {
      console.warn(
        `Warning: "CodeTabsProvider" cannot be accessed. Make sure it wraps any component that calls useIndexedTabs, otherwise tab syncing will not function.`
      )
    }
  }, [])

  // Enable setting of group value
  // Update both the active tab idx (for this specific tab set),
  // and the tab context's active group (to sync other tab sets)
  function setActiveTabIdx(targetIdx: number) {
    setLocalTabIdx(targetIdx)
    const targetGroup = tabGroupIds[targetIdx]
    if (targetGroup && setActiveTabGroup) setActiveTabGroup(targetGroup)
  }

  // Enable getting of group value
  // If context is present, then ensure that this tab set's
  // activeTabIdx updates when the context's value updates
  useEffect(() => {
    // We can't do anything if context is undefined
    if (activeTabGroup === undefined) return
    const localTabGroup = tabGroupIds[localTabIdx]
    // Or it is defined, check for a mismatch with the
    // current active tab in this component
    if (activeTabGroup == null) {
      // If the current tab group is null, then this is
      // likely the initial load state. We check to see
      // if there is a preferred tab group set, and use that
      const preferredMatchIdx = tabGroupIds.reduce<{
        preferenceIdx: number | null
        tabIdx: number | null
      }>(
        (acc, groupId, tabIdx) => {
          // Determine the "rank" of this preference, being
          // the index in the "preferredTabGroups" array
          const preferenceIdx = preferredTabGroups!.indexOf(groupId)
          // If this is not even in the preferred tabs array, do nothing
          if (preferenceIdx == -1) return acc
          // Otherwise, compare to the current selected rank...
          const isPreferred =
            acc.preferenceIdx == null || preferenceIdx < acc.preferenceIdx
          // ... and if preferred, return this tab's rank and index
          if (isPreferred) return { preferenceIdx, tabIdx }
          // Otherwise, keep looking
          return acc
        },
        { preferenceIdx: null, tabIdx: null }
      ).tabIdx
      // If we have a matching preferred tab,
      // then update this component's state to match
      if (preferredMatchIdx !== null) return setLocalTabIdx(preferredMatchIdx)
    } else if (localTabGroup !== activeTabGroup) {
      // If the current tab group is not null but does not match,
      // check if we have a directly matching tab we can switch to
      const directMatchIdx = tabGroupIds.findIndex((id) => id == activeTabGroup)
      // If we have a matching tab we can switch to,
      // then update this component's state to match
      if (directMatchIdx !== -1) return setLocalTabIdx(directMatchIdx)
    }
  }, [activeTabGroup, preferredTabGroups])

  return [localTabIdx, setActiveTabIdx, activeTabGroup, setActiveTabGroup]
}

export default useIndexedTabs
