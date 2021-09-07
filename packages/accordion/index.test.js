import { render, screen } from '@testing-library/react'
import Accordion from '.'

const baseProps = {
  heading: 'My test accordion heading',
  items: [
    {
      heading: 'My Accordion Item',
      content: 'This is some default text in the collapsable area.',
    },
    {
      heading: 'Another Accordion Item',
      content:
        'This is some text content with some <strong>strong text</strong> and <code>some code</code> as well.',
    },
  ],
}

describe('<Accordion />', () => {
  it('should add a provided className to the root element', () => {
    const className = 'my-excellent-class-name'
    const { container } = render(
      <Accordion {...baseProps} className={className} />
    )
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('SECTION')
    expect(rootElem).toHaveClass(className)
  })

  it('should render items into AccordionItems, verifiable by item headings', () => {
    render(<Accordion {...baseProps} />)
    baseProps.items.forEach((item) => {
      expect(screen.getByText(item.heading)).toBeVisible()
    })
  })

  it('should render a heading when one is provided', () => {
    render(<Accordion {...baseProps} />)
    expect(screen.getByText(baseProps.heading)).toBeVisible()
    expect(screen.getByTestId('heading')).toBeVisible()
  })

  it('should not display an empty heading tag when no heading is passed', () => {
    const basePropsWithoutHeading = Object.assign({}, baseProps)
    delete basePropsWithoutHeading.heading
    //  Ensure testId is not rendered when no heading is passed
    render(<Accordion {...basePropsWithoutHeading} />)
    expect(screen.queryByTestId('heading')).not.toBeInTheDocument()
  })
})
