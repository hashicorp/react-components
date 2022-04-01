import { render, screen, fireEvent } from '@testing-library/react'
import RadioInput from './radio-input'
import RadioGroup from '.'

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

  it('should render variants', () => {
    render(
      <RadioInput
        variant="dark"
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

describe('<RadioGroup />', () => {
  it('should render a RadioGroup', () => {
    render(
      <RadioGroup
        label="Locations"
        helpText="Help text"
        name="location"
        value={null}
        onChange={() => {}}
        options={[
          {
            label: 'One',
            value: 'one',
          },
          {
            label: 'Two',
            value: 'two',
          },
          {
            label: 'Three',
            value: 'three',
          },
        ]}
      />
    )
    const radioGroup = screen.getByRole('group')
    const options = screen.getAllByTestId('radio-input')
    expect(radioGroup).toHaveTextContent('Locations')
    expect(radioGroup).toHaveTextContent('Help text')
    expect(options).toHaveLength(3)
  })

  it('should call onChange when a radio option is clicked', () => {
    const mockValue = 'one'
    const mockOnChange = jest.fn()
    mockOnChange.mockReturnValue(mockValue)
    render(
      <RadioGroup
        label="Locations"
        name="location"
        value={null}
        onChange={mockOnChange}
        options={[
          {
            label: 'One',
            value: mockValue,
          },
        ]}
      />
    )
    const option = screen.getByLabelText('One')
    fireEvent.click(option)
    expect(mockOnChange).toHaveBeenCalled()
    expect(mockOnChange).toHaveReturned()
  })

  it('should display an error when field is `touched` and has `error`', () => {
    const errorText = 'This is an example error.'
    render(
      <RadioGroup
        label="Locations"
        name="location"
        value={null}
        onChange={() => {}}
        errors={{ location: errorText }}
        touched={{ location: true }}
        options={[
          {
            label: 'One',
            value: 'one',
          },
        ]}
      />
    )
    expect(screen.getByText(errorText)).toBeInTheDocument()
  })

  it('should render variants', () => {
    render(
      <RadioGroup
        variant="dark"
        label="Locations"
        name="location"
        value={null}
        onChange={() => {}}
        options={[
          {
            label: 'One',
            value: 'one',
          },
        ]}
      />
    )
    const radioGroup = screen.getByTestId('radio-group')
    expect(radioGroup).toHaveClass('dark')
  })
})
