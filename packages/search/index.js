import { useEffect, useState } from 'react'
import { Configure, InstantSearch } from 'react-instantsearch-dom'
import Hits from './hits'
import SearchBox, { SearchBoxElement } from './search-box'
import SearchProvider, { useSearch } from './provider'
import VisuallyHidden from '@reach/visually-hidden'
import s from './style.module.css'
import classNames from 'classnames'

//  HTML `id`s used for aria attributes
export const SEARCH_BOX_LABEL_ID = 'search-box-label'
export const SEARCH_BOX_ID = 'search-box'
export const SEARCH_RESULTS_ID = 'search-results'

function Search({
  className,
  placeholder = 'Search',
  renderHitContent,
  renderCalloutCta,
  resolveHitLink,
  onSubmit = (event) => {
    event.preventDefault()
  },
  showSearchLegend = true,
  heapId = 'SearchBox',
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
  if (renderCalloutCta)
    cssVars['--callout-height'] = 'var(--callout-max-height)'

  return (
    <div className={classNames(s.root, className)} style={cssVars}>
      <InstantSearch indexName={indexName} searchClient={client} refresh>
        <Configure distinct={1} hitsPerPage={25} clickAnalytics />
        <VisuallyHidden
          as="label"
          id={SEARCH_BOX_LABEL_ID}
          htmlFor={SEARCH_BOX_ID}
        >
          {placeholder}
        </VisuallyHidden>
        <SearchBox
          {...{
            handleEscape,
            placeholder,
            query,
            setCancelled,
            setQuery,
            onSubmit,
            heapId,
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
export { SearchProvider, useSearch, SearchBoxElement }
