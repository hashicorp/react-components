/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { Products } from '@hashicorp/platform-product-meta'

export type ProductThemes = Exclude<Products, 'hashicorp'>
export type ExtraThemes = 'neutral' | 'action'
export type BadgeThemes = ProductThemes | ExtraThemes

export interface BadgeProps {
  children: string
  variant?: 'primary' | 'secondary'
  theme?: BadgeThemes
  page?: 'light' | 'faint' | 'strong' | 'strongFaint' | 'action' | 'actionFaint'
}
