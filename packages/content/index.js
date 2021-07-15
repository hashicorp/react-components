import React from 'react'
import useProductMeta from '@hashicorp/platform-product-meta'
import s from './style.module.css'

export default function Content({ content, product }) {
  const { themeClass } = useProductMeta(product)

  return (
    <article className={`${s.root} ${themeClass ?? ''}`}>{content}</article>
  )
}
