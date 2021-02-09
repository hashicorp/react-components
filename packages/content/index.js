import React from 'react'
import useProductMeta from '@hashicorp/nextjs-scripts/lib/providers/product-meta'

export default function Content({ content, product }) {
  const { themeClass } = useProductMeta(product)

  return (
    <article className={`g-content g-type-long-body ${themeClass ?? ''}`}>
      {content}
    </article>
  )
}
