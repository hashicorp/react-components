import { render, screen, fireEvent } from '@testing-library/react'
import TabbedAccordion from './'
import baseProps from './fixtures/base.json'

describe('<TabbedAccordion />', () => {
  it('should add a provided className to the root element', () => {
    const className = 'my-great-class-name'
    const { container } = render(
      <TabbedAccordion {...baseProps} className={className} />
    )
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('SECTION')
    expect(rootElem).toHaveClass(className)
  })

  it('should display the heading in an <h2> tag', () => {
    render(<TabbedAccordion {...baseProps} />)
    const headingElem = screen.getByText(baseProps.heading)
    expect(headingElem).toBeVisible()
    expect(screen.getByTestId('heading')).toBeVisible()
    expect(headingElem.tagName).toBe('H2')
  })

  it('should not render an empty heading container if no heading is provided', () => {
    const basePropsModified = Object.assign({}, baseProps)
    delete basePropsModified.heading

    const { queryByTestId } = render(<TabbedAccordion {...basePropsModified} />)
    expect(queryByTestId('heading')).not.toBeInTheDocument()
  })

  it('should display the corresponding accordion items when each tab is clicked', () => {
    const heading = 'Test Heading'
    const tabs = [
      {
        heading: 'My First Tab',
        items: [
          {
            heading: 'Tab one item one',
            content: 'Test text for tab one, item one',
          },
          {
            heading: 'Tab one item two',
            content: 'Test text for tab one, item two',
          },
        ],
      },
      {
        heading: 'My Second Tab',
        items: [
          {
            heading: 'Tab two item one',
            content: 'Test text for tab two, item one',
          },
          {
            heading: 'Tab two item two',
            content: 'Test text for tab two, item two',
          },
        ],
      },
    ]
    render(<TabbedAccordion heading={heading} tabs={tabs} />)
    tabs.forEach((tab) => {
      const { heading, items } = tab
      const tabTrigger = screen.getByText(heading)
      expect(tabTrigger).toBeInTheDocument()
      fireEvent.click(tabTrigger)
      const firstItemTrigger = screen.getByText(items[0].heading)
      expect(firstItemTrigger).toBeInTheDocument()
      fireEvent.click(firstItemTrigger)
      const firstItemContent = screen.getByText(items[0].content)
      expect(firstItemContent).toBeInTheDocument()
    })
  })
})
