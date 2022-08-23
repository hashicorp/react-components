import { screen, render, cleanup } from '@testing-library/react'
import PricingTiers from '.'
import tiersData from './fixtures/tiersData.json'

const { oneTier, twoTiers, threeTiers, fourTiers, fiveTiers } = tiersData

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
