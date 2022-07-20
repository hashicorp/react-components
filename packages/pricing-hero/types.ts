import { PricingTierItemProps } from '@hashicorp/react-pricing-tier-list/types'
import { Products } from '@hashicorp/platform-product-meta'

export type PricingHeroProducts = Exclude<Products, 'hashicorp'>

export interface PricingHeroProps {
  /**
   * Hero title
   */
  title: string
  /**
   * Pricing tier info
   */
  tiers: Array<PricingTierItemProps>
  /**
   * color used for background blur and accent svg
   */
  backgroundAccentColor: string
  product: PricingHeroProducts
}
