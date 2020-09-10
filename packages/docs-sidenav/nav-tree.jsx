import React from 'react'
import PropTypes from 'prop-types'
import NavContainer from './nav-container'
import NavLink from './nav-link'

// NOTE: All paths used in this component are referring to content paths, ie.
// only the portion of the path after `/docs/<version>/` in the url

// Recursively renders the markup for the nested navigation
export default function NavTree({
  routes,
  baseUrl,
  activePath,
  allExpanded,
  Link,
}) {
  return (
    <>
      {routes.map((route, idx) => {
        if (route.divider) {
          // eslint-disable-next-line react/no-array-index-key
          return <hr key={idx} />
        }

        if (route.routes) {
          const active = routeIsActive(route, activePath)
          return (
            <NavContainer
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              title={route.title}
              expanded={active || allExpanded}
              active={active}
            >
              <NavTree
                routes={route.routes}
                baseUrl={baseUrl}
                activePath={activePath}
                allExpanded={allExpanded}
                Link={Link}
              />
            </NavContainer>
          )
        }

        if (route.path) {
          return (
            <NavLink
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              title={route.title}
              href={`${baseUrl}/${route.path}`}
              active={route.canonical !== false && route.path === activePath}
              Link={Link}
            />
          )
        }

        return (
          <NavLink
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            title={route.title}
            href={route.href}
            Link={Link}
          />
        )
      })}
    </>
  )
}

NavTree.propTypes = {
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
  Link: PropTypes.func,
}

// A route is active if it is active, or one of its child routes are active
function routeIsActive(route, activePath) {
  if (route.canonical !== false && route.path === activePath) {
    return true
  }
  return (
    !!route.routes && route.routes.some((r) => routeIsActive(r, activePath))
  )
}
