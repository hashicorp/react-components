import { render, screen, fireEvent } from '@testing-library/react'
import RadioGroup from '.'

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
        error="This is an example error."
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

  it('should render dark appearance', () => {
    render(
      <RadioGroup
        appearance="dark"
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
