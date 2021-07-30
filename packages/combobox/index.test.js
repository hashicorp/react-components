import Combobox from './'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'

afterEach(cleanup)

const defaultProps = {
  label: 'Fruit picker',
  options: ['Orange', 'Banana', 'Apple', 'Pineapple', 'Kiwi'],
}

const inputRole = 'combobox'
const optionListRole = 'listbox'
const buttonLabel = 'Pick a fruit'

it('should render an input element with a proper aria-label', () => {
  render(<Combobox {...defaultProps} />)

  expect(screen.getByRole(inputRole)).toHaveAttribute(
    'aria-label',
    defaultProps.label
  )
})

it('should render our input with error state when invalidInputValue is true', () => {
  render(<Combobox {...defaultProps} invalidInputValue />)

  expect(screen.getByRole(inputRole)).toHaveAttribute('data-has-error', 'true')
})

it('should render a proper button label when provided', () => {
  render(<Combobox {...defaultProps} buttonLabel={buttonLabel} />)

  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
})

it('should focus the input when dropdown button is clicked', () => {
  render(<Combobox {...defaultProps} buttonLabel={buttonLabel} />)

  // Check for focus on input after click of dropdown button
  fireEvent.click(screen.getByText(buttonLabel)) // label is rendered as visually hidden span for a11y within button, the event will bubble to the button
  expect(screen.getByRole(inputRole)).toHaveFocus
})

it('should filter to the proper options given enough characters', () => {
  render(
    <Combobox
      //  'Apple' should be the best match and is intentionally not placed as the first option.
      // Filter functionality should work such that it is rendered as the first option
      {...defaultProps}
    />
  )
  const input = screen.getByRole(inputRole)

  // Type `appl`
  fireEvent.change(input, { target: { value: 'appl' } })

  // Select first option in the list
  fireEvent.click(screen.getByRole(optionListRole).firstChild)

  // Should match 'Apple', filter functionality should work such that it was rendered as the first option
  expect(input).toHaveValue('Apple')

  // Type `Kiwi`
  fireEvent.change(input, { target: { value: 'Kiwi' } })

  // Should show 1 option for this exact match
  expect(screen.getByRole(optionListRole).children.length).toBe(1)

  // Type `appl` again
  fireEvent.change(input, { target: { value: 'appl' } })
  // Select the second option in the list this time
  fireEvent.click(screen.getByRole(optionListRole).firstChild.nextSibling)
  // Should match 'Pineapple', filter functionality should work such that it was rendered as the second option
  expect(input).toHaveValue('Pineapple')
})

it('should render a custom option component', () => {
  const expectedTestId = 'foo-bar-Kiwi'

  render(
    <Combobox
      {...defaultProps}
      renderOption={(option) => (
        <div data-testid={`foo-bar-${option}`}>{option}</div>
      )}
    />
  )

  const input = screen.getByRole(inputRole)

  // Focus the input to open the menu
  fireEvent.focus(input)

  // Custom component should render with test id
  expect(screen.getByTestId(expectedTestId)).toBeInTheDocument()
  // Custom component should render option text
  expect(screen.getByTestId(expectedTestId).innerHTML).toBe('Kiwi')
})

it('should render the right number of options', () => {
  render(<Combobox {...defaultProps} />)

  const input = screen.getByRole(inputRole)

  // Focus the input to open the menu
  fireEvent.focus(input)
  // Length of option element collection should match length of options array
  expect(screen.getByRole(optionListRole).children.length).toBe(
    defaultProps.options.length
  )
})

it('should allow custom options to be selected', () => {
  const expectedTestId = 'foo-bar-Kiwi'

  const expectedInputValue = 'Kiwi'

  render(
    <Combobox
      {...defaultProps}
      renderOption={(option) => (
        <div data-testid={`foo-bar-${option}`}>{option}</div>
      )}
    />
  )

  const input = screen.getByRole(inputRole)

  // Focus the input to open the menu
  fireEvent.focus(input)

  // Select an option by a valid testId
  fireEvent.click(screen.getByTestId(expectedTestId))

  // Should match expectedInputValue, filter functionality should work such that it was rendered as the first option
  expect(input).toHaveValue(expectedInputValue)
})

test('when an `onSelect` prop is provided and the user selects an option, the value should be passed to the `onSelect` handler ', () => {
  const expectedInputValue = 'Kiwi'
  const mockHandler = jest.fn((value) => value + ' is tasty')

  render(<Combobox {...defaultProps} onSelect={mockHandler} />)

  const input = screen.getByRole(inputRole)

  // Focus the input
  fireEvent.focus(input)

  // Select an option by a valid testId
  fireEvent.click(screen.getByText(expectedInputValue))

  // Should match expectedInputValue, filter functionality should work such that it was rendered as the first option
  expect(input).toHaveValue(expectedInputValue)

  // The return value of the mock function call was the expectedInputValue
  expect(mockHandler.mock.results[0].value).toBe(
    expectedInputValue + ' is tasty'
  )
})
