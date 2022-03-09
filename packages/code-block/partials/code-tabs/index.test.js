import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import CodeTabs from './'
import CodeBlock from '../../'
import CodeBlockConfig from '../code-block-config'
import CodeTabsProvider from '../../provider'

// getAllByText is needed, as we sometimes render dummy elements
// before the main, displayed element, eg for overflow detection
// and for simpler copy-to-clipboard logic
function getSecondByText(text) {
  /* eslint-disable-next-line no-unused-vars */
  const [, secondElem] = screen.getAllByText(text)
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

it('should accept CodeBlockConfig or pre elements as children', () => {
  // Note: we suppress console.error for this test.
  // We expect a warning that React does not recognize the `hasBarAbove`
  // prop on the first `pre` element. In MDX this is a non-issue since
  // `pre` would be mapped to our `CodeBlock` component,
  // via @hashicorp/react-code-block/mdx.
  jest.spyOn(console, 'error')
  global.console.error.mockImplementation(() => {})
  expect(() => {
    render(
      <CodeTabsProvider>
        <CodeTabs>
          <pre>
            <code>Hello world!</code>
          </pre>
          <CodeBlockConfig>
            {/* Note: do not use mdxType in JSX, this is here to mock what
            would happen, without having to run the MDX processing chain */}
            <pre mdxType="pre">
              <code>Hello world!</code>
            </pre>
          </CodeBlockConfig>
          <CodeBlock language="go" code="fmt.Println('Hello world!')" />
        </CodeTabs>
      </CodeTabsProvider>
    )
  }).not.toThrowError()
  //  Restore console.error for further tests
  global.console.error.mockRestore()
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

it('should throw an error if children of an unexpected type are provided', async () => {
  //  Suppress console.error for this test, we expect an error
  jest.spyOn(console, 'error')
  global.console.error.mockImplementation(() => {})
  expect(() => {
    render(
      <CodeTabsProvider>
        <CodeTabs>
          <CodeBlock language="javascript" code="console.log('Hello world!')" />
          <p>
            I&apos;m a weirdo. What am I doing here? I don&apos;t belong here.
          </p>
        </CodeTabs>
      </CodeTabsProvider>
    )
  }).toThrowError(
    'CodeTabs only accepts "CodeBlock", "CodeBlockConfig", or "pre" children. Found children with types: ["CodeBlock","p"]'
  )
  //  Restore console.error for further tests
  global.console.error.mockRestore()
})

it('should throw an error if the tabs prop length does not match the number of children', async () => {
  //  Suppress console.error for this test, we expect an error
  jest.spyOn(console, 'error')
  global.console.error.mockImplementation(() => {})
  expect(() => {
    render(
      <CodeTabsProvider>
        <CodeTabs tabs={['JavaScript', 'Go', 'Third Non-Existent Tab']}>
          <CodeBlock language="javascript" code="console.log('Hello world!')" />
          <CodeBlock language="go" code="fmt.Println('Hello world!')" />
        </CodeTabs>
      </CodeTabsProvider>
    )
  }).toThrowError(
    'In CodeTabs, the tabs array length must match the number of children. Found mismatched tabs length 3 and children length 2. Please adjust the tabs prop or the number of children to resolve this issue.'
  )
  //  Restore console.error for further tests
  global.console.error.mockRestore()
})
