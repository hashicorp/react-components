import type { Products } from '@hashicorp/platform-product-meta'

interface CtaProps {
  /**
   * The text that appears inside the button.
   */
  title: string
  /**
   * Where the button links to when clicked.
   */
  url: string
  /**
   * Applies a styling to the button based on the desired hierarchy.
   */
  variant?: 'primary' | 'secondary' | 'tertiary-neutral'
  /**
   * A function that will be called when the button is clicked.
   */
  onClick?: () => void
}

type SingleCta = [CtaProps]
type DuoCta = [CtaProps, CtaProps]

export interface ActionsProps {
  /**
   * Display buttons inline or stacked by default.
   */
  layout?: 'inline' | 'stacked'
  /**
   * Render primary button with product color.
   */
  brand?: Products
  /**
   * Determines CTA button sizing.
   */
  size?: 'small' | 'medium'
  /**
   * Array of CTAs. Minimum of one, max of two.
   * @see CtaProps
   */
  ctas: SingleCta | DuoCta
}
