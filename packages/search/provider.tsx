import React, { useMemo, useState, createContext, useContext } from 'react'
import algoliaSearch, { SearchClient } from 'algoliasearch'
import searchInsights from 'search-insights'
import { AlgoliaConfigObject } from './types'

const SearchContext = createContext<SearchContextObject | null>(null)

type Writeable<T> = { -readonly [P in keyof T]: T[P] }
interface SearchContextObject {
  /** The algoliasearch client, initialized with provided config */
  client: {
    search(
      requests: Writeable<Parameters<SearchClient['search']>[0]>
    ): ReturnType<SearchClient['search']>
  }
  /** Reflects the indexName provided in either the algoliaConfig prop, or in the ALGOLIA_INDEX .env variable. */
  indexName: string
  /** Initializes the Algolia client, using the config prop provided to SearchProvider, or .env variables. */
  initAlgoliaInsights: () => void
  /** Registers a click on a specific search hit object. */
  logClick: ({ __position, __queryID, objectID }) => void
  /** The string currently being searched against */
  query: string
  /** A function to update the string to search against */
  setQuery: (query: string) => void
  /** Whether the current search has been cancelled  */
  isCancelled: boolean
  /** A function to update whether the current search has been cancelled. */
  setCancelled: (isCancelled: boolean) => void
}

export function useSearch(): SearchContextObject | null {
  return useContext(SearchContext)
}

export default function SearchProvider({
  children,
  algoliaConfig = {},
}: {
  children: React.ReactNode
  algoliaConfig: AlgoliaConfigObject
}): React.ReactElement {
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

  // Memo-ize client context values, as these should only
  // change and cause re-renders when Algolia configuration changes
  const { client, initAlgoliaInsights, logClick } = useMemo(() => {
    const algoliaClient = algoliaSearch(appId, apiKey)
    return {
      client: {
        search(requests: Writeable<Parameters<SearchClient['search']>[0]>) {
          return algoliaClient.search(
            requests.map((request) => {
              //  instant search fires an empty query on page load to ensure results are immediately available.
              //  we exclude that result from our analytics to keep our click through rate clean
              //  ref: https://www.algolia.com/doc/guides/getting-insights-and-analytics/search-analytics/out-of-the-box-analytics/how-to/how-to-remove-empty-search-from-analytics/
              if (
                request.params &&
                (!request.params.query || request.params.query.length === 0)
              ) {
                // The `params` property is marked as readonly, so we manually
                // cast it to a mutable object.
                ;(request.params as { analytics: boolean }).analytics = false
              }
              return request
            })
          )
        },
      },
      initAlgoliaInsights: () => searchInsights('init', { appId, apiKey }),
      logClick: (hit) => {
        // @ts-expect-error - the type for this event is wrong, ref: https://github.com/algolia/search-insights.js/issues/271
        // Fixed in 2.1.0 (cur 1.8.0)
        return searchInsights('clickedObjectIDsAfterSearch', {
          eventName: 'CLICK_HIT',
          index: indexName,
          queryID: hit.__queryID,
          objectIDs: [hit.objectID],
          positions: [hit.__position],
        })
      },
    }
  }, [apiKey, appId, indexName])

  // Memo-ize the full context value,
  // if this is not done then the `value` object would
  // change referentially, likely causing unnecessary re-renders
  const contextValue = useMemo(() => {
    return {
      client,
      initAlgoliaInsights,
      logClick,
      indexName,
      query,
      setQuery,
      isCancelled,
      setCancelled,
    }
  }, [
    client,
    initAlgoliaInsights,
    logClick,
    indexName,
    query,
    setQuery,
    isCancelled,
    setCancelled,
  ])

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  )
}
