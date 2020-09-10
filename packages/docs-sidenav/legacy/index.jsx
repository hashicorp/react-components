import React, { useMemo } from 'react'
import { transformLegacyDataToRoutes } from './transform'
import DocsSidenav from '../nav'

export default function LegacyDocsSidenav({
  data,
  order,
  currentPage,
  category,
  Link,
  product,
  disableFilter = false,
}) {
  const legacyRoutes = useMemo(() => {
    return transformLegacyDataToRoutes(
      category,
      currentPage,
      order,
      data
    )
  }, [data, order, category, currentPage])

  return (
    <DocsSidenav
      product={product}
      routes={legacyRoutes}
      baseUrl={`/${category}`}
      activePath={currentPage.replace(new RegExp(`^/${category}/`), '').replace(/\?.*$/, '')}
      disableFilter={disableFilter}
      Link={Link}
    />
  )
}
