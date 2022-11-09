import { render, screen } from '@testing-library/react'
import Card from './'

const defaultProps = {
  link: 'https://hashicorp.com',
  heading: 'Example heading',
  description: 'Example description',
  meta: ['August 15, 2022', 'Category'],
  thumbnail: {
    src: 'https://www.datocms-assets.com/19447/1648680074-screenshot-2022-03-31-at-00-40-47.png',
    alt: 'HashiConf Europe 2022 Recap',
  },
}

describe('<Card />', () => {
  // Prop tests
  it('should render the provided link prop', () => {
    render(<Card {...defaultProps} />)

    expect(screen.getByRole('link')).toHaveAttribute('href', defaultProps.link)
  })

  it('should render the provided heading prop', () => {
    render(<Card {...defaultProps} />)

    const heading = screen.getByText(defaultProps.heading)
    expect(heading.tagName).toBe('H2')
  })

  it('should render the provided description prop', () => {
    render(<Card {...defaultProps} />)

    const description = screen.getByText(defaultProps.description)
    expect(description.tagName).toBe('P')
  })

  it('should render the provided meta prop (single item)', () => {
    const cardMeta = ['Category']

    render(<Card {...defaultProps} meta={cardMeta} />)

    const metaElement = screen.getByTestId('wpl-card-meta')
    expect(metaElement).toContainElement(screen.getByText(cardMeta[0]))
  })

  it('should render the provided meta prop (two items)', () => {
    const cardMeta = ['August 15, 2022', 'Category']

    render(<Card {...defaultProps} />)

    const metaElement = screen.getByTestId('wpl-card-meta')

    cardMeta.forEach((item) => {
      expect(metaElement).toContainElement(screen.getByText(item))
    })
    expect(metaElement).toContainElement(screen.getByText('|'))
  })

  it('should render the provided thumbnail prop', () => {
    const { getByAltText } = render(<Card {...defaultProps} />)

    expect(getByAltText(defaultProps.thumbnail.alt).tagName).toBe('IMG')
  })

  // Appearance tests

  it('should render the default (light) variant', () => {
    const { container } = render(<Card {...defaultProps} />)

    expect(container.firstChild).toHaveClass('card', 'light')
    expect(container.firstChild).not.toHaveClass('dark')
  })

  it('should render the dark variant', () => {
    const { container } = render(<Card appearance="dark" {...defaultProps} />)

    expect(container.firstChild).toHaveClass('card', 'dark')
    expect(container.firstChild).not.toHaveClass('light')
  })
})
