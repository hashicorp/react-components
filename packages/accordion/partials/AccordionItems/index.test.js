import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import AccordionItems from './'
import defaultProps from './fixtures/default.json'

afterEach(cleanup)

describe('<AccordionItems />', () => {
  it('should render a `.g-accordion-items` <div> root element', () => {
    const { container } = render(<AccordionItems {...defaultProps} />)
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass('g-accordion-items')
  })

  it('should render the item titles into buttons', () => {
    const { getByText } = render(<AccordionItems {...defaultProps} />)
    defaultProps.items.forEach((item) => {
      expect(getByText(item.heading)).toBeVisible()
      expect(getByText(item.heading).parentElement.tagName).toBe('BUTTON')
    })
  })

  it('should render plain text content', () => {
    const testPlainText = 'This is some plain text that should appear'
    const { getByText } = render(
      <AccordionItems
        items={[
          {
            heading: 'My Test Plain Text',
            content: testPlainText,
          },
        ]}
      />
    )
    expect(getByText(testPlainText)).toBeInTheDocument()
  })

  it('should render HTML markup contained in content', () => {
    const imageAlt = 'My image alt text'
    const { getByAltText } = render(
      <AccordionItems
        items={[
          {
            heading: 'With An Image',
            content: `Some markup: <img src="" alt="${imageAlt}">`,
          },
        ]}
      />
    )
    const expectedImg = getByAltText(imageAlt)
    expect(expectedImg).toBeInTheDocument()
    expect(expectedImg.tagName).toBe('IMG')
  })

  it('should render React elements passed to content', () => {
    const imageAlt = 'My React image element alt text'
    const { getByAltText } = render(
      <AccordionItems
        items={[
          {
            heading: 'With An Image',
            // eslint-disable-next-line react/display-name -- this is the expected usage
            content: () => (
              <div>
                Some markup: <img src="" alt={imageAlt} />
              </div>
            ),
          },
        ]}
      />
    )
    const expectedImg = getByAltText(imageAlt)
    expect(expectedImg).toBeInTheDocument()
    expect(expectedImg.tagName).toBe('IMG')
  })
})
