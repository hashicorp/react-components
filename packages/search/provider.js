import { useMemo, useState, createContext, useContext } from 'react'
import algoliaSearch from 'algoliasearch'
import searchInsights from 'search-insights'

const SearchContext = createContext()

export function useSearch() {
  return useContext(SearchContext)
}

export default function SearchProvider({
  children,
  algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  algoliaIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX,
  algoliaSearchOnlyApiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY,
}) {
  const [query, setQuery] = useState('')
  const [isCancelled, setCancelled] = useState(false)

  if (!algoliaAppId || !algoliaSearchOnlyApiKey || !algoliaIndex) {
    throw new Error(`Missing required Algolia arguments or .env variables for SearchProvider. If using environment variables, ensure the following are present in your environment:
- NEXT_PUBLIC_ALGOLIA_APP_ID
- NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
- NEXT_PUBLIC_ALGOLIA_INDEX
If passing arguments to SearchProvider, ensure the following are passed:
- algoliaAppId
- algoliaIndex
- algoliaSearchOnlyApiKey
`)
  }

  const algoliaClient = useMemo(
    () => algoliaSearch(algoliaAppId, algoliaSearchOnlyApiKey),
    [algoliaAppId, algoliaSearchOnlyApiKey]
  )

  const client = {
    search(requests) {
      return algoliaClient.search(
        requests.map((request) => {
          //  instantsearch fires an empty query on page load to ensure results are immediately available
          //  we exclude that result from our analytics to keep our clickthrough rate clean
          //  ref: https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/out-of-the-box-analytics/how-to/how-to-remove-empty-search-from-analytics/
          if (!request.params.query || request.params.query.length === 0) {
            request.params.analytics = false
          }
          return request
        })
      )
    },
  }

  function initAlgoliaInsights() {
    searchInsights('init', {
      appId: algoliaAppId,
      apiKey: algoliaSearchOnlyApiKey,
    })
  }

  function logClick(hit) {
    return searchInsights('clickedObjectIDsAfterSearch', {
      eventName: 'CLICK_HIT',
      index: algoliaIndex,
      queryID: hit.__queryID,
      objectIDs: [hit.objectID],
      positions: [hit.__position],
    })
  }

  return (
    <SearchContext.Provider
      value={{
        client,
        indexName: algoliaIndex,
        initAlgoliaInsights,
        isCancelled,
        logClick,
        query,
        setCancelled,
        setQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
