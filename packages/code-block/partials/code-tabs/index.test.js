import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import CodeTabs from './'
import CodeBlock from '../../'
import CodeTabsProvider from '../../provider'

// getAllByText is needed, as we sometimes render dummy elements
// before the main, displayed element, eg for overflow detection
// and for simpler copy-to-clipboard logic
function getSecondByText(text) {
  /* eslint-disable-next-line no-unused-vars */
  const [firstElem, secondElem] = screen.getAllByText(text)
  return secondElem
}

it('should accept a className prop, and place it on the root element', () => {
  const customClassName = 'foobar-class'
  const { container } = render(
    <CodeTabsProvider>
      <CodeTabs className={customClassName}>
        <CodeBlock language="javascript" code="console.log('Hello world!')" />
        <CodeBlock language="go" code="fmt.Println('Hello world!')" />
      </CodeTabs>
    </CodeTabsProvider>
  )
  expect(container.firstChild.className).toContain(customClassName)
})

it('should render the heading prop', () => {
  const heading = 'My custom heading'
  render(
    <CodeTabsProvider>
      <CodeTabs heading={heading}>
        <CodeBlock language="javascript" code="console.log('Hello world!')" />
        <CodeBlock language="go" code="fmt.Println('Hello world!')" />
      </CodeTabs>
    </CodeTabsProvider>
  )
  expect(getSecondByText(heading)).toBeVisible()
})

it('should accept an array of strings for the tabs prop, and render them as tab labels', () => {
  const tabs = ['My First Tab', 'My Second Tab']
  render(
    <CodeTabsProvider>
      <CodeTabs tabs={tabs}>
        <CodeBlock language="javascript" code="console.log('Hello world!')" />
        <CodeBlock language="go" code="fmt.Println('Hello world!')" />
      </CodeTabs>
    </CodeTabsProvider>
  )
  tabs.forEach((tabLabel) => {
    expect(getSecondByText(tabLabel)).toBeInTheDocument()
  })
})

it('should generate pretty tab names automatically', () => {
  render(
    <CodeTabsProvider>
      <CodeTabs>
        <CodeBlock language="javascript" code="console.log('Hello world!')" />
        <CodeBlock language="go" code="fmt.Println('Hello world!')" />
      </CodeTabs>
    </CodeTabsProvider>
  )
  expect(getSecondByText('JavaScript')).toBeInTheDocument()
  expect(getSecondByText('Go')).toBeInTheDocument()
})

it('should switch tabs when a trigger is clicked', async () => {
  render(
    <CodeTabsProvider>
      <CodeTabs>
        <CodeBlock language="javascript" code="console.log('Hello world!')" />
        <CodeBlock language="go" code="fmt.Println('Hello world!')" />
      </CodeTabs>
    </CodeTabsProvider>
  )
  // Go code is in the second tab, so should be hidden with display: none by default
  const goCode = getSecondByText("fmt.Println('Hello world!')")
  expect(goCode).toBeInTheDocument()
  expect(goCode).not.toBeVisible()
  // Find and click the Go tab trigger
  const goTabTrigger = getSecondByText('Go')
  expect(goTabTrigger).toBeVisible()
  fireEvent.click(goTabTrigger)
  // Now the Go code should be visible
  expect(goCode).toBeVisible()
})

it('should track a "tab select" event when a tab is clicked', async () => {
  // Setup - mock window.analytics
  const forMockRestore = window.analytics
  window.analytics = { track: jest.fn() }
  // Test
  render(
    <CodeTabsProvider>
      <CodeTabs>
        <CodeBlock language="javascript" code="console.log('Hello world!')" />
        <CodeBlock language="go" code="fmt.Println('Hello world!')" />
      </CodeTabs>
    </CodeTabsProvider>
  )
  // Find and click the Go tab trigger
  const goTabTrigger = getSecondByText('Go')
  expect(goTabTrigger).toBeVisible()
  fireEvent.click(goTabTrigger)
  //  Expect window.analytics.track to have been called
  await waitFor(() => expect(window.analytics.track).toHaveBeenCalledTimes(1))
  expect(window.analytics.track).toBeCalledWith('Select CodeTab', {
    category: 'CodeBlock',
    tabGroup: 'go',
  })
  // Cleanup
  window.analytics = forMockRestore
})
