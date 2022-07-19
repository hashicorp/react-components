import { screen, render, cleanup } from '@testing-library/react'
import PricingTierList from '.'
import tiersData from './fixtures/tiersData.json'

const { oneTier, twoTiers, threeTiers, fourTiers, fiveTiers } = tiersData

afterEach(cleanup)

describe('<PricingTierList />', () => {
  it('should render', () => {
    render(<PricingTierList tiers={twoTiers} />)
    const element = screen.getByTestId('pricing-tier-list')
    expect(element).toBeInTheDocument()
  })

  it('should throw error when tiers length more than maximum', () => {
    expect(() =>
      render(<PricingTierList tiers={[...threeTiers, ...fiveTiers]} />)
    ).toThrow('<PricingTierList /> only supports up to five tiers')
  })

  it('should have the correct className with 1 tier', () => {
    const { container } = render(<PricingTierList tiers={oneTier} />)
    const listElement = container.querySelector('.length1')
    expect(listElement).toBeInTheDocument()
  })

  it('should have the correct className with 2 tiers', () => {
    const { container } = render(<PricingTierList tiers={twoTiers} />)
    const listElement = container.querySelector('.length2')
    expect(listElement).toBeInTheDocument()
  })

  it('should have the correct className and sized cards with 3 tiers', () => {
    const { container } = render(<PricingTierList tiers={threeTiers} />)
    const listElement = container.querySelector('.length3')
    expect(listElement).toBeInTheDocument()
  })

  it('should have the correct className and sized cards with 4 tiers', () => {
    const { container } = render(<PricingTierList tiers={fourTiers} />)
    const listElement = container.querySelector('.length4')
    expect(listElement).toBeInTheDocument()
  })

  it('should have the correct className and sized cards with 5 tiers', () => {
    const { container } = render(<PricingTierList tiers={fiveTiers} />)
    const listElement = container.querySelector('.length5')
    expect(listElement).toBeInTheDocument()
  })
})
