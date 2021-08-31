import { forwardRef, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Highlight, connectHits } from 'react-instantsearch-dom'
import generateSlug from '@hashicorp/remark-plugins/generate_slug'
import InlineSvg from '@hashicorp/react-inline-svg'
import SearchLegend from './legend'
import { useSearch } from './provider'
import IconReturn from './img/return.svg.js'
import { SEARCH_BOX_LABEL_ID, SEARCH_RESULTS_ID } from '.'
import classNames from 'classnames'
import s from './hits.module.css'

function Hits({
  /* Props provided from connector */
  hits,
  /* Props passed explicity */
  handleEscape,
  renderHitContent,
  renderCalloutCta,
  resolveHitLink,
  query,
  setCancelled,
  showSearchLegend,
  onSetActiveHit = () => {},
}) {
  const selectedHit = useRef(null)
  const [hitsTabIndex, setHitsTabIndex] = useState(null)
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [hitsTabIndex])

  useEffect(() => {
    if (selectedHit?.current) {
      scrollToActive(selectedHit.current)
    }
    onSetActiveHit(hitsTabIndex)
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
    if (nextIndex > hits.length) return setHitsTabIndex(1)
    setHitsTabIndex(nextIndex)
  }

  function decrementTabIndex() {
    let startIndex = hitsTabIndex || 0
    const nextIndex = startIndex - 1
    if (nextIndex < 1) return setHitsTabIndex(hits.length)
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
    <div className={s.hitsRoot}>
      {hits.length === 0 ? (
        <div className={s.noHits}>
          <span className={s.noHitsTitle}>{`No results for ${query}...`}</span>
          <span className={s.noHitsMessage}>
            Search tips: some terms require an exact match. Try typing the
            entire term, or use a different word or phrase.
          </span>
        </div>
      ) : (
        <>
          {showSearchLegend && <SearchLegend />}
          <ul
            className={s.hitsList}
            id={SEARCH_RESULTS_ID}
            role="listbox"
            aria-labelledby={SEARCH_BOX_LABEL_ID}
          >
            {hits.map((hit) => {
              const isActive = hitsTabIndex === hit.__position
              return (
                <Hit
                  key={hit.objectID}
                  closeSearchResults={() => setCancelled(true)}
                  hit={hit}
                  renderHitContent={renderHitContent}
                  resolveHitLink={resolveHitLink}
                  ref={isActive ? selectedHit : undefined}
                  isActive={isActive}
                />
              )
            })}
          </ul>
        </>
      )}
      {renderCalloutCta && (
        <div className={s.calloutCta}>{renderCalloutCta()}</div>
      )}
    </div>
  )
}

export default connectHits(Hits)
export { Hits as HitsComponent }

/* eslint-disable react/display-name */

//  we need an `a` tag that also has a click handler
//  next/link passes a click handler to its child; so in order to merge ours in, we need this syntax
//  ref: https://github.com/zeit/next.js/#with-link

const LinkWithClick = forwardRef(({ children, ...props }, ref) => (
  <a {...props} ref={ref}>
    {children}
  </a>
))

const Hit = forwardRef(
  (
    { isActive, closeSearchResults, hit, renderHitContent, resolveHitLink },
    ref
  ) => {
    const { logClick, setQuery } = useSearch()
    let hitLink = resolveHitLink
      ? resolveHitLink(hit)
      : { href: `/${hit.objectID}` }

    // We append an associated heading slug to hitLink.href if and only if the search result matches one heading
    // and does not match either description or page title criteria
    if (
      hit?._highlightResult?.description?.matchLevel === 'none' &&
      hit?._highlightResult?.page_title?.matchLevel === 'none'
    ) {
      const matchedHeading = hit.headings.filter((heading, idx) => {
        return hit?._highlightResult?.headings[idx]?.matchLevel !== 'none'
      })

      if (matchedHeading.length === 1) {
        hitLink.href =
          typeof hitLink.href === 'object'
            ? { ...hitLink.href, hash: generateSlug(matchedHeading[0]) }
            : { pathname: hitLink.href, hash: generateSlug(matchedHeading[0]) }
      }
    }

    const handleClick = () => {
      logClick(hit)
      closeSearchResults()
      setQuery('')
    }

    return (
      <li
        className={s.hitItem}
        id={`hit-${hit.__position}`}
        data-testid="hit-item"
      >
        <Link {...hitLink} passHref>
          <LinkWithClick
            ref={ref}
            className={classNames(s.hitLinkWrapper, { [s.isActive]: isActive })}
            onClick={handleClick}
          >
            <div className={s.hit}>
              <div className={s.hitContent}>
                {renderHitContent({ hit, Highlight })}
              </div>
              <InlineSvg className={s.iconReturn} src={IconReturn} />
            </div>
          </LinkWithClick>
        </Link>
      </li>
    )
  }
)

/* eslint-enable */
