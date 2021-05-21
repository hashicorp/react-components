import { v1 as uuidv1 } from 'uuid'

function TextInput(props) {
  //  `field` and `form` props come from Formik
  //  https://jaredpalmer.com/formik/docs/api/field
  const { field, form, type, label, placeholder, theme } = props
  const error = form.touched[field.name] && form.errors[field.name]
  //  Label htmlFor relies on an id on the input field, which must be
  //  unique to prevent collisions between fields or forms on the same page
  const inputId = 'u' + uuidv1()
  return (
    <div
      className="g-text-input"
      hidden={type === 'hidden'}
      data-theme-bg={theme.background}
    >
      {label && (
        <label htmlFor={inputId}>
          <span className="g-type-label">{label}</span>
        </label>
      )}
      <input
        id={inputId}
        type={type}
        data-has-error={(!!error).toString()}
        placeholder={placeholder}
        aria-label={!label && field.name}
        {...field}
      />
      {error && <div className="g-type-body-small error">{error}</div>}
    </div>
  )
}

TextInput.defaultProps = {
  type: 'text',
  theme: {
    background: 'light',
  },
}

export default TextInput
