import type { Products } from '@hashicorp/platform-product-meta'
import type { ActionsProps } from '@hashicorp/react-actions/types'

export interface NextStepsProps {
  appearance: 'light' | 'dark'
  theme: Products
  heading: string
  description: string
  actions?: ActionsProps['ctas']
}
