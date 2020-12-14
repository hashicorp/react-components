import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import CodeBlock from './'
// Mock copy-to-clipboard
jest.mock('./utils/copy-to-clipboard')
import copyToClipboard from './utils/copy-to-clipboard'
// We want to make sure copied code is passed through processSnippet,
// we import it so that we don't have to manually recreate its output
import processSnippet from './utils/process-snippet'

afterEach(cleanup)

it('should render a root element with a `g-code-block` class', () => {
  const { container } = render(<CodeBlock code="some-example-code" />)
  expect(container.firstChild).toHaveClass('g-code-block')
})

it('should render `code` passed as a string of highlighted HTML', () => {
  const codeToken = `html-highlighted-code`
  const tokenClass = 'my-html-token-class'
  const codeHtml = `<span class='${tokenClass}'>${codeToken}</span>`
  render(<CodeBlock code={codeHtml} />)
  expect(screen.getByText(codeToken)).toBeInTheDocument()
  expect(screen.getByText(codeToken)).toHaveClass(tokenClass)
})

it('should render `code` passed as React elements', () => {
  const codeToken = `react-highlighted-code`
  const tokenClass = 'my-react-token-class'
  const codeReact = <span className={tokenClass}>{codeToken}</span>
  render(<CodeBlock code={codeReact} />)
  expect(screen.getByText(codeToken)).toBeInTheDocument()
  expect(screen.getByText(codeToken)).toHaveClass(tokenClass)
})

it('should pass `language` to `language-*` classes on `pre` and `code`', () => {
  const code = 'Hello world'
  const language = 'my-special-language'
  render(<CodeBlock code={code} language={language} />)
  const codeTokenElem = screen.getByText(code)
  const preElem = codeTokenElem.closest('pre')
  const codeElem = preElem.firstChild
  expect(preElem).toHaveClass(`language-${language}`)
  expect(codeElem).toHaveClass(`language-${language}`)
})

it('should render a button with a `Copy` label', () => {
  render(
    <CodeBlock
      code={`console.log(\"Hello world\");`}
      options={{ showClipboard: true }}
    />
  )
  const buttonElem = screen.getByText('Copy')
  expect(buttonElem).toBeInTheDocument()
  expect(buttonElem.tagName).toBe('BUTTON')
})

it('should render a keyboard-focusable `Copy` button', () => {
  const { container } = render(
    <CodeBlock
      code={`console.log(\"Hello world\");`}
      options={{ showClipboard: true }}
    />
  )
  expect(screen.getByText('Copy')).not.toHaveFocus
  const tabChar = 9
  fireEvent.keyDown(container, { charCode: tabChar })
  expect(screen.getByText('Copy')).toHaveFocus
})

it('should use the `Copy` button to copy code to the clipboard', () => {
  const codeString = "console.log('Hello world!')"
  const codeHtml = `<span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span><span class="token string">'Hello world!'</span><span class="token punctuation">)</span>`
  render(<CodeBlock code={codeHtml} options={{ showClipboard: true }} />)
  // Find and click the copy button
  const buttonElem = screen.getByText('Copy')
  expect(buttonElem).toBeInTheDocument()
  fireEvent.click(buttonElem)
  //  Expect copyToClipboard to have been called with our code snippet
  //  (note: this function is mocked at the top of this test file)
  expect(copyToClipboard).toHaveBeenCalled()
  expect(copyToClipboard).toHaveBeenCalledWith(codeString)
  copyToClipboard.mockClear()
})

it('should use process-snippet to strip the leading $ from shell snippets', () => {
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
  expect(copyToClipboard).toHaveBeenCalledWith(expectedCode)
})
