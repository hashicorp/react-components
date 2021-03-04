import React, { useEffect, useState } from 'react'
import useProductMeta from '@hashicorp/nextjs-scripts/lib/providers/product-meta'
import Link from 'next/link'
import { useRouter } from 'next/router'
import LinkWrap, { isAbsoluteURL } from '@hashicorp/react-link-wrap'
import InlineSvg from '@hashicorp/react-inline-svg'
import svgMenuIcon from './icons/menu.svg?include'
import svgChevron from './icons/chevron.svg?include'
import svgBullet from './icons/bullet.svg?include'
import svgExternalLink from './icons/external-link.svg?include'
import fuzzysearch from 'fuzzysearch'
import s from './style.module.css'

export default function DocsSidenav({
  currentPath,
  baseRoute,
  product,
  navData,
  disableFilter = false,
}) {
  const router = useRouter()
  const pathname = router ? router.pathname : null
  const [open, setOpen] = useState(false)
  const [filterInput, setFilterInput] = useState('')
  const [content, setContent] = useState(navData)
  const [filteredContent, setFilteredContent] = useState(navData)
  const { themeClass } = useProductMeta(product)

  // When currentPath changes, update content to ensure
  // `__isActive` props on each content item are up-to-date
  // Note: we could also reset filter input here, if we don't
  // want to filter input to persist across client-side nav, ie:
  // setFilterInput("")
  useEffect(() => {
    if (!navData) return
    setContent(addIsActiveToNodes(navData, currentPath, pathname))
  }, [currentPath, navData, pathname])

  // When filter input changes, update content
  // to filter out items that don't match
  useEffect(() => {
    setFilteredContent(filterContent(content, filterInput))
  }, [filterInput, content])

  return (
    <div className={`${s.root} ${themeClass || ''}`}>
      <div className={s.toggle} onClick={() => setOpen(!open)}>
        <span>
          <InlineSvg src={svgMenuIcon} /> Documentation Menu
        </span>
      </div>
      <ul className={s.rootList} data-open={open}>
        <div className={s.mobileClose} onClick={() => setOpen(!open)}>
          &times;
        </div>
        {!disableFilter && (
          <input
            className={s.filterInput}
            placeholder="Filter..."
            onChange={(e) => setFilterInput(e.target.value)}
            value={filterInput}
          />
        )}
        <NavTree
          baseRoute={baseRoute}
          content={filteredContent || []}
          currentPath={currentPath}
          Link={Link}
        />
      </ul>
    </div>
  )
}

function addIsActiveToNodes(navNodes, currentPath, pathname) {
  return navNodes
    .slice()
    .map((node) => addIsActiveToNode(node, currentPath, pathname))
}

function addIsActiveToNode(navNode, currentPath, pathname) {
  // If it's a node with child routes, return true
  // if any of the child routes are active
  if (navNode.routes) {
    const routesWithActive = addIsActiveToNodes(
      navNode.routes,
      currentPath,
      pathname
    )
    const isActive = routesWithActive.filter((r) => r.__isActive).length > 0
    return { ...navNode, routes: routesWithActive, __isActive: isActive }
  }
  // If it's a node with a path value,
  // return true if the path is a match
  if (navNode.path) {
    const isActive = navNode.path === currentPath
    return { ...navNode, __isActive: isActive }
  }
  // If it's a direct link,
  // return true if the path matches the router.pathname
  if (navNode.href) {
    const isActive = navNode.href === pathname
    return { ...navNode, __isActive: isActive }
  }
  // Otherwise, it's a divider, so return unmodified
  return navNode
}

function filterContent(content, searchValue) {
  // if there's no search searchValue we short-circuit and return everything
  if (!searchValue) return content
  return content.reduce((acc, item) => {
    // if this is a divider node, don't show it in filtered results
    if (item.divider) return acc
    // all other nodes have a title, use it to check if the item is a direct match
    const isTitleMatch = fuzzysearch(searchValue, item.title.toLowerCase())
    //  For nodes with no children, return early, only add the item if the title matches
    if (!item.routes) return isTitleMatch ? acc.concat(item) : acc
    // for branch nodes with matching children, return a clone of the
    // node with filtered content children
    const filteredRoutes = filterContent(item.routes, searchValue)
    const filteredItem = isTitleMatch
      ? { ...item, __isFiltered: true }
      : { ...item, routes: filteredRoutes, __isFiltered: true }
    const isCategoryMatch = isTitleMatch || filteredRoutes.length > 0
    return isCategoryMatch ? acc.concat(filteredItem) : acc
  }, [])
}

function NavTree({ baseRoute, content }) {
  return content.map((item, idx) => {
    //  Dividers
    if (item.divider) {
      // eslint-disable-next-line react/no-array-index-key
      return <Divider key={idx} />
    }
    // Direct links
    if (item.title && item.href) {
      return (
        <DirectLink
          key={item.title + item.href}
          title={item.title}
          href={item.href}
          isActive={item.__isActive}
        />
      )
    }
    // Individual pages (leaf nodes)
    if (item.path) {
      return (
        <NavLeaf
          key={item.path}
          title={item.title}
          isActive={item.__isActive}
          url={`/${baseRoute}/${item.path}`}
        />
      )
    }
    // Otherwise, render a nav branch
    // (this will recurse and render a nav tree)
    return (
      <NavBranch
        key={item.title}
        title={item.title}
        routes={item.routes}
        isActive={item.__isActive}
        isFiltered={item.__isFiltered}
        baseRoute={baseRoute}
      />
    )
  })
}

function NavLeaf({ title, url, isActive }) {
  // if the item has a path, it's a leaf node so we render a link to the page
  return (
    <li>
      <Link href={url}>
        <a className={s.navItem} data-is-active={isActive}>
          <InlineSvg
            src={svgBullet}
            className={s.navLeafIcon}
            data-is-active={isActive}
          />
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </a>
      </Link>
    </li>
  )
}

function NavBranch({ title, routes, baseRoute, isActive, isFiltered }) {
  const [isOpen, setIsOpen] = useState(false)

  // Ensure categories appear open if they're active
  // or match the current filter
  useEffect(() => setIsOpen(isActive || isFiltered), [isActive, isFiltered])

  return (
    <li>
      <button
        className={s.navItem}
        onClick={() => setIsOpen(!isOpen)}
        data-is-open={isOpen}
        data-is-active={isActive}
      >
        <InlineSvg
          src={svgChevron}
          className={s.navBranchIcon}
          data-is-open={isOpen}
          data-is-active={isActive}
        />
        <span dangerouslySetInnerHTML={{ __html: title }} />
      </button>

      <ul className={s.navBranchSubnav} data-is-open={isOpen}>
        <NavTree baseRoute={baseRoute} content={routes} />
      </ul>
    </li>
  )
}

function Divider() {
  return <hr className={s.divider} />
}

function DirectLink({ title, href, isActive }) {
  return (
    <li>
      <LinkWrap
        className={s.navItem}
        href={href}
        Link={Link}
        data-is-active={isActive}
      >
        <InlineSvg
          src={svgBullet}
          className={s.navLeafIcon}
          data-is-active={isActive}
        />
        <span dangerouslySetInnerHTML={{ __html: title }} />
        {isAbsoluteURL(href) ? (
          <InlineSvg src={svgExternalLink} className={s.externalLinkIcon} />
        ) : null}
      </LinkWrap>
    </li>
  )
}
