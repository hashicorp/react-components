import type { Products } from '@hashicorp/platform-product-meta'

export type ProductBadgeProps = BaseProps & ConditionalProps

type BaseProps = {
  productName: Products
  appearance?: 'light' | 'dark'
}

type ConditionalProps =
  | {
      theme?: 'primary'
      hasDot?: never
    }
  | {
      theme?: 'secondary'
      hasDot?: boolean
    }
