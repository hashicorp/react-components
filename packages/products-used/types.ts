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
  name: Products
}

interface ProductLink extends Product {
  /**
   * Where the anchor element links to when clicked.
   */
  href: string
}
