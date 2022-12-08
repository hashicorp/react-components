import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import CodeBlock from './'
import { heapAttributes } from './analytics'
// Mock copy-to-clipboard
import copyToClipboard from './partials/clipboard-button/copy-to-clipboard'
jest.mock('./partials/clipboard-button/copy-to-clipboard', () =>
  jest.fn().mockImplementation(() => true)
)
// We want to make sure copied code is passed through processSnippet,
// we import it so that we don't have to manually recreate its output
import processSnippet from './utils/process-snippet'

afterEach(cleanup)

it('should render a root element with a `g-code-block` class', () => {
  const { container } = render(<CodeBlock code="some-example-code" />)
  expect(container.firstChild).toHaveClass('g-code-block')
})

it('should have a data-heap-track="code-block" attribute on the root element', () => {
  const { container } = render(<CodeBlock code="some-example-code" />)
  expect(container.firstChild).toHaveAttribute('data-heap-track')
})

it('should render `code` passed as a string of highlighted HTML', () => {
  const codeToken = `html-highlighted-code`
  const tokenClass = 'my-html-token-class'
  const codeHtml = `<span class='${tokenClass}'>${codeToken}</span>`
  render(<CodeBlock code={codeHtml} />)
  const visibleCodeElem = screen.getAllByText(codeToken)[1]
  expect(visibleCodeElem).toBeInTheDocument()
  expect(visibleCodeElem).toHaveClass(tokenClass)
})

it('should render `code` passed as React elements', () => {
  const codeToken = `react-highlighted-code`
  const tokenClass = 'my-react-token-class'
  const codeReact = <span className={tokenClass}>{codeToken}</span>
  render(<CodeBlock code={codeReact} />)
  const visibleCodeElem = screen.getAllByText(codeToken)[1]
  expect(visibleCodeElem).toBeInTheDocument()
  expect(visibleCodeElem).toHaveClass(tokenClass)
})

it('should pass `language` to `language-*` classes on `pre` and `code`', () => {
  const code = 'Hello world'
  const language = 'my-special-language'
  render(<CodeBlock code={code} language={language} />)
  const visibleCodeElem = screen.getAllByText(code)[1]
  const preElem = visibleCodeElem.closest('pre')
  const codeElem = preElem.firstChild
  expect(preElem).toHaveClass(`language-${language}`)
  expect(codeElem).toHaveClass(`language-${language}`)
})

it('should render a button with a `Copy` label', () => {
  render(
    <CodeBlock
      code={`console.log("Hello world");`}
      options={{ showClipboard: true }}
    />
  )
  const buttonElem = screen.getByText('Copy')
  expect(buttonElem).toBeInTheDocument()
  expect(buttonElem.tagName).toBe('BUTTON')
})

it('should have a data-heap-track="code-block-clipboard-icon" attribute on the Copy button', () => {
  render(
    <CodeBlock code="some-example-code" options={{ showClipboard: true }} />
  )
  const copyButton = screen.getByText('Copy')
  expect(copyButton.tagName).toBe('BUTTON')
  expect(copyButton.getAttribute('data-heap-track')).toBe(heapAttributes.copy)
})

it('should render a keyboard-focusable `Copy` button', () => {
  const { container } = render(
    <CodeBlock
      code={`console.log("Hello world");`}
      options={{ showClipboard: true }}
    />
  )
  expect(screen.getByText('Copy')).not.toHaveFocus
  const tabChar = 9
  fireEvent.keyDown(container, { charCode: tabChar })
  expect(screen.getByText('Copy')).toHaveFocus
})

