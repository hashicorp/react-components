import clsx from 'clsx'
import { v1 as uuidv1 } from 'uuid'
import type { RefObject, ChangeEventHandler, FocusEventHandler } from 'react'
import s from './style.module.css'

interface Props {
  className?: string
  field: {
    name: string
    onChange: ChangeEventHandler<HTMLTextAreaElement>
    onBlur?: FocusEventHandler<HTMLTextAreaElement>
    ref?: RefObject<HTMLTextAreaElement>
  }
  form: { touched: Record<string, boolean>; errors: Record<string, string> }
  label?: string
  placeholder?: string
  theme?: { background: 'light' | 'dark' | 'brand' }
}

function TextareaInput({
  className,
  field,
  form,
  label,
  placeholder,
  theme = {
    background: 'light',
  },
}: Props) {
  //  Note: `field` and `form` props typically come from Formik
  //  ref: https://jaredpalmer.com/formik/docs/api/field
  //  However, they can also be provided in non-Formik use cases
  //  and this component will still function as expected.
  const error = form.touched[field.name] && form.errors[field.name]
  //  Label htmlFor relies on an id on the input field, which must be
  //  unique to prevent collisions between fields or forms on the same page
  const inputId = 'u' + uuidv1()
  return (
    <div className={clsx(s.root, className, s[`theme-${theme.background}`])}>
      {label && (
        <label htmlFor={inputId} className={s.label}>
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={clsx(s.input, { [s.hasError]: error })}
        placeholder={placeholder}
        aria-label={label ?? field.name}
        rows={3}
        {...field}
      />
      {error && <div className={s.error}>{error}</div>}
    </div>
  )
}

export default TextareaInput
