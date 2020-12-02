import { render, screen } from '@testing-library/react'
import CodeBlock from './'

it('it should render a root element with a `g-code-block` class', () => {
  const { container } = render(<CodeBlock code="some-example-code" />)
  expect(container.firstChild).toHaveClass('g-code-block')
})

it('it should render `code` passed as a string of highlighted HTML', () => {
  const codeToken = `html-highlighted-code`
  const tokenClass = 'my-html-token-class'
  const codeHtml = `<span class='${tokenClass}'>${codeToken}</span>`
  render(<CodeBlock code={codeHtml} />)
  expect(screen.getByText(codeToken)).toBeInTheDocument()
  expect(screen.getByText(codeToken)).toHaveClass(tokenClass)
})

it('it should render `code` passed as React elements', () => {
  const codeToken = `react-highlighted-code`
  const tokenClass = 'my-react-token-class'
  const codeReact = <span className={tokenClass}>{codeToken}</span>
  render(<CodeBlock code={codeReact} />)
  expect(screen.getByText(codeToken)).toBeInTheDocument()
  expect(screen.getByText(codeToken)).toHaveClass(tokenClass)
})

/**
 * @TODO
 *
 * Write remaining tests for the revised component API
 *
 */

it.todo('it should render a button with a `Copy` label')
it.todo('the `Copy` button should be focusable with a keyboard')
it.todo('clicking the `Copy` button should copy the `code` to the clipboard')
it.todo('it should pass `language` to `language-*` classes on `pre` and `code`')
