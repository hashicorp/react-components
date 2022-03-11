import { useEffect, useState, useRef, useContext } from 'react'
import { instantSearchContext } from 'react-instantsearch-core'
import {
  Configure,
  InstantSearch,
  Index,
  connectHits,
} from 'react-instantsearch-dom'
import Hits from './hits'
import SearchBox, { SearchBoxElement } from './search-box'
import SearchProvider, { useSearch } from './provider'
import VisuallyHidden from '@reach/visually-hidden'
import s from './style.module.css'
import h from './hits.module.css'
import classNames from 'classnames'
import SearchLegend from './legend'

//  HTML `id`s used for aria attributes
export const SEARCH_BOX_LABEL_ID = 'search-box-label'
export const SEARCH_BOX_ID = 'search-box'
export const SEARCH_RESULTS_ID = 'search-results'

const useInstantSearch = () => useContext(instantSearchContext)

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
  additionalIndexes = [],
}) {
  if (!renderHitContent) {
    throw new Error(
      'Please provide a `renderHitContent` prop to the Search component'
    )
  }

  const {
    // client,
    indexName,
    initAlgoliaInsights,
    isCancelled,
    query,
    setCancelled,
    setQuery,
  } = useSearch()

  const indexes = [indexName, ...additionalIndexes]

  // This is a list of keys in the format of `indexName::objectID`
  // ex. `product_TERRAFORM::plugin/sdkv2/testing/testing-patterns`
  let items = []

  const ctx = useInstantSearch()
  const results = ctx.store.getState().results || {}

  // if results are using multiple indexes, it will contain nested results
  // keyed by indexName
  const isMultiIndex = indexName in results
  if (isMultiIndex) {
    indexes.forEach((index) => {
      results[index]?.hits.forEach((hit) => {
        items.push(`${index}::${hit.objectID}`)
      })
    })
  } else {
    results.hits?.forEach((hit) => items.push(`${indexName}::${hit.objectID}`))
  }
  console.log(items)

  useEffect(initAlgoliaInsights, [])

  function handleEscape() {
    setCancelled(true)
  }

  const cssVars = {}
  if (!showSearchLegend) cssVars['--legend-height'] = '0px'
  if (renderCalloutCta)
    cssVars['--callout-height'] = 'var(--callout-max-height)'

  const selectedHit = useRef(null)
  const [hitsTabIndex, setHitsTabIndex] = useState(null)

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [hitsTabIndex])
  console.log({ hitsTabIndex })

  useEffect(() => {
    if (selectedHit?.current) {
      scrollToActive(selectedHit.current)
    }
  }, [hitsTabIndex])

  function onKeyDown(e) {
    switch ([e.ctrlKey, e.keyCode].join(',')) {
      // [Escape]
      case 'false,27':
        setHitsTabIndex(null)
        return handleEscape()
      // [ArrowDown]
      // [Ctrl-n]
      case 'false,40':
      case 'true,78':
        e.preventDefault()
        if (!hitsTabIndex) {
          setHitsTabIndex(0)
          scrollToActive()
        }
        return incrementTabIndex()
      // [ArrowUp]
      // [Ctrl-p]
      case 'false,38':
      case 'true,80':
        e.preventDefault()
        return decrementTabIndex()
    }
  }

  function incrementTabIndex() {
    let startIndex = hitsTabIndex || 0
    const nextIndex = startIndex + 1
    if (nextIndex >= items.length) return setHitsTabIndex(0)
    setHitsTabIndex(nextIndex)
  }

  function decrementTabIndex() {
    let startIndex = hitsTabIndex || 0
    const nextIndex = startIndex - 1
    if (nextIndex < 0) return setHitsTabIndex(items.length - 1)
    setHitsTabIndex(nextIndex)
  }

  function scrollToActive(el) {
    if (!el) return
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'nearest',
    })
    el.focus({
      preventScroll: true,
    })
  }

  return (
    <div className={classNames(s.root, className)} style={cssVars}>
      <Configure distinct={1} hitsPerPage={10} clickAnalytics />
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
        activeHit={items[hitsTabIndex]}
      />
      {query && !isCancelled && (
        <div className={h.hitsRoot}>
          <HelpMessage query={query} />
          {showSearchLegend && <SearchLegend />}
          <ul
            className={h.hitsList}
            id={SEARCH_RESULTS_ID}
            role="listbox"
            aria-labelledby={SEARCH_BOX_LABEL_ID}
          >
            {indexes.map((index) => (
              <Index key={index} indexName={index}>
                <Hits
                  {...{
                    handleEscape,
                    query,
                    renderHitContent,
                    resolveHitLink,
                    setCancelled,
                    selectedHit,
                    hitsTabIndex,
                    activeHit: items[hitsTabIndex],
                  }}
                />
              </Index>
            ))}
          </ul>
          {renderCalloutCta && (
            <div className={h.calloutCta}>{renderCalloutCta()}</div>
          )}
        </div>
      )}
    </div>
  )
}

export default function SearchWrapper(props) {
  const { indexName, client } = useSearch()
  return (
    <InstantSearch indexName={indexName} searchClient={client} refresh>
      <Search {...props} />
    </InstantSearch>
  )
}
export { SearchProvider, useSearch, SearchBoxElement }

const HelpMessage = connectHits(({ hits, query }) => {
  return hits.length === 0 ? (
    <div className={h.noHits}>
      <span className={h.noHitsTitle}>{`No results for ${query}...`}</span>
      <span className={h.noHitsMessage}>
        Search tips: some terms require an exact match. Try typing the entire
        term, or use a different word or phrase.
      </span>
    </div>
  ) : null
})
