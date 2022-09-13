import { fireEvent, render, screen } from '@testing-library/react'
import StandaloneLink from '.'

const defaultProps = {
  href: 'https://hashicorp.com',
  children: 'Call-to-action',
}

describe('<StandaloneLink />', () => {
  it('should render with default props', () => {
    render(<StandaloneLink {...defaultProps} />)
    const linkText = screen.getByText(defaultProps.children)
    const linkElement = linkText.closest('a')
    expect(linkElement).toHaveAttribute('href', defaultProps.href)
    expect(linkElement).toHaveClass('root', 'primary')
    expect(linkElement).not.toHaveClass('secondary', 'tertiary')
  })

  it('should render the correct themed variant', () => {
    render(<StandaloneLink {...defaultProps} variant="secondary" />)
    const linkText = screen.getByText(defaultProps.children)
    const linkElement = linkText.closest('a')
    expect(linkElement).toHaveClass('root', 'secondary')
    expect(linkElement).not.toHaveClass('primary', 'tertiary')
  })

  it('should call onClick function', () => {
    const mockOnClick = jest.fn()
    render(<StandaloneLink {...defaultProps} onClick={mockOnClick} />)
    const linkElement = screen.getByText(defaultProps.children).closest('a')
    fireEvent.click(linkElement)
    expect(mockOnClick).toHaveBeenCalled()
  })
})
