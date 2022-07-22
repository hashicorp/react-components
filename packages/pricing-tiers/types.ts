import { ReactElement } from 'react'
import { Theme } from '@hashicorp/react-button/types'

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
    theme?: Theme
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
  supplementaryInfo?: string
  /**
   * If rendered within a Tier Card List, font sizes depend on the amount
   * of cards in list
   */
  size?: 'lg' | 'md' | 'xs' | 'sm'
}

export interface PricingTiersProps {
  tiers: Array<PricingTierItemProps>
}
