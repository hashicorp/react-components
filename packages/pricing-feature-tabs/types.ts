import { ReactNode } from 'react'

export interface PricingFeatureProps {
  /**
   * Icon as React Element
   */
  icon: ReactNode
  /**
   * Feature name
   */
  feature: string
  /**
   * Feature Content that belongs to feature (pricing table)
   */
  tabContent: ReactNode
}

export interface PricingFeatureTabsProps {
  features: Array<PricingFeatureProps>
}
