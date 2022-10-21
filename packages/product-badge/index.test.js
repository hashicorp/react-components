import { render, screen } from '@testing-library/react'
import ProductBadge from '.'

describe('<ProductBadge />', () => {
  it('should render the name of the product', () => {
    const productName = 'waypoint'
    render(<ProductBadge productName={productName} />)
    const productBadgeEl = screen.getByText(productName)
    expect(productBadgeEl).toBeInTheDocument()
  })

  it('should render the default theme', () => {
    const productName = 'Consul'
    render(<ProductBadge productName={productName} />)
    const productBadgeEl = screen.getByText(productName)
    expect(productBadgeEl).toHaveClass('light', 'primary')
    expect(productBadgeEl).not.toHaveClass('secondary', 'dark')
  })

  it('should render the correct theme', () => {
    const productName = 'Packer'
    render(
      <ProductBadge
        productName={productName}
        appearance={'dark'}
        theme={'secondary'}
      />
    )
    const productBadgeEl = screen.getByText(productName)
    expect(productBadgeEl).toHaveClass('text', 'dark', 'secondary')
    expect(productBadgeEl).not.toHaveClass('primary', 'light')
  })
})
