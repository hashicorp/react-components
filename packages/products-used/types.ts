import type { Products } from '@hashicorp/platform-product-meta'

export interface ProductsUsedProps {
  appearance?: 'light' | 'dark'
  products: Array<Product> | Array<ProductLink>
}

interface Product {
  name: Products
}

interface ProductLink extends Product {
  href: string
}
