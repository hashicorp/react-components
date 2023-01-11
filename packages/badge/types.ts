import type { Products } from '@hashicorp/platform-product-meta'

export interface BadgeProps {
  text: string
  variant?: 'primary' | 'secondary'
  theme?: Products | 'neutral' | 'action'
  page?: 'light' | 'faint' | 'strong' | 'strongFaint' | 'action' | 'actionFaint'
}
