import { render, screen } from '@testing-library/react'
import Badge from '.'

describe('<Badge />', () => {
  it('should render the provided React children', () => {
    const badgeText = 'New'
    render(<Badge>{badgeText}</Badge>)
    const badgeElement = screen.getByText(badgeText)
    expect(badgeElement).toBeInTheDocument()
  })

  it('should render the default variant', () => {
    render(<Badge>New</Badge>)
    const badgeElement = screen.getByText('New')
    expect(badgeElement).toHaveClass('badge', 'neutral', 'primary')
    expect(badgeElement).not.toHaveClass('secondary')
  })

  it('should render the correct themed variant', () => {
    render(
      <Badge theme="consul" variant="secondary">
        New
      </Badge>
    )
    const badgeElement = screen.getByText('New')
    expect(badgeElement).toHaveClass('badge', 'consul', 'secondary')
    expect(badgeElement).not.toHaveClass('primary')
  })
})
