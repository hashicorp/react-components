import type { Products } from '@hashicorp/platform-product-meta'
import type { ActionsProps } from '@hashicorp/react-actions/types'

export interface StepProps {
  heading: string
  description?: string
  cta: {
    title: string
    url: string
  }
}

export interface NextStepsProps {
  appearance: 'light' | 'dark'
  theme: Products
  heading: string
  description: string
  ctas?: ActionsProps['ctas']
  steps:
    | [StepProps]
    | [StepProps, StepProps]
    | [StepProps, StepProps, StepProps]
}
