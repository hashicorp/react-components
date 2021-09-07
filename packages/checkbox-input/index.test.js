import CheckboxInput from './'
import { render, fireEvent, screen } from '@testing-library/react'
import props from './props'
import { getTestValues } from 'swingset/testing'

const defaultProps = getTestValues(props)
// @TODO: props.js values are passed through getStaticProps and therefore
// cannot contain functions as the results are serialized.
defaultProps.field.onChange = () => null

describe('<CheckboxInput />', () => {
  it('should pass a provided className to the root element', () => {
    const className = 'my-special-checkbox'
    const { container } = render(
      <CheckboxInput {...defaultProps} className={className} />
    )
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass(className)
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
