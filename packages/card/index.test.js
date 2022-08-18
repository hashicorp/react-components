import { render, screen } from '@testing-library/react'
import Card from '.'

describe('<Card />', () => {
  // Prop tests

  it('should render the provided heading prop', () => {
    const cardHeading = 'Example heading'

    render(<Card link="https://hashicorp.com" heading={cardHeading} />)

    const headingElement = screen.getByTestId('wpl-card-heading')
    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveTextContent(cardHeading)
  })

  it('should render the provided description prop', () => {
    const cardDescription = 'Example description'

    render(
      <Card
        link="https://hashicorp.com"
        heading="Example heading"
        description={cardDescription}
      />
    )

    const descriptionElement = screen.getByTestId('wpl-card-description')
    expect(descriptionElement).toBeInTheDocument()
    expect(descriptionElement).toHaveTextContent(cardDescription)
  })

  it('should render the provided meta prop (single item)', () => {
    const cardMeta = ['Category']

    render(
      <Card
        link="https://hashicorp.com"
        meta={cardMeta}
        heading="Example heading"
      />
    )

    const metaElement = screen.getByTestId('wpl-card-meta')
    expect(metaElement).toBeInTheDocument()
    cardMeta.forEach((item) => {
      expect(metaElement).toContainElement(screen.getByText(item))
    })
  })

  it('should render the provided meta prop (two items)', () => {
    const cardMeta = ['August 15, 2022', 'Category']

    render(
      <Card
        link="https://hashicorp.com"
        meta={cardMeta}
        heading="Example heading"
      />
    )

    const metaElement = screen.getByTestId('wpl-card-meta')
    expect(metaElement).toBeInTheDocument()

    cardMeta.forEach((item) => {
      expect(metaElement).toContainElement(screen.getByText(item))
    })
    expect(metaElement).toContainElement(screen.getByText('|'))
  })

  it('should render the provided thumbnail prop', () => {
    const thumbnail = {
      src: 'https://www.datocms-assets.com/19447/1648680074-screenshot-2022-03-31-at-00-40-47.png',
      alt: 'HashiConf Europe 2022 Recap',
    }

    const { getByAltText } = render(
      <Card
        link="https://hashicorp.com"
        thumbnail={thumbnail}
        heading="Example heading"
      />
    )

    const thumbnailElement = screen.getByTestId('wpl-card-thumbnail')
    expect(thumbnailElement).toBeInTheDocument()
    expect(getByAltText(thumbnail.alt).tagName).toBe('IMG')
  })

  // Children render tests

  it('should render the provided React children', () => {
    const cardText = 'Children text'

    render(<Card link="https://hashicorp.com">{cardText}</Card>)

    const rootElement = screen.getByTestId('wpl-card')
    expect(rootElement).toBeInTheDocument()
    expect(rootElement).toHaveTextContent(cardText)
  })

  // Appearance tests

  it('should render the default (light) variant', () => {
    render(<Card link="https://hashicorp.com" heading="Heading" />)

    const rootElement = screen.getByTestId('wpl-card')
    expect(rootElement).toBeInTheDocument()
    expect(rootElement).toHaveClass('card', 'light')
    expect(rootElement).not.toHaveClass('dark')
  })

  it('should render the dark variant', () => {
    render(
      <Card appearance="dark" link="https://hashicorp.com" heading="Heading" />
    )

    const rootElement = screen.getByTestId('wpl-card')
    expect(rootElement).toBeInTheDocument()
    expect(rootElement).toHaveClass('card', 'dark')
    expect(rootElement).not.toHaveClass('light')
  })
})
