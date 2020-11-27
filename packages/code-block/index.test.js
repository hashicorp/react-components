import { render, screen } from '@testing-library/react'
import CodeBlock from './'

/**
 * @TODO
 *
 * Write tests for the revised component API
 *
 * - it should render a root element with a `g-code-block` class
 * - it should render `code` passed a string of highlighted HTML
 * - it should render `code` passed as React elements
 * - it should render a button with a `Copy` label
 * - the `Copy` button should be focusable with a keyboard
 * - clicking the `Copy` button should copy the `code` to the clipboard
 * - it should pass the `language` prop to a `language-*` class on `<pre>`
 * - it should pass the `language` prop to a `language-*` class on `<code>`
 *
 */

it('should render correctly with basic props', () => {
  const { container } = render(<CodeBlock code="abc" />)
  expect(container.firstChild).toHaveClass('g-code-block')
  expect(screen.getByText('abc')).toBeInTheDocument()
})
