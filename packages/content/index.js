import React from 'react'
import useProductMeta from '@hashicorp/platform-product-meta'
import classnames from 'classnames'
import s from './style.module.css'

export default function Content({ content, product, className }) {
  const { themeClass } = useProductMeta(product)

  return (
    <article className={classnames(className, s.root, themeClass)}>
      {content}
    </article>
  )
}
