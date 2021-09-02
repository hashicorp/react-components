import { render, screen, fireEvent } from '@testing-library/react'
import Tabs, { TabProvider, useTabGroups, Tab } from './'

const baseProps = [
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

function BaseTabs({ tabs, ...restProps }) {
  return (
    <Tabs {...restProps}>
      {tabs.map(({ heading, tooltip, group, content }) => {
        return (
          <Tab key={heading} heading={heading} tooltip={tooltip} group={group}>
            {content}
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
  it('should render a passed className onto the root element', () => {
    const testClassName = 'super-special-tabs-classname'
    const { container } = render(
      <BaseTabs tabs={baseProps} className={testClassName} />
    )
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('SECTION')
    expect(rootElem).toHaveClass(testClassName)
  })

  it("should render each tab's heading", () => {
    render(<BaseTabs tabs={baseProps} />)
    baseProps.forEach((tab) => {
      expect(screen.getByText(tab.heading)).toBeInTheDocument()
    })
  })

  it('should optionally render a tooltip if provided as a prop', () => {
    render(<BaseTabs tabs={baseProps} />)
    const tabsWithTips = baseProps.filter((tab) => tab.tooltip)
    // Make sure tooltips aren't removed from the baseProps
    expect(tabsWithTips.length).toBe(2)
    //  Ensure the tooltip icons are rendering
    const tooltips = screen.getAllByTestId('tooltip-icon')
    expect(tooltips.length).toBe(tabsWithTips.length)
    // Ensure each tab's tooltip works as expected
    tabsWithTips.forEach((tab, i) => {
      //  Focus the tooltip icon, and expect to see content
      const iconElement = tooltips[i]
      fireEvent.focus(iconElement)
      // Expect separate visible and screen reader elements
      const tooltipElements = screen.getAllByText(tab.tooltip)
      expect(tooltipElements.length).toBe(2)
      const [visibleElement, screenReaderElement] = tooltipElements
      // Assert on the visible element
      expect(visibleElement).toBeInTheDocument()
      expect(visibleElement).toHaveTextContent(tab.tooltip)
      // Assert on the screen reader element
      expect(screenReaderElement).toBeInTheDocument()
      expect(screenReaderElement).toHaveTextContent(tab.tooltip)
      const tooltipId = iconElement.getAttribute('aria-describedby')
      expect(screenReaderElement.id).toBe(tooltipId)
      // Blur the tooltip to prepare to focus the next one
      fireEvent.blur(iconElement)
    })
  })

  it("should render the first tab's children by default", () => {
    const testAltText = 'Some react component'
    const tabs = [
      {
        heading: 'This is a heading',
        content: <img alt={testAltText} src="" />,
      },
    ]
    const { getByAltText } = render(<BaseTabs tabs={tabs} />)
    expect(getByAltText(testAltText)).toBeInTheDocument()
  })

  it("should render each tab's children when the corresponding heading is clicked", () => {
    const { getByText } = render(<BaseTabs tabs={baseProps} />)
    baseProps.forEach((tab) => {
      const { heading, content } = tab
      const targetTab = getByText(heading)
      expect(targetTab).toBeInTheDocument()
      fireEvent.click(targetTab)
      expect(getByText(content)).toBeInTheDocument()
    })
  })

  it('should initially select provided tab index if provided as a prop', () => {
    const { getByText } = render(
      <BaseTabs tabs={baseProps} defaultTabIdx={2} />
    )
    expect(getByText('Tab 3 Content')).toBeInTheDocument()
  })

  it('should gracefully handle a default tab index that is out of bounds', () => {
    const { getByText } = render(
      <BaseTabs tabs={baseProps} defaultTabIdx={6} />
    )
    expect(getByText('Tab 1 Content')).toBeInTheDocument()
  })

  it('should render children of all active group tabs when clicked', () => {
    const tabsWithGroups = baseProps.map((tab, i) => ({
      group: `${i}`,
      ...tab,
    }))
    const { getAllByText } = renderWithProvider(
      <>
        <BaseTabs tabs={tabsWithGroups} />
        <BaseTabs tabs={tabsWithGroups} />
        <BaseTabs tabs={tabsWithGroups} />
      </>
    )
    baseProps.forEach((tab) => {
      const groupTabs = getAllByText(tab.heading)
      // click one group tab
      fireEvent.click(groupTabs[0])
      const groupChildren = getAllByText(tab.content)
      // all associated group tabs should render
      expect(groupChildren.length).toBe(3)
    })
  })

  it('should handle only one tab', () => {
    function SingleTab({ tab }) {
      const { heading, content } = tab
      return (
        <Tabs>
          <Tab heading={heading}>
            <div>{content}</div>
          </Tab>
        </Tabs>
      )
    }
    const { getByText } = render(<SingleTab tab={baseProps[0]} />)
    expect(getByText('Tab 1 Content')).toBeInTheDocument()
  })

  it('should accept and call an onChange prop when a new tab is clicked', () => {
    const onChange = jest.fn()
    const { getByText } = render(
      <BaseTabs tabs={baseProps} onChange={onChange} />
    )

    const { heading } = baseProps[0]
    const targetTab = getByText(heading)
    fireEvent.click(targetTab)
    expect(onChange).toHaveBeenCalled()
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
