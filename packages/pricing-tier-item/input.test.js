import { render, screen } from '@testing-library/react'
import PricingTierItem from '.'

describe('<PricingTierItem />', () => {
  it('should render', () => {
    render(<PricingTierItem />)
    expect(screen.getByText('Company, Role')).toBeInTheDocument()
  })
})
