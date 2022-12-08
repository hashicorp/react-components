import { render, fireEvent, screen } from '@testing-library/react'
import TextareaInput from '.'
import props from './props'
import { getTestValues } from 'swingset/testing'

const defaultProps = getTestValues(props)

describe('<TextareaInput />', () => {
  it('should add a provided className to the root element', () => {
    const className = 'my-text-input'
    const { container } = render(
      <TextareaInput {...defaultProps} className={className} />
    )
    const rootElem = container.firstChild
    expect(rootElem.tagName).toBe('DIV')
    expect(rootElem).toHaveClass(className)
  })

  it('should add a provided className to the root element', () => {
    const className = 'my-special-class-name'
    const { container } = render(
      <TextareaInput {...defaultProps} className={className} />
    )
    expect(container.firstChild).toHaveClass(className)
  })

  it('should set `for` on <label/> that matches `id` on the <input/>', () => {
    const { container } = render(<TextareaInput {...defaultProps} />)
    const inputId = container.querySelector('textarea').getAttribute('id')
    const labelFor = container.querySelector('label').getAttribute('for')
    expect(inputId).toBe(labelFor)
  })

  it('should set `aria-label` to the field `name` if no `label` is provided', () => {
    const { container } = render(
      <TextareaInput {...defaultProps} label={undefined} />
    )
    const ariaLabel = container
      .querySelector('textarea')
      .getAttribute('aria-label')
    expect(ariaLabel).toBe(defaultProps.field.name)
  })

  it('should call onChange when the textareaInput is changed', () => {
    const mockOnChange = jest.fn((e) => e)
    render(
      <TextareaInput
        {...defaultProps}
        field={{ ...defaultProps.field, onChange: mockOnChange }}
      />
    )
    const textareaInput = screen.getByLabelText(defaultProps.label)
    fireEvent.change(textareaInput, { target: { value: 'Some input' } })
    expect(mockOnChange.mock.calls.length).toBe(1)
  })

  it('should display an error when field is `touched` and has `error`', () => {
    const errorText = 'This is an example error.'
    const errors = {}
    errors[defaultProps.field.name] = errorText
    const touched = {}
    touched[defaultProps.field.name] = true
    const { getByText } = render(
      <TextareaInput
        {...defaultProps}
        form={{ ...defaultProps.form, errors, touched }}
      />
    )
    expect(getByText(errorText)).toBeInTheDocument()
  })
})
