import { render, screen } from '@testing-library/react'
import Intro from '.'

describe('<Intro />', () => {
  it('should render', () => {
    render(
      <Intro eyebrow="Eyebrow" heading="Heading" description="Description" />
    )
    const element = screen.getByTestId('intro')
    expect(element).toBeInTheDocument()
    expect(element).toHaveTextContent('Eyebrow')
    expect(element).toHaveTextContent('Heading')
    expect(element).toHaveTextContent('Description')
  })

  it('should render actions', () => {
    render(
      <Intro
        eyebrow="Eyebrow"
        heading="Heading"
        description="Description"
        actions={{
          ctas: [
            { title: 'One', url: '/one' },
            { title: 'Two', url: '/one' },
          ],
        }}
      />
    )
    const intro = screen.getByTestId('intro')
    const actions = screen.getByTestId('actions')
    expect(intro).toBeInTheDocument()
    expect(actions).toBeInTheDocument()
    expect(actions).toHaveTextContent('One')
    expect(actions).toHaveTextContent('Two')
  })
})
