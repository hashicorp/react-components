/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

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