it('should use the `Copy` button to copy code to the clipboard', async () => {
  const codeString = "console.log('Hello world!')"
  const codeHtml = `<span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span><span class="token string">'Hello world!'</span><span class="token punctuation">)</span>`
  render(<CodeBlock code={codeHtml} options={{ showClipboard: true }} />)
  // Find and click the copy button
  const buttonElem = screen.getByText('Copy')
  expect(buttonElem).toBeInTheDocument()
  fireEvent.click(buttonElem)
  //  Expect copyToClipboard to have been called with our code snippet
  //  (note: this function is mocked at the top of this test file)
  await waitFor(() => expect(copyToClipboard).toHaveBeenCalledTimes(1))
  expect(copyToClipboard).toHaveBeenCalledWith(codeString)
  copyToClipboard.mockClear()
})

it('should track a "Copy" event when the "Copy" button is clicked', async () => {
  // Setup - mock window.analytics
  const forMockRestore = window.analytics
  window.analytics = { track: jest.fn() }
  // Tests
  render(
    <CodeBlock
      code={`console.log("Hello world");`}
      options={{ showClipboard: true }}
    />
  )
  // Find and click the copy button
  const buttonElem = screen.getByText('Copy')
  expect(buttonElem.tagName).toBe('BUTTON')
  expect(buttonElem).toBeInTheDocument()
  fireEvent.click(buttonElem)
  //  Expect window.analytics.track to have been called
  await waitFor(() => expect(window.analytics.track).toHaveBeenCalledTimes(1))
  expect(window.analytics.track).toBeCalledWith('Copy', {
    category: 'CodeBlock',
  })
  // Cleanup
  window.analytics = forMockRestore
  copyToClipboard.mockClear()
})

it('should call "onCopyCallback" when the "Copy" button is clicked', async () => {
  // Set up a mock
  const onCopyCallback = jest.fn()
  // Render
  render(
    <CodeBlock
      code={`console.log("Hello world");`}
      onCopyCallBack={onCopyCallback}
      options={{ showClipboard: true }}
    />
  )
  // Find and click the copy button
  const buttonElem = screen.getByText('Copy')
  expect(buttonElem.tagName).toBe('BUTTON')
  expect(buttonElem).toBeInTheDocument()
  fireEvent.click(buttonElem)
  //  Expect onCopyCallback to have been called
  await waitFor(() => expect(onCopyCallback).toHaveBeenCalledTimes(1))
  expect(onCopyCallback).toBeCalledWith(true)
  copyToClipboard.mockClear()
})

it('should track a "Click" event when the root element is clicked', async () => {
  // Setup - mock window.analytics
  const forMockRestore = window.analytics
  window.analytics = { track: jest.fn() }
  // Tests
  const { container } = render(
    <CodeBlock
      code={`console.log("Hello world");`}
      options={{ showClipboard: true }}
    />
  )
  // Find and click the root element
  const rootElem = container.firstChild
  fireEvent.click(rootElem)
  //  Expect window.analytics.track to have been called
  await waitFor(() => expect(window.analytics.track).toHaveBeenCalledTimes(1))
  expect(window.analytics.track).toBeCalledWith('Click', {
    category: 'CodeBlock',
  })
  // Cleanup
  window.analytics = forMockRestore
})

it('should use process-snippet to strip the leading $ from shell snippets', async () => {
  const codeString = '$ echo "hello world!"'
  const codeHtml = `<span class="token command"><span class="token shell-symbol important">$</span> <span class="token bash language-bash"><span class="token builtin class-name">echo</span> <span class="token string">"hello world!"</span></span></span>`
  render(<CodeBlock code={codeHtml} options={{ showClipboard: true }} />)
  // Find and click the copy button
  const buttonElem = screen.getByText('Copy')
  expect(buttonElem).toBeInTheDocument()
  fireEvent.click(buttonElem)
  //  Expect copyToClipboard to have been called with our code snippet
  //  (note: this function is mocked at the top of this test file)
  //  We also expect the code to have been modified by processSnippet
  const expectedCode = processSnippet(codeString)
  await waitFor(() => expect(copyToClipboard).toHaveBeenCalledTimes(1))
  expect(copyToClipboard).toHaveBeenCalledWith(expectedCode)
  copyToClipboard.mockClear()
})
