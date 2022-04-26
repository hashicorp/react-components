import fuzzysearch from 'fuzzysearch'
import type { NavData, NavNodeWithInjectedFields } from '../types'

function filterContent(
  content: NavData,
  searchValue: string
): NavNodeWithInjectedFields[] {
  // if there's no search searchValue we short-circuit and return everything
  if (!searchValue) return content
  // Otherwise we reduce the content array to only matching content
  return content.reduce((acc, item) => {
    // if this is a divider node, don't show it in filtered results
    if ('divider' in item || 'heading' in item) return acc
    // all other nodes have a title, use it to check if the item is a direct match
    const isTitleMatch = fuzzysearch(
      searchValue.toLowerCase(),
      item.title.toLowerCase()
    )
    //  For nodes with no children, return early, only add the item if the title matches
    if (!('routes' in item)) return isTitleMatch ? acc.concat(item) : acc
    // for branch nodes with matching children, return a clone of the
    // node with filtered content children
    const filteredRoutes = filterContent(item.routes, searchValue)
    const filteredItem = isTitleMatch
      ? { ...item, __isFiltered: true }
      : { ...item, routes: filteredRoutes, __isFiltered: true }
    const isCategoryMatch = isTitleMatch || filteredRoutes.length > 0
    return isCategoryMatch ? acc.concat(filteredItem) : acc
  }, [] as NavData)
}

export default filterContent
