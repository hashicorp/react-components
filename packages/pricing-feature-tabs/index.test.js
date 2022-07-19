import { render, screen } from '@testing-library/react'
import PricingFeatureTabs from '.'
import featuresData from './fixtures/featuresData.json'

const { features, overMax, underMin } = featuresData

describe('<PricingFeatureTabs />', () => {
  it('should render', () => {
    render(<PricingFeatureTabs features={features} />)
    const element = screen.getByTestId('pricing-feature-tabs')
    expect(element).toBeInTheDocument()
  })

  it('should throw error when features length more than maximum', () => {
    expect(() => render(<PricingFeatureTabs features={overMax} />)).toThrow(
      '<PricingFeatureTabs /> only supports between 3 and 7 tabs'
    )
  })

  it('should throw error when features length less than minimum', () => {
    expect(() => render(<PricingFeatureTabs features={underMin} />)).toThrow(
      '<PricingFeatureTabs /> only supports between 3 and 7 tabs'
    )
  })
})
