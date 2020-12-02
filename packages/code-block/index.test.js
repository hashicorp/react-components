import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import CodeBlock from './'

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
  const { container } = render(<CodeBlock code={code} language={language} />)
  const preElem = container.firstChild.firstChild
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

/**
 * @TODO
 *
 * It would be really nice to test the
 * copy-to-clipboard functionality.
 *
 * However, `jsdom` doesn't support `innerText`,
 * ( ref: https://github.com/jsdom/jsdom/issues/1245 )
 * and it doesn't support `document.execCommand`,
 * so we can test this currently, because `fireEvent.click()`
 * even on the "Copy" button ends up throwing an error.
 *
 * This might be something we need to test with Cypress...
 * Or it might be something where we could refactor
 * the `copy-to-clipboard` function in order to
 * make it more test-able.
 */
it.todo('should use the `Copy` button to copy code to the clipboard')
