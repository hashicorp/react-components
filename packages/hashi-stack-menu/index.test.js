import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import HashiStackMenu from './'
import HASHI_STACK_MENU_ITEMS from './data'

describe('<HashiStackMenu />', () => {
  it('should render a <header> root element', async () => {
    const { container } = render(<HashiStackMenu />)
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('HEADER')
  })

  it('should render nav item with sections as a button with dropdown', async () => {
    render(<HashiStackMenu />)

    HASHI_STACK_MENU_ITEMS.forEach((menuItem) => {
      const navItemElem = screen.getAllByText(menuItem.title)[0]
      expect(navItemElem).toBeVisible()
      if (menuItem.sections) {
        const buttonElem = navItemElem
        expect(buttonElem.tagName).toBe('BUTTON')
      }
    })
  })

  it('should run call the callback `onPanelChange` function prop when a button NavItem is clicked', async () => {
    const mockCallBack = jest.fn()
    render(<HashiStackMenu onPanelChange={mockCallBack} />)

    HASHI_STACK_MENU_ITEMS.forEach((menuItem) => {
      const navItemElem = screen.getAllByText(menuItem.title)[0]
      if (menuItem.sections) {
        fireEvent.click(navItemElem)
        expect(mockCallBack).toHaveBeenCalled()
      }
    })
  })
})
