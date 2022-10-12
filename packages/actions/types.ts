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

interface ButtonCtaProps extends CtaProps {
  type?: 'button' | undefined
}

interface StandaloneLinkCtaProps extends CtaProps {
  type: 'standalone-link'
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
   * When both a Button and StandaloneLink are
   * rendered, they can only render in said order.
   * This is intentional and ensures adherence to a design
   * requirement of rendering the Button first when data
   * for both a Button and a StandaloneLink are provided.
   * @see CtaProps
   */
  ctas:
    | [ButtonCtaProps]
    | [StandaloneLinkCtaProps]
    | [ButtonCtaProps, ButtonCtaProps]
    | [StandaloneLinkCtaProps, StandaloneLinkCtaProps]
    | [ButtonCtaProps, StandaloneLinkCtaProps]
}
