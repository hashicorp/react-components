import { render, screen } from '@testing-library/react'
import Intro from '.'

describe('<Intro />', () => {
  it('should render default elements', () => {
    const eyebrow = 'Eyebrow'
    const heading = 'Heading'
    const description = 'Description'
    render(
      <Intro eyebrow={eyebrow} heading={heading} description={description} />
    )
    const element = screen.getByTestId('intro')
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent(eyebrow)
    expect(element).toHaveTextContent(heading)
    expect(element).toHaveTextContent(description)
  })

  it('should render actions', () => {
    render(
      <Intro
        heading="Heading"
        description="Description"
        actions={{
          ctas: [
            { title: 'One', url: '/one' },
            { title: 'Two', url: '/two' },
          ],
        }}
      />
    )
    const actions = screen.getByTestId('actions')
    const ctaOne = screen.getByText('One')
    const ctaTwo = screen.getByText('Two')
    expect(actions).toBeInTheDocument()
    expect(ctaOne.closest('a').getAttribute('href')).toBe('/one')
    expect(ctaTwo.closest('a').getAttribute('href')).toBe('/two')
  })

  it('should center text', () => {
    render(
      <Intro
        textAlignment="center"
        eyebrow="Eyebrow"
        heading="Heading"
        description="Description"
      />
    )
    const intro = screen.getByTestId('intro')
    expect(intro).toHaveClass('center')
  })
})
