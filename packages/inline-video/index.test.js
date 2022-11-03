import { render, screen } from '@testing-library/react'
import InlineVideo from '.'

const defaultProps = {
  appearance: 'light',
  gradientPosition: 'left',
  url: 'https://youtu.be/nJ0aI6sEDRo',
  description:
    'Description - 2 lines with character limit of 90. Tempus in egestas sagittis nulla feugiat',
}

describe('<InlineVideo />', () => {
  it('renders the provided description text', () => {
    render(<InlineVideo {...defaultProps} />)
    const element = screen.getByText(defaultProps.description)
    expect(element).toBeInTheDocument()
  })

  it('should not render the description element if no text provided', () => {
    render(<InlineVideo url={defaultProps.url} />)

    const element = screen.queryByText(defaultProps.description)
    expect(element).not.toBeInTheDocument()
  })

  it('should render the regular player by default', () => {
    render(<InlineVideo {...defaultProps} />)

    const element = screen.getByTestId('youtube-player')
    expect(element).toBeInTheDocument()
  })

  it('should render the Wistia player for non-Wistia videos', () => {
    render(
      <InlineVideo
        {...defaultProps}
        url="https://hashicorp.wistia.com/medias/glovs5atuj"
      />
    )

    const element = screen.getByTestId('wistia-player')
    expect(element).toBeInTheDocument()
  })

  it('should render the default (light) appearance', () => {
    const { container } = render(<InlineVideo {...defaultProps} />)

    expect(container.firstChild).toHaveClass('inlineVideo', 'light')
    expect(container.firstChild).not.toHaveClass('dark')
  })

  it('should render the dark appearance', () => {
    const { container } = render(
      <InlineVideo {...defaultProps} appearance="dark" />
    )

    expect(container.firstChild).toHaveClass('inlineVideo', 'dark')
    expect(container.firstChild).not.toHaveClass('light')
  })

  it('should render with the gradient positioned on the left by default', () => {
    const { container } = render(<InlineVideo {...defaultProps} />)

    expect(container.firstChild).toHaveClass('inlineVideo', 'left')
    expect(container.firstChild).not.toHaveClass('right')
  })

  it('should render with gradient positioned on the right', () => {
    const { container } = render(
      <InlineVideo {...defaultProps} gradientPosition="right" />
    )

    expect(container.firstChild).toHaveClass('inlineVideo', 'right')
    expect(container.firstChild).not.toHaveClass('left')
  })
})
