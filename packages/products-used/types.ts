/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { Products } from '@hashicorp/platform-product-meta'

export interface ProductsUsedProps {
  /**
   * Display actions on light or dark background.
   */
  appearance?: 'light' | 'dark'
  /**
   * Array of products or products with links. Only supports one or the other, not a mix of the two.
   */
  products: Array<Product> | Array<ProductLink>
}

interface Product {
  /**
   * Renders a product name
   */
  name: Exclude<Products, 'hashicorp'>
}

interface ProductLink extends Product {
  /**
   * Where the anchor element links to when clicked.
   */
  href: string
}
