import classNames from 'classnames'
import { useId } from '@reach/auto-id'
import s from './style.module.css'
import type { HTMLProps } from 'react'
import Label from '../partials/label'

interface TextInputProps {
  className?: string
  field: HTMLProps<HTMLInputElement>
  form: { touched: Record<string, boolean>; errors: Record<string, string> }
  type: HTMLProps<HTMLInputElement>['type']
  label?: string
  helpText?: string
  required?: boolean
  placeholder?: string
  theme: { background: 'light' | 'dark' }
}

function Text({
  className,
  field,
  form,
  type = 'text',
  label,
  helpText,
  required,
  placeholder,
  theme = {
    background: 'light',
  },
}: TextInputProps) {
  //  Note: `field` and `form` props typically come from Formik
  //  ref: https://jaredpalmer.com/formik/docs/api/field
  //  However, they can also be provided in non-Formik use cases
  //  and this component will still function as expected.
  const error =
    field.name && form.touched[field.name] && form.errors[field.name]
  //  Label htmlFor relies on an id on the input field, which must be
  //  unique to prevent collisions between fields or forms on the same page
  const inputId = useId()
  const helpId = useId()
  return (
    <div
      className={classNames(s.root, className, s[`theme-${theme.background}`], {
        [s.hidden]: type === 'hidden',
      })}
    >
      {label && (
        <Label
          inputId={inputId}
          label={label}
          helpId={helpId}
          helpText={helpText}
          required={required}
          error={error}
        />
      )}
      <input
        id={inputId}
        type={type}
        className={classNames(s.input, { [s.hasError]: error })}
        placeholder={placeholder}
        aria-label={label ?? field.name}
        aria-describedby={helpText ? helpId : undefined}
        {...field}
      />
    </div>
  )
}

export default Text
