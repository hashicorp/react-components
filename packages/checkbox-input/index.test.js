import { render, fireEvent, screen } from '@testing-library/react'
import transformProps from '../../__test-helpers/transform-props'
import CheckboxInput from './'

const defaultProps = transformProps(__dirname)

// @TODO: our props.json5 format doesn't seem to allow the expression of
// function values as default prop values. For now, we manually
// set the onChange prop to a function, otherwise we'll get a warning
// from React about rendering a "read-only" field.
defaultProps.field.onChange = () => null

describe('<CheckboxInput />', () => {
  it('should render a `.g-checkbox-input` <div> root element', () => {
    const { container } = render(<CheckboxInput {...defaultProps} />)
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass('g-checkbox-input')
  })

  it('should render a simple `label` string as a <label> for the input', () => {
    render(<CheckboxInput {...defaultProps} />)
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument()
    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument()
  })

  it('should render HTML passed to the `label` prop', () => {
    const emText = 'special emphasis'
    render(
      <CheckboxInput
        {...defaultProps}
        label={`My label with <em>${emText}</em> html`}
      />
    )
    expect(screen.getByText(emText)).toBeInTheDocument()
    expect(screen.getByText(emText).tagName).toBe('EM')
  })

  it('should show the Check icon when the input is checked', () => {
    const props = defaultProps
    const { container } = render(
      <CheckboxInput
        {...defaultProps}
        field={{ ...props.field, value: true, checked: true }}
      />
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('should set `for` on <label/> that matches `id` on the <input/>', () => {
    const { container } = render(<CheckboxInput {...defaultProps} />)
    const inputId = container.querySelector('input').getAttribute('id')
    const labelFor = container.querySelector('label').getAttribute('for')
    expect(inputId).toBe(labelFor)
  })

  it('should call onChange when the checkbox is clicked', () => {
    const mockOnChange = jest.fn()
    render(
      <CheckboxInput
        {...defaultProps}
        field={{ ...defaultProps.field, onChange: mockOnChange }}
      />
    )
    const checkbox = screen.getByLabelText(defaultProps.label)
    fireEvent.click(checkbox)
    expect(mockOnChange.mock.calls.length).toBe(1)
    expect(checkbox.checked).toBe(true)
  })

  it('should display an error when field is `touched` and has `error`', () => {
    const errorText = 'This is an example error.'
    const errors = {}
    errors[defaultProps.field.name] = errorText
    const touched = {}
    touched[defaultProps.field.name] = true
    render(
      <CheckboxInput
        {...defaultProps}
        form={{ ...defaultProps.form, errors, touched }}
      />
    )
    expect(screen.getByText(errorText)).toBeInTheDocument()
  })
})
