/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { render, screen, fireEvent } from '@testing-library/react'
import Tabs, { TabProvider, useTabGroups, Tab } from './'

const baseProps = [
  {
    heading: 'First Tab',
    content: 'Tab 1 Content',
  },
  {
    heading: 'Second Tab',
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
      {tabs.map(({ heading, group, content }) => {
        return (
          <Tab key={heading} heading={heading} group={group}>
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
