import Combobox, { ComboboxOption } from './'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'

afterEach(cleanup)

it('should render an input element with a proper aria-label', () => {
  const label = 'Fruit picker'
  const role = 'combobox'
  render(
    <Combobox
      onSelect={(value) => value}
      renderOption={(option) => <ComboboxOption value={option} />}
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
      renderOption={(option) => <ComboboxOption value={option} />}
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
      renderOption={(option) => <ComboboxOption value={option} />}
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
  const expectedInputValue = 'Apple'
  const optionListRole = 'listbox'

  render(
    <Combobox
      onSelect={(value) => value}
      renderOption={(option) => <ComboboxOption value={option} />}
      options={[expectedInputValue, 'Orange', 'Banana', 'Pineapple', 'Kiwi']}
      label={label}
    />
  )
  const input = screen.getByRole(inputRole)

  // Type `app`
  fireEvent.change(input, { target: { value: 'app' } })

  // Select first option in the list
  fireEvent.click(screen.getByRole(optionListRole).firstChild)

  // Should match expectedInputValue
  expect(input).toHaveValue(expectedInputValue)
})
