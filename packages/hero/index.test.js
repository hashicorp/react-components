import { render } from '@testing-library/react'
import Hero from '.'
import props from './props'
import { getTestValues } from 'swingset/testing'

const defaultProps = getTestValues(props)

it('should add a provided className to the root element', () => {
  //  Suppress console.error for this test, we expect an error,
  //  as Jest will print a noisy warning that HTMLMediaElement.prototype.play
  //  is not yet implemented
  jest.spyOn(console, 'error')
  global.console.error.mockImplementation(() => {})
  // Run the className test
  const className = 'my-special-class-name'
  const { container } = render(<Hero {...defaultProps} className={className} />)
  expect(container.firstChild).toHaveClass(className)
  //  Restore console.error for further tests
  global.console.error.mockRestore()
})

test.todo(
  'renders the `title` and `description` props correctly, without orphans'
)
test.todo(
  'renders the `centered` prop correctly, from global or the data object'
)
test.todo('renders the `theme` prop correctly')
test.todo('renders the `backgroundTheme` prop correctly defaults as dark')
test.todo('renders the `backgroundImage` prop correctly')
test.todo('renders the `smallTextTag` prop correctly')
test.todo('renders the `titleLogo` prop correctly')
test.todo('renders the `alert` prop correctly')
test.todo('renders the `formLeadInput` prop correctly')
test.todo('submits form data correctly from `formLeadInput`')
test.todo('renders the `buttons` prop correctly')
test.todo('renders the `helpText` prop correctly as text, html, or markdown')
test.todo('renders the `videos` prop correctly')
test.todo('renders the `image` prop correctly')
test.todo('renders buttons instead of lead input form if both are present')
test.todo('reflects the `gaPrefix` prop correctly')
