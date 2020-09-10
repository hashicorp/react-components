import React, { useState } from 'react'
import PropTypes from 'prop-types'
import fuzzysearch from 'fuzzysearch'
import MenuIcon from './menu-icon'
import NavTree from './nav-tree'

export default function DocsSidenav({
  product,
  routes,
  baseUrl,
  activePath,
  disableFilter = false,
  Link,
}) {
  const [open, setOpen] = useState(false)
  const [filterInput, setFilterInput] = useState('')

  const filteredRoutes = filterInput
    ? filterRoutes(routes, filterInput.toLowerCase())
    : routes

  return (
    <div
      className={`g-docs-sidenav${open ? ' open' : ''}${
        product ? ` theme-${product}` : ''
      }`}
      data-testid="root"
    >
      <div
        className="toggle"
        onClick={() => setOpen(!open)}
        data-testid="mobile-menu"
      >
        <span>
          <MenuIcon /> Documentation Menu
        </span>
      </div>
      <ul className="nav docs-nav">
        <div className="mobile-close" onClick={() => setOpen(!open)}>
          &times;
        </div>
        {!disableFilter && (
          <input
            className="filter"
            placeholder="Filter..."
            onChange={(e) => setFilterInput(e.target.value)}
            value={filterInput}
          />
        )}
        <NavTree
          routes={filteredRoutes}
          baseUrl={baseUrl}
          activePath={activePath}
          allExpanded={!!filterInput}
          Link={Link}
        />
      </ul>
    </div>
  )
}

DocsSidenav.propTypes = {
  product: PropTypes.string,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
      href: PropTypes.string,
      divider: PropTypes.bool,
      canonical: PropTypes.bool,
      routes: PropTypes.arrayOf(PropTypes.any),
    })
  ).isRequired,
  baseUrl: PropTypes.string.isRequired,
  activePath: PropTypes.string.isRequired,
  disableFilter: PropTypes.bool,
  Link: PropTypes.func,
}

function filterRoutes(routes, value) {
  if (!value) {
    return routes
  }

  return routes.reduce((acc, route) => {
    if (route.title && fuzzysearch(value, route.title.toLowerCase())) {
      acc.push(route)
      return acc
    }

    const filteredRoutes = route.routes ? filterRoutes(route.routes, value) : []
    if (filteredRoutes.length) {
      acc.push({
        ...route,
        routes: filteredRoutes,
      })
    }

    return acc
  }, [])
}
