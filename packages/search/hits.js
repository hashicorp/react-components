import { forwardRef } from 'react'
import Link from 'next/link'
import { Highlight, connectHits } from 'react-instantsearch-dom'
import generateSlug from '@hashicorp/remark-plugins/generate_slug'
import InlineSvg from '@hashicorp/react-inline-svg'
import { useSearch } from './provider'
import IconReturn from './img/return.svg.js'
import classNames from 'classnames'
import s from './hits.module.css'

function Hits({
  /* props injected by connectHits */
  hits,
  indexContextValue,
  /* Props passed explicity */
  renderHitContent,
  resolveHitLink,
  setCancelled,
  activeHit,
  selectedHit,
}) {
  return (
    <>
      {hits.map((hit) => {
        const key = `${indexContextValue?.targetedIndex}::${hit.objectID}`
        const isActive = activeHit === key
        return (
          <Hit
            indexName={indexContextValue?.targetedIndex}
            key={key}
            closeSearchResults={() => setCancelled(true)}
            hit={hit}
            renderHitContent={renderHitContent}
            resolveHitLink={resolveHitLink}
            ref={isActive ? selectedHit : undefined}
            isActive={isActive}
          />
        )
      })}
    </>
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
    {
      isActive,
      closeSearchResults,
      hit,
      renderHitContent,
      resolveHitLink,
      indexName,
    },
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

    const id = `hit-${indexName}::${hit.objectID}`
    return (
      <li className={s.hitItem} id={id} data-testid="hit-item">
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
