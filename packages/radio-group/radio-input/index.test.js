import { render, screen, fireEvent } from '@testing-library/react'
import RadioInput from '.'

describe('<RadioInput />', () => {
  it('should render a RadioInput', () => {
    render(
      <RadioInput
        name="location"
        label="California"
        value="california"
        checked={false}
        onChange={() => {}}
      />
    )
    const radio = screen.getByTestId('radio-input')
    const input = screen.getByLabelText('California')
    expect(radio).toBeInTheDocument()
    expect(radio.tagName).toBe('LABEL')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('value', 'california')
    expect(input).toHaveAttribute('name', 'location')
    expect(input).not.toBeChecked()
  })

  it('should call onChange when the radio is clicked', () => {
    const mockOnChange = jest.fn()
    render(
      <RadioInput
        name="location"
        label="California"
        value="california"
        checked={false}
        onChange={mockOnChange}
      />
    )
    const radio = screen.getByTestId('radio-input')
    fireEvent.click(radio)
    expect(mockOnChange).toHaveBeenCalled()
  })

  it('should render a disabled radio option', () => {
    render(
      <RadioInput
        name="location"
        label="California"
        value="california"
        checked={false}
        disabled={true}
        onChange={() => {}}
      />
    )
    const input = screen.getByLabelText('California')
    expect(input).toBeDisabled()
  })

  it('should render dark appearance', () => {
    render(
      <RadioInput
        appearance="dark"
        name="location"
        label="California"
        value="california"
        checked={false}
        onChange={() => {}}
      />
    )
    const radio = screen.getByTestId('radio-input')
    expect(radio).toHaveClass('dark')
  })
})
