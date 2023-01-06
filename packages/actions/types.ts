import type { Products } from '@hashicorp/platform-product-meta'

interface CtaProps {
  /**
   * The text that appears inside the button.
   */
  title: string
  /**
   * Where the button links to when clicked.
   */
  href: string
  /**
   * A function that will be called when the button is clicked.
   */
  onClick?: () => void
}

interface ButtonCtaProps extends CtaProps {
  type?: 'button'
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
   * Display buttons inline or stacked by default.
   */
  alignment?: 'left' | 'center'
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
