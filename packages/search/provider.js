import { useMemo, useState, createContext, useContext } from 'react'
import algoliaSearch from 'algoliasearch'
import searchInsights from 'search-insights'

const SearchContext = createContext()

export function useSearch() {
  return useContext(SearchContext)
}

export default function SearchProvider({ children, algoliaConfig = {} }) {
  const [query, setQuery] = useState('')
  const [isCancelled, setCancelled] = useState(false)

  const [appId, indexName, apiKey] = [
    algoliaConfig.appId || process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    algoliaConfig.indexName || process.env.NEXT_PUBLIC_ALGOLIA_INDEX,
    algoliaConfig.searchOnlyApiKey ||
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY,
  ]

  if (!appId || !apiKey || !indexName) {
    throw new Error(`Missing required Algolia arguments or .env variables for SearchProvider. If using environment variables, ensure the following are present in your environment:
- NEXT_PUBLIC_ALGOLIA_APP_ID
- NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY
- NEXT_PUBLIC_ALGOLIA_INDEX
If passing the algoliaConfig prop to SearchProvider, ensure the following keys are defined:
- appId
- indexName
- searchOnlyApiKey
`)
  }

  const algoliaClient = useMemo(() => algoliaSearch(appId, apiKey), [
    appId,
    apiKey,
  ])

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
    searchInsights('init', { appId, apiKey })
  }

  function logClick(hit) {
    return searchInsights('clickedObjectIDsAfterSearch', {
      eventName: 'CLICK_HIT',
      index: indexName,
      queryID: hit.__queryID,
      objectIDs: [hit.objectID],
      positions: [hit.__position],
    })
  }

  return (
    <SearchContext.Provider
      value={{
        client,
        indexName,
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
