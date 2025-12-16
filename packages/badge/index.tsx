/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import classNames from 'classnames'
import type { BadgeProps, ProductThemes } from './types'
import useProductMeta from '@hashicorp/platform-product-meta'
import s from './style.module.css'

const Badge = ({
  children,
  variant = 'primary',
  theme = 'action',
  page = 'light',
}: BadgeProps) => {
  let productName: ProductThemes | undefined
  if (theme === 'neutral' || theme === 'action') {
    productName = undefined
  } else {
    productName = theme
  }
  const { themeClass: productThemeClass } = useProductMeta(productName)
  const themeClass = productThemeClass
    ? `${productThemeClass} ${s.theme_product}`
    : s[`theme_${theme}`]

  return (
    <span
      className={classNames([
        s.root,
        s[variant],
        themeClass,
        s[`page_${page}`],
      ])}
    >
      {children}
    </span>
  )
}

export default Badge
