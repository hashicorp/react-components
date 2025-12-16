/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

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
    brand?: 'neutral'
    onClick?: () => void
  }
}

export interface PricingStickyTrayProps {
  tiers: Array<TierProps>
}

export interface PricingTierItemProps extends TierProps {
  /**
   * Tag text displayed at top of card. Eg: "beta"
   */
  tag?: string
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
