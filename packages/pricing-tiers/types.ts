import { ReactElement } from 'react'

interface TierProps {
  /**
   * Tier name
   */
  title: string
  /**
   * Button or text link
   */
  cta: {
    url: string
    title: string
    type: 'button' | 'textLink'
    variant?: 'primary' | 'secondary'
    onClick?: () => void
  }
}

export interface PricingStickyTrayProps {
  tiers: Array<TierProps>
}

export interface PricingTierItemProps extends TierProps {
  /**
   * Flight Icon component
   */
  icon?: ReactElement
  /**
   * Pricing information
   */
  label?: string
  /**
   * Price detail
   */
  price?: string
  /**
   * Consumption detail
   */
  consumption?: string
  /**
   * Tier description (html string)
   */
  description: string
  /**
   * Small footer (html string)
   */
  footnote?: string
}

export interface PricingTiersProps {
  tiers: Array<PricingTierItemProps>
}
