import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { DEFAULT_MENU_SECTIONS } from './index'

import HashiStackMenu from './'

const baseProps = {
  items: [{ title: 'Browse Products', sections: DEFAULT_MENU_SECTIONS }],
}

describe('<HashiStackMenu />', () => {
  it('should render a <header> root element', async () => {
    const { container } = render(<HashiStackMenu {...baseProps} />)
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('HEADER')
  })

  it('should render nav item with sections as a button with dropdown', async () => {
    const { items } = baseProps
    render(<HashiStackMenu {...baseProps} />)

    items.forEach((menuItem) => {
      const navItemElem = screen.getAllByText(menuItem.title)[0]
      expect(navItemElem).toBeVisible()
      if (menuItem.sections) {
        const buttonElem = navItemElem
        expect(buttonElem.tagName).toBe('BUTTON')
      }
    })
  })
})
