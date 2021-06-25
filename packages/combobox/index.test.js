import Combobox from './'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'

afterEach(cleanup)

it('should render an input element with a proper aria-label', () => {
  const label = 'Fruit picker'
  const role = 'combobox'
  render(
    <Combobox
      onSelect={(value) => value}
      // renderOption={(option) => <ComboboxOption value={option} />}
      options={['Apple', 'Orange', 'Banana', 'Pineapple', 'Kiwi']}
      label={label}
    />
  )

  expect(screen.getByRole(role)).toHaveAttribute('aria-label', label)
})

it('should render our input with error state when invalidInputValue is true', () => {
  const label = 'Fruit picker'
  const role = 'combobox'
  render(
    <Combobox
      onSelect={(value) => value}
      // renderOption={(option) => <ComboboxOption value={option} />}
      options={['Apple', 'Orange', 'Banana', 'Pineapple', 'Kiwi']}
      label={label}
      invalidInputValue
    />
  )
  expect(screen.getByRole(role)).toHaveAttribute('data-has-error', 'true')
})

it('should focus the input when dropdown button is clicked', () => {
  const label = 'Fruit picker'
  const role = 'combobox'
  const buttonLabel = 'Pick a fruit'

  render(
    <Combobox
      onSelect={(value) => value}
      // renderOption={(option) => <ComboboxOption value={option} />}
      options={['Apple', 'Orange', 'Banana', 'Pineapple', 'Kiwi']}
      label={label}
      buttonLabel={buttonLabel}
      invalidInputValue
    />
  )
  // Check for focus on input after click of dropdown button
  fireEvent.click(screen.getByText(buttonLabel).parentElement) // label is rendered as visually hidden span for a11y within button
  expect(screen.getByRole(role)).toHaveFocus
})

it('should filter to the proper options given enough characters', () => {
  const label = 'Fruit picker'
  const inputRole = 'combobox'
  const optionListRole = 'listbox'

  render(
    <Combobox
      onSelect={(value) => value}
      //  'Apple' should be the best match and is intentionally not placed as the first option.
      // Filter functionality should work such that it is rendered as the first option
      options={['Orange', 'Banana', 'Apple', 'Pineapple', 'Kiwi']}
      label={label}
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
})

it('should should all options when input value is completely different than the options', () => {
  const label = 'Fruit picker'
  const optionListRole = 'listbox'
  const inputRole = 'combobox'
  const options = ['Orange', 'Banana', 'Pineapple', 'Apple', 'Kiwi']

  render(
    <Combobox onSelect={(value) => value} options={options} label={label} />
  )
  const input = screen.getByRole(inputRole)

  // Type large, unrelated string
  fireEvent.change(input, { target: { value: 'zzzzzzzzzzzzzzzzzzzzzzzzz' } })

  // Should match expectedInputValue, filter functionality should work such that it was rendered as the first option
  expect(screen.getByRole(optionListRole).children.length).toBe(options.length)
})

it('should render a custom option component', () => {
  const label = 'Fruit picker'
  const optionListRole = 'listbox'
  const expectedTestId = 'foo-bar-Kiwi'
  const options = ['Orange', 'Banana', 'Pineapple', 'Apple', 'Kiwi']
  const buttonLabel = 'Pick a fruit'

  render(
    <Combobox
      onSelect={(value) => value}
      renderOption={(option) => (
        <div data-testid={`foo-bar-${option}`}>{option}</div>
      )}
      options={options}
      label={label}
      buttonLabel={buttonLabel}
    />
  )
  // Open the menu
  fireEvent.click(screen.getByText(buttonLabel).parentElement) // label is rendered as visually hidden span for a11y within button

  // Length of option element collection should match length of options array
  expect(screen.getByRole(optionListRole).children.length).toBe(options.length)
  // Custom component should render with test id
  expect(screen.getByTestId(expectedTestId)).toBeInTheDocument()
  // Custom component should render option text
  expect(screen.getByTestId(expectedTestId).innerHTML).toBe('Kiwi')
})

it('should allow custom options to be selected', () => {
  const label = 'Fruit picker'
  const optionListRole = 'listbox'
  const expectedTestId = 'foo-bar-Kiwi'
  const inputRole = 'combobox'
  const options = ['Orange', 'Banana', 'Pineapple', 'Apple', 'Kiwi']
  const expectedInputValue = 'Kiwi'

  render(
    <Combobox
      onSelect={(value) => value}
      renderOption={(option) => (
        <div data-testid={`foo-bar-${option}`}>{option}</div>
      )}
      options={options}
      label={label}
    />
  )
  const input = screen.getByRole(inputRole)

  // Type `kiw`
  fireEvent.change(input, { target: { value: 'kiw' } })

  expect(
    screen.getByRole(optionListRole).firstChild.firstChild
  ).toHaveAttribute('data-testid', expectedTestId)

  // Select first option in the list
  fireEvent.click(screen.getByRole(optionListRole).firstChild)

  // Should match expectedInputValue, filter functionality should work such that it was rendered as the first option
  expect(input).toHaveValue(expectedInputValue)
})
