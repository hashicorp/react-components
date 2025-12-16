/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { screen, render, cleanup } from '@testing-library/react'
import PricingTiers from '.'
import { PricingTierItemProps } from './types'

afterEach(cleanup)

describe('<PricingTiers />', () => {
  it('should render', () => {
    render(<PricingTiers tiers={twoTiers} />)
    const element = screen.getByTestId('pricing-tiers')
    expect(element).toBeInTheDocument()
  })

  it('should only show text links with 5 tiers', () => {
    const { container } = render(<PricingTiers tiers={fiveTiers} />)
    expect(container.querySelector('button')).not.toBeInTheDocument()
  })

  it('should throw error when tiers length more than maximum', () => {
    expect(() =>
      render(<PricingTiers tiers={[...threeTiers, ...fiveTiers]} />)
    ).toThrow('<PricingTiers /> only supports up to five tiers')
  })

  it('should have the correct className with 1 tier', () => {
    const { container } = render(<PricingTiers tiers={oneTier} />)
    const listElement = container.querySelector('.length1')
    expect(listElement).toBeInTheDocument()
  })

  it('should have the correct className with 2 tiers', () => {
    const { container } = render(<PricingTiers tiers={twoTiers} />)
    const listElement = container.querySelector('.length2')
    expect(listElement).toBeInTheDocument()
  })

  it('should have the correct className and sized cards with 3 tiers', () => {
    const { container } = render(<PricingTiers tiers={threeTiers} />)
    const listElement = container.querySelector('.length3')
    expect(listElement).toBeInTheDocument()
  })

  it('should have the correct className and sized cards with 4 tiers', () => {
    const { container } = render(<PricingTiers tiers={fourTiers} />)
    const listElement = container.querySelector('.length4')
    expect(listElement).toBeInTheDocument()
  })

  it('should have the correct className and sized cards with 5 tiers', () => {
    const { container } = render(<PricingTiers tiers={fiveTiers} />)
    const listElement = container.querySelector('.length5')
    expect(listElement).toBeInTheDocument()
  })
})

const oneTier: PricingTierItemProps[] = [
  {
    title: 'Development',
    price: 'Custom Pricing',
    description:
      '<p>Managed by your team on your infrastructure of choice. Recommended for teams with custom deployment requirements</p>',
    cta: {
      type: 'button',
      url: '#',
      title: 'Try it for free',
      variant: 'secondary',
    },
  },
]
const twoTiers: PricingTierItemProps[] = [
  ...oneTier,
  {
    title: 'Starter',
    price: 'Custom Pricing',
    description:
      '<p>Managed by your team on your infrastructure of choice. Recommended for teams with custom deployment requirements</p>',
    cta: {
      type: 'button',
      url: '#',
      title: 'Contact sales',
      variant: 'secondary',
    },
  },
]
const threeTiers: PricingTierItemProps[] = [
  ...twoTiers,
  {
    title: 'Standard',
    label: 'Starting at',
    price: '$1.578',
    consumption: 'per hour',
    description:
      '<p>Clusters designed to scale with the demand of running production workloads.</p>',
    cta: {
      type: 'textLink',
      url: '#',
      title: 'Try it for free',
    },
    footnote: '<p>*Price scales with <a>active clients</a></p>',
  },
]
const fourTiers: PricingTierItemProps[] = [
  ...threeTiers,
  {
    title: 'Plus',
    label: 'Starting at',
    price: '$1.844',
    consumption: 'per hour',
    description:
      '<p>Designed for high availability replication of secrets and policies across multiple data centers. Requires 2 clusters for replication.</p>',
    cta: {
      type: 'textLink',
      url: '#',
      title: 'Try it for free',
    },
    footnote: '<p>*Price scales with <a>active clients</a></p>',
  },
]
const fiveTiers: PricingTierItemProps[] = [
  ...fourTiers,
  {
    title: 'Enterprise',
    description: '<p>Designed for custom deployments</p>',
    cta: {
      type: 'textLink',
      url: '#',
      title: 'Contact sales',
    },
  },
]
