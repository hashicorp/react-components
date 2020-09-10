import React from 'react'
import LegacyDocsSidenav from './legacy'
import DocsSidenav from './nav'

export default function DocsSidenavWrapper({
  product,
  routes,
  baseUrl,
  activePath,
  disableFilter = false,
  Link,

  // Legacy props
  data,
  order,
  currentPage,
  category,
}) {
  if (routes) {
    return (
      <DocsSidenav
        product={product}
        routes={routes}
        baseUrl={baseUrl}
        activePath={activePath}
        disableFilter={disableFilter}
        Link={Link}
      />
    )
  }

  return (
    <LegacyDocsSidenav
      data={data}
      order={order}
      currentPage={currentPage}
      category={category}
      Link={Link}
      product={product}
      disableFilter={disableFilter}
    />
  )
}
