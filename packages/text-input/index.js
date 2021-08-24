import classNames from 'classnames'
import { v1 as uuidv1 } from 'uuid'
import s from './style.module.css'

function TextInput(props) {
  //  `field` and `form` props come from Formik
  //  https://jaredpalmer.com/formik/docs/api/field
  const { className, field, form, type, label, placeholder, theme } = props
  const error = form.touched[field.name] && form.errors[field.name]
  //  Label htmlFor relies on an id on the input field, which must be
  //  unique to prevent collisions between fields or forms on the same page
  const inputId = 'u' + uuidv1()
  return (
    <div
      className={classNames(s.root, className, s[`theme-${theme.background}`], {
        [s.hidden]: type === 'hidden',
      })}
    >
      {label && (
        <label htmlFor={inputId} className={s.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={classNames(s.input, { [s.hasError]: error })}
        placeholder={placeholder}
        aria-label={!label && field.name}
        {...field}
      />
      {error && <div className={s.error}>{error}</div>}
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
