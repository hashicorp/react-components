import type { Products } from '@hashicorp/platform-product-meta'
import type { StandaloneLinkProps } from '@hashicorp/react-standalone-link/types'

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

export interface ActionsProps {
  /**
   * Display actions on light or dark background.
   */
  appearance?: 'light' | 'dark'
  /**
   * Display buttons inline or stacked by default.
   */
  layout?: 'inline' | 'stacked'
  /**
   * Render primary button with product color.
   */
  theme?: Products
  /**
   * Determines CTA button sizing.
   */
  size?: 'small' | 'medium'
  /**
   * Array of CTAs. Minimum of one, max of two.
   * When both CtaProps and StandaloneLinkProps are
   * provided, they are only accepted in that order.
   * This is intentional and ensures adherence to a design
   * requirement of rendering the Button first when data
   * for both a Button and a StandaloneLink are provided.
   * @see CtaProps and StandaloneLinkProps
   */
  ctas:
    | [CtaProps]
    | [StandaloneLinkProps]
    | [CtaProps, CtaProps]
    | [StandaloneLinkProps, StandaloneLinkProps]
    | [CtaProps, StandaloneLinkProps]
}
