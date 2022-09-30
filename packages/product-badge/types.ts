import type { Products } from '@hashicorp/platform-product-meta'

export interface ProductBadgeProps {
  productName: Products
  appearance?: 'light' | 'dark'
}
