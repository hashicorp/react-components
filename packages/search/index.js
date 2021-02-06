import { useEffect, useState } from 'react'
import { Configure, InstantSearch } from 'react-instantsearch-dom'
import Hits from './hits'
import SearchBox from './search-box'
import SearchProvider, { useSearch } from './provider'

function Search({
  placeholder = 'Search',
  renderHitContent,
  renderCalloutCta,
  resolveHitLink,
  onSubmit = (event) => { event.preventDefault() },
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

  //  keep track of the currently selected result for accessible labeling
  const [hitIndex, setHitIndex] = useState(-1)

  useEffect(() => {
    if (query === '' || isCancelled) {
      setHitIndex(-1)
    }
  }, [query, isCancelled])

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
        <label id="search-label" htmlFor="search-box" className="visually-hidden">Search tutorials</label>
        <SearchBox
          {...{
            handleEscape,
            placeholder,
            query,
            setCancelled,
            setQuery,
            onSubmit,
          }}
          activeHit={hitIndex}
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
            onSetActiveHit={setHitIndex}
          />
        )}
      </InstantSearch>
    </div>
  )
}

export default Search
export { SearchProvider, useSearch }
