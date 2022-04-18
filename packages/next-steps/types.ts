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

type SingleSteps = [StepProps]
type DuoSteps = [StepProps, StepProps]
type TrioSteps = [StepProps, StepProps, StepProps]

export interface NextStepsProps {
  appearance: 'light' | 'dark'
  theme: Products
  heading: string
  description: string
  actions?: ActionsProps['ctas']
  steps: SingleSteps | DuoSteps | TrioSteps
}
