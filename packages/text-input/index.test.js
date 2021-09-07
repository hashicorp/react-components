import { render, fireEvent, screen } from '@testing-library/react'
import TextInput from '.'
import props from './props'
import { getTestValues } from 'swingset/testing'

const defaultProps = getTestValues(props)

describe('<TextInput />', () => {
  it('should add a provided className to the root element', () => {
    const className = 'my-text-input'
    const { container } = render(
      <TextInput {...defaultProps} className={className} />
    )
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass(className)
  })

  it('should add a provided className to the root element', () => {
    const className = 'my-special-class-name'
    const { container } = render(
      <TextInput {...defaultProps} className={className} />
    )
    expect(container.firstChild).toHaveClass(className)
  })

  it('should hide the root element when `type` is set to `hidden`', () => {
    const { container } = render(<TextInput {...defaultProps} type="hidden" />)
    expect(container.firstChild).toHaveClass('hidden')
  })

  it('should reflect the email `type` on the input', () => {
    const label = 'My label'
    render(<TextInput {...defaultProps} label={label} type="email" />)
    expect(screen.getByLabelText(label).getAttribute('type')).toBe('email')
  })

  it('should set `for` on <label/> that matches `id` on the <input/>', () => {
    const { container } = render(<TextInput {...defaultProps} />)
    const inputId = container.querySelector('input').getAttribute('id')
    const labelFor = container.querySelector('label').getAttribute('for')
    expect(inputId).toBe(labelFor)
  })

  it('should set `aria-label` to the field `name` if no `label` is provided', () => {
    const { container } = render(
      <TextInput {...defaultProps} label={undefined} />
    )
    const ariaLabel = container
      .querySelector('input')
      .getAttribute('aria-label')
    expect(ariaLabel).toBe(defaultProps.field.name)
  })

  it('should call onChange when the textInput is changed', () => {
    const mockOnChange = jest.fn((e) => e)
    render(
      <TextInput
        {...defaultProps}
        field={{ ...defaultProps.field, onChange: mockOnChange }}
      />
    )
    const textInput = screen.getByLabelText(defaultProps.label)
    fireEvent.change(textInput, { target: { value: 'Some input' } })
    expect(mockOnChange.mock.calls.length).toBe(1)
  })

  it('should display an error when field is `touched` and has `error`', () => {
    const errorText = 'This is an example error.'
    const errors = {}
    errors[defaultProps.field.name] = errorText
    const touched = {}
    touched[defaultProps.field.name] = true
    const { getByText } = render(
      <TextInput
        {...defaultProps}
        form={{ ...defaultProps.form, errors, touched }}
      />
    )
    expect(getByText(errorText)).toBeInTheDocument()
  })
})
