import React, { useEffect, useState } from 'react'
import useProductMeta from '@hashicorp/nextjs-scripts/lib/providers/product-meta'
import Link from 'next/link'
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
  const [open, setOpen] = useState(false)
  const [filterInput, setFilterInput] = useState('')
  const { themeClass } = useProductMeta(product)
  const [content, setContent] = useState(navData)
  const [filteredContent, setFilteredContent] = useState(navData)

  // When currentPath changes, update content
  // to ensure `__isActive` props on each content item
  // are accurate and up-to-date
  // (Note: we could also reset filter input here,
  // if we don't want to filter input to persist
  // across client-side navigation, with something like:
  // setFilterInput("")
  useEffect(() => {
    if (!navData) return
    setContent(addIsActiveToNodes(navData, currentPath))
  }, [currentPath, navData])

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

function addIsActiveToNodes(navNodes, currentPath) {
  return navNodes.slice().map((node) => addIsActiveToNode(node, currentPath))
}

function addIsActiveToNode(navNode, currentPath) {
  // If it's a node with child routes, return true
  // if any of the child routes are active
  if (navNode.routes) {
    const routesWithActive = addIsActiveToNodes(navNode.routes, currentPath)
    const isActive = routesWithActive.filter((r) => r.__isActive).length > 0
    return { ...navNode, routes: routesWithActive, __isActive: isActive }
  }
  // If it's a node with a path value,
  // return true if the path is a match
  if (navNode.path) {
    const isActive = navNode.path === currentPath
    return { ...navNode, __isActive: isActive }
  }
  // Otherwise, return false
  // (for dividers, external links, etc)
  // TODO - do we need to worry about highlighting external links? yes probably,
  // sometimes these are used not as "external" but to internal links outside the baseRoute
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

function NavTree({ content, baseRoute, Link }) {
  return content.map((item, idx) => {
    //  Dividers
    if (item.divider) {
      // eslint-disable-next-line react/no-array-index-key
      return <Divider key={idx} />
    }
    // Direct links
    if (item.title && item.href) {
      return <DirectLink key={item.title} title={item.title} href={item.href} />
    }
    // Individual pages (leaf nodes)
    if (item.path) {
      return (
        <NavLeaf
          key={item.path}
          title={item.title}
          isActive={item.__isActive}
          url={`/${baseRoute}/${item.path}`}
          Link={Link}
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
        Link={Link}
      />
    )
  })
}

function NavLeaf({ title, url, Link, isActive }) {
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

function NavBranch({ title, routes, baseRoute, isActive, isFiltered, Link }) {
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
        <NavTree baseRoute={baseRoute} content={routes} Link={Link} />
      </ul>
    </li>
  )
}

function Divider() {
  return <hr className={s.divider} />
}

function DirectLink({ title, href }) {
  return (
    <li>
      <a className={s.navItem} href={href}>
        <InlineSvg src={svgBullet} className={s.navLeafIcon} />
        <span dangerouslySetInnerHTML={{ __html: title }} />
        <InlineSvg src={svgExternalLink} className={s.externalLinkIcon} />
      </a>
    </li>
  )
}
