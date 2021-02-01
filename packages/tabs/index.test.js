import { render, screen, fireEvent } from '@testing-library/react'
import Tabs, { TabProvider, useTabGroups, Tab } from './'

const baseItems = [
  {
    heading: 'First Tab',
    tooltip: 'Cool Tip',
    content: 'Tab 1 Content',
  },
  {
    heading: 'Second Tab',
    tooltip: 'Even Better',
    content: 'Tab 2 Content',
  },
  {
    heading: 'Third Tab',
    content: 'Tab 3 Content',
  },
]

function BaseTabs({ items, defaultTabIdx = 0 }) {
  return (
    <Tabs defaultTabIdx={defaultTabIdx}>
      {items.map((tab, i) => {
        const { heading, tooltip, group, content } = tab
        return (
          <Tab key={i} heading={heading} tooltip={tooltip} group={group}>
            <div>{content}</div>
          </Tab>
        )
      })}
    </Tabs>
  )
}

const renderWithProvider = (ui) => {
  return render(<TabProvider>{ui}</TabProvider>)
}

describe('<Tabs />', () => {
  it('should render a `.g-tabs` <div> root element', () => {
    const { container } = render(<BaseTabs items={baseItems} />)
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('SECTION')
    expect(rootElem).toHaveClass('g-tabs')
  })

  it("should render each item's heading", () => {
    render(<BaseTabs items={baseItems} />)
    baseItems.forEach((item) => {
      expect(screen.getByText(item.heading)).toBeInTheDocument()
    })
  })

  it('should optionally render a tooltip if provided as a prop', () => {
    render(<BaseTabs items={baseItems} />)
    const itemsWithTips = baseItems.filter((item) => item.tooltip)
    //  Ensure the tooltip icons are rendering
    const tooltips = screen.getAllByTestId('tooltip-icon')
    expect(tooltips.length).toBe(2)
    itemsWithTips.forEach((item, i) => {
      //  Focus the tooltip icon, and expect to see content
      fireEvent.focus(tooltips[i])
      expect(screen.getByText(item.tooltip)).toBeInTheDocument()
    })
  })

  it("should render the first item's children by default", () => {
    const testAltText = 'Some react component'
    const items = [
      {
        heading: 'This is a heading',
        content: <img alt={testAltText} src="" />,
      },
    ]
    const { getByAltText } = render(<BaseTabs items={items} />)
    expect(getByAltText(testAltText)).toBeInTheDocument()
  })

  it("should render each item's children when the corresponding heading is clicked", () => {
    const { getByText } = render(<BaseTabs items={baseItems} />)
    baseItems.forEach((item) => {
      const { heading, content } = item
      const tabItem = getByText(heading)
      expect(tabItem).toBeInTheDocument()
      fireEvent.click(tabItem)
      expect(getByText(content)).toBeInTheDocument()
    })
  })

  it('should initially select provided tab index if provided as a prop', () => {
    const { getByText } = render(
      <BaseTabs items={baseItems} defaultTabIdx={2} />
    )
    expect(getByText('Tab 3 Content')).toBeInTheDocument()
  })

  it('should gracefully handle a default tab index that is out of bounds', () => {
    const { getByText } = render(
      <BaseTabs items={baseItems} defaultTabIdx={6} />
    )
    expect(getByText('Tab 1 Content')).toBeInTheDocument()
  })

  it('should render children of all active group items when clicked', () => {
    const itemsWithGroups = baseItems.map((item, i) => ({
      group: `${i}`,
      ...item,
    }))
    const { getAllByText } = renderWithProvider(
      <>
        <BaseTabs items={itemsWithGroups} />
        <BaseTabs items={itemsWithGroups} />
        <BaseTabs items={itemsWithGroups} />
      </>
    )
    baseItems.forEach((item) => {
      const groupTabs = getAllByText(item.heading)
      // click one group item
      fireEvent.click(groupTabs[0])
      const groupChildren = getAllByText(item.content)
      // all associated group items should render
      expect(groupChildren.length).toBe(3)
    })
  })

  it('should handle only one tab', () => {
    function SingleTab({ item }) {
      const { heading, content } = item
      return (
        <Tabs>
          <Tab heading={heading}>
            <div>{content}</div>
          </Tab>
        </Tabs>
      )
    }
    const { getByText } = render(<SingleTab item={baseItems[0]} />)
    expect(getByText('Tab 1 Content')).toBeInTheDocument()
  })
})

describe('<TabProvider />', () => {
  it('should provide a context object', () => {
    function Consumer() {
      const context = useTabGroups()
      return <div>{typeof context}</div>
    }
    renderWithProvider(<Consumer />)
    expect(screen.getByText('object')).toBeInTheDocument()
  })
})
