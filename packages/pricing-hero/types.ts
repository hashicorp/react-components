import { PricingTierItemProps } from '@hashicorp/react-pricing-tier-list/types'

export interface PricingHeroProps {
  /**
   * Hero title
   */
  title: string
  /**
   * Pricing tier info
   */
  tiers: Array<PricingTierItemProps>
}
