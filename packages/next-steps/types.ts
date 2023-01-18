import type { Products } from '@hashicorp/platform-product-meta'
import type { ActionsProps } from '@hashicorp/react-actions/types'

export interface StepProps {
  /**
   * The heading for the step.
   */
  heading: string
  /**
   * Optional badge for the step.
   */
  badge?: string
  /**
   * Optional description for the step.
   */
  description?: string
  /**
   * The call to action for the step.
   */
  cta: {
    title: string
    url: string
  }
}

export interface NextStepsProps {
  /**
   * Render NextSteps on light or dark background.
   */
  appearance?: 'light' | 'dark'
  /**
   * Optional theme which controls the primary step color.
   */
  theme?: Products
  /**
   * The heading for the section.
   */
  heading: string
  /**
   * The description for the section.
   */
  description: string
  /**
   * Optional ctas displayed below the heading and description.
   */
  ctas?: ActionsProps['ctas']
  /**
   * The list of steps to display as tiles.
   */
  steps:
    | [StepProps]
    | [StepProps, StepProps]
    | [StepProps, StepProps, StepProps]
  /**
   * Optional tertiary CTA. Displayed below the tiles.
   * Only renders if there are less than 3 tiles and no CTAs
   * (see above) provided.
   */
  tertiaryCta?: {
    copy: string
    href: string
    ctaText: string
  }
}
