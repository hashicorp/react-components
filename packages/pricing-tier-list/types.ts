import { ReactElement } from 'react'
import { Theme } from '@hashicorp/react-button/types'

interface Props {
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
  tiers: Array<Props>
}

export interface PricingTierItemProps extends Props {
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

export interface PricingTierListProps {
  tiers: Array<PricingTierItemProps>
}
