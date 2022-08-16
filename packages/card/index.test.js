import { render, screen } from '@testing-library/react'
import Card from '.'

describe('<Card />', () => {
  it('should render the provided React children', () => {
    const cardText = 'New'
    render(<Card>{cardText}</Card>)
    const cardElement = screen.getByText(cardText)
    expect(cardElement).toBeInTheDocument()
  })

  it('should render the default variant', () => {
    render(<Card>New</Card>)
    const cardElement = screen.getByText('New')
    expect(cardElement).toHaveClass('card', 'neutral', 'primary')
    expect(cardElement).not.toHaveClass('secondary')
  })

  it('should render the correct themed variant', () => {
    render(
      <Card theme="consul" variant="secondary">
        New
      </Card>
    )
    const cardElement = screen.getByText('New')
    expect(cardElement).toHaveClass('card', 'consul', 'secondary')
    expect(cardElement).not.toHaveClass('primary')
  })
})
