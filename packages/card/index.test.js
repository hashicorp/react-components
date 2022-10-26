import { render, screen } from '@testing-library/react'
import Card from '.'

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

  // Children render tests

  it('should render provided Thumbnail sub-component children', () => {
    const { getByAltText } = render(
      <Card link={defaultProps.link}>
        <Card.Thumbnail {...defaultProps.thumbnail} />
      </Card>
    )

    expect(getByAltText(defaultProps.thumbnail.alt).tagName).toBe('IMG')
  })

  it('should render provided Meta sub-component children', () => {
    render(
      <Card link={defaultProps.link}>
        <Card.Meta items={defaultProps.meta} />
      </Card>
    )

    const metaElement = screen.getByTestId('wpl-card-meta')

    defaultProps.meta.forEach((item) => {
      expect(metaElement).toContainElement(screen.getByText(item))
    })
  })

  it('should render provided Heading sub-component children', () => {
    render(
      <Card link={defaultProps.link}>
        <Card.Heading>{defaultProps.heading}</Card.Heading>
      </Card>
    )

    screen.getByText(defaultProps.heading)
  })

  it('should render provided Description sub-component children', () => {
    render(
      <Card link={defaultProps.link}>
        <Card.Description>{defaultProps.description}</Card.Description>
      </Card>
    )

    screen.getByText(defaultProps.description)
  })

  it('should render arbitrary JSX children', () => {
    const arbitraryText = 'Arbitrary paragraph text'
    const arbitraryParagraph = <p>{arbitraryText}</p>

    render(<Card link={defaultProps.link}>{arbitraryParagraph}</Card>)

    screen.getByText(arbitraryText)
  })

  it('should render arbitrary text content', () => {
    const arbitraryText = 'Arbitrary text'

    render(<Card link={defaultProps.link}>{arbitraryText}</Card>)

    screen.getByText(arbitraryText)
  })

  it('should not render props-based layout if children are provided', () => {
    const arbitraryText = 'Arbitrary text'

    render(
      <Card link={defaultProps.link} heading={defaultProps.heading}>
        {arbitraryText}
      </Card>
    )

    screen.getByText(arbitraryText)
    expect(screen.queryByText(defaultProps.heading)).not.toBeInTheDocument()
  })

  it('should render correct levels for the Heading sub-component via the as prop', () => {
    render(
      <Card link={defaultProps.link}>
        <Card.Heading>As h2</Card.Heading>
        <Card.Heading as="h3">As h3</Card.Heading>
        <Card.Heading as="h4">As h4</Card.Heading>
      </Card>
    )

    expect(screen.getByText('As h2').tagName).toBe('H2')
    expect(screen.getByText('As h3').tagName).toBe('H3')
    expect(screen.getByText('As h4').tagName).toBe('H4')
  })

  it('should not render the CTA arrow when withArrow is false', () => {
    render(
      <Card link={defaultProps.link} withArrow={false}>
        Example
      </Card>
    )

    const ctaElement = screen.getByTestId('wpl-card-cta')

    expect(ctaElement).toBeEmptyDOMElement()
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
