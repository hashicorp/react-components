import { render } from '@testing-library/react'
import Card from '.'

describe('<Card />', () => {
  it('should render the provided React children', () => {
    const cardText = 'Children text'
    const { container } = render(<Card>{cardText}</Card>)
    expect(container).toHaveTextContent(cardText)
  })

  it('should render the default (light) variant', () => {
    const { container } = render(<Card heading="Heading" />)
    expect(container).toHaveClass('card', 'light')
    expect(container).not.toHaveClass('dark')
  })

  it('should render the dark variant', () => {
    const { container } = render(<Card appearance="dark" heading="Heading" />)
    expect(container).toHaveClass('card', 'dark')
    expect(container).not.toHaveClass('light')
  })
})
