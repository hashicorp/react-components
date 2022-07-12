import { ReactElement } from 'react'
import { Theme } from '@hashicorp/react-button/types'

export interface PricingTierItemProps {
  /**
   * Flight Icon component
   */
  icon?: ReactElement
  /**
   * Tier name
   */
  title: string
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
   * Button or text link
   */
  cta: {
    url: string
    title: string
    type: 'button' | 'textLink'
    theme?: Theme
  }
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

export interface PricingTierListProps {
  tiers: Array<PricingTierItemProps>
}
