import type { Products } from '@hashicorp/platform-product-meta'

export interface BadgeProps {
  children: string
  theme?: Products | 'neutral' | 'white' | 'black'
  variant?: 'primary' | 'secondary'
}
