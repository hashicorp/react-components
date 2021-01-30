import { render, screen, fireEvent } from '@testing-library/react'
import Tabs, { TabProvider, useTabGroups } from './'

const baseProps = {
  items: [
    {
      heading: 'First Tab',
      tabChildren: function Tab() {
        return <div>Tab 1 Content</div>
      },
    },
    {
      heading: 'Second Tab',
      tabChildren: function Tab() {
        return <div>Tab 2 Content</div>
      },
    },
    {
      heading: 'Third tab',
      tabChildren: function Tab() {
        return <div>Tab 3 Content</div>
      },
    },
  ],
}

const renderWithProvider = (ui) => {
  return render(<TabProvider>{ui}</TabProvider>)
}

describe('<Tabs />', () => {
  it('should render a `.g-tabs` <div> root element', () => {
    const { container } = render(<Tabs {...baseProps} />)
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('SECTION')
    expect(rootElem).toHaveClass('g-tabs')
  })

  it("should render each item's heading", () => {
    render(<Tabs {...baseProps} />)
    baseProps.items.forEach((item) => {
      expect(screen.getByText(item.heading)).toBeInTheDocument()
    })
  })

  it('should optionally render a tooltip if provided as a prop', () => {
    const tooltipOne = 'The first test tooltip'
    const tooltipTwo = 'Another test tooltip'
    const items = [
      { heading: 'h1', tabChildren: () => null },
      { heading: 'h2', tooltip: tooltipOne, tabChildren: () => null },
      { heading: 'h3', tabChildren: () => null },
      { heading: 'h4', tooltip: tooltipTwo, tabChildren: () => null },
    ]
    render(<Tabs items={items} />)
    //  Ensure the tooltip icons are rendering
    const tooltips = screen.getAllByTestId('tooltip-icon')
    expect(tooltips.length).toBe(2)
    //  Focus the first tooltip icon, and expect to see content
    fireEvent.focus(tooltips[0])
    expect(screen.getByText(tooltipOne)).toBeInTheDocument()
    //  Focus the second tooltip icon, and expect to see content
    fireEvent.focus(tooltips[1])
    expect(screen.getByText(tooltipTwo)).toBeInTheDocument()
  })

  it("should render the first item's children by default", () => {
    const testAltText = 'Some react component'
    const items = [
      {
        heading: 'This is a heading',
        tabChildren: function children() {
          return <img alt={testAltText} src="" />
        },
      },
    ]
    const { getByAltText } = render(<Tabs items={items} />)
    expect(getByAltText(testAltText)).toBeInTheDocument()
  })

  it("should render each item's children when the corresponding heading is clicked", () => {
    const rawItems = [
      {
        heading: 'Heading for item one',
        targetText: 'This is some test target text for item one',
      },
      {
        heading: 'Second test item',
        targetText: 'Different target text for item two',
      },
    ]
    const items = rawItems.map((i) => {
      return {
        heading: i.heading,
        tabChildren: function children() {
          return <strong>{i.targetText}</strong>
        },
      }
    })
    const { getByText } = render(<Tabs items={items} />)
    rawItems.forEach((rawItem) => {
      const { heading, targetText } = rawItem
      const tabItem = getByText(heading)
      expect(tabItem).toBeInTheDocument()
      fireEvent.click(tabItem)
      expect(getByText(targetText)).toBeInTheDocument()
    })
  })

  it('should initially select provided tab index if provided as a prop', () => {
    const { getByText } = render(<Tabs {...baseProps} defaultTabIdx={2} />)
    expect(getByText('Tab 3 Content')).toBeInTheDocument()
  })

  it('should gracefully handle a default tab index that is out of bounds', () => {
    const { getByText } = render(<Tabs {...baseProps} defaultTabIdx={6} />)
    expect(getByText('Tab 1 Content')).toBeInTheDocument()
  })

  it('should render children of all active group items when clicked', () => {
    const items = [
      {
        heading: 'h1',
        group: '1',
        tabChildren() {
          return 'Group 1'
        },
      },
      {
        heading: 'h2',
        group: '2',
        tabChildren() {
          return 'Group 2'
        },
      },
      {
        heading: 'h3',
        group: '3',
        tabChildren() {
          return 'Group 3'
        },
      },
    ]
    renderWithProvider(
      <>
        <Tabs items={items} />
        <Tabs items={items} />
        <Tabs items={items} />
      </>
    )
    items.forEach((item) => {
      const groupTabs = screen.getAllByText(item.heading)
      // click one group item
      fireEvent.click(groupTabs[0])
      const groupChildren = screen.getAllByText(item.tabChildren())
      // all associated group items should render
      expect(groupChildren.length).toBe(3)
    })
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
