import type { Products } from '@hashicorp/platform-product-meta'

export type ProductBadgeProps = {
  productName: Products
  appearance?: 'light' | 'dark'
  theme?: 'primary' | 'secondary'
}
