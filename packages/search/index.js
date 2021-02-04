import { useEffect } from 'react'
import { Configure, InstantSearch } from 'react-instantsearch-dom'
import Hits from './hits'
import SearchBox from './search-box'
import SearchProvider, { useSearch } from './provider'

function Search({
  placeholder = 'Search',
  renderHitContent,
  renderCalloutCta,
  resolveHitLink,
  onEnter,
  showSearchLegend = true,
}) {
  if (!renderHitContent) {
    throw new Error(
      'Please provide a `renderHitContent` prop to the Search component'
    )
  }

  const {
    client,
    indexName,
    initAlgoliaInsights,
    isCancelled,
    query,
    setCancelled,
    setQuery,
  } = useSearch()

  useEffect(initAlgoliaInsights, [])

  function handleEscape() {
    setCancelled(true)
  }

  const cssVars = {}
  if (!showSearchLegend) cssVars['--legend-height'] = '0px'
  if (renderCalloutCta) cssVars['--callout-height'] = 'var(--callout-max-height)'

  return (
    <div className="g-search" style={cssVars}>
      <InstantSearch indexName={indexName} searchClient={client} refresh>
        <Configure distinct={1} hitsPerPage={25} clickAnalytics />
        <SearchBox
          {...{
            handleEscape,
            placeholder,
            query,
            setCancelled,
            setQuery,
          }}
        />
        {query && !isCancelled && (
          <Hits
            {...{
              handleEscape,
              query,
              renderHitContent,
              resolveHitLink,
              setCancelled,
              showSearchLegend,
              renderCalloutCta,
            }}
          />
        )}
      </InstantSearch>
    </div>
  )
}

export default Search
export { SearchProvider, useSearch }
