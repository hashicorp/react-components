import classNames from 'classnames'
import { useId } from '@reach/auto-id'
import s from './style.module.css'
import type { HTMLProps } from 'react'
import Label from '../partials/label'

interface SelectProps {
  className?: string
  field: HTMLProps<HTMLSelectElement>
  form: { touched: Record<string, boolean>; errors: Record<string, string> }
  label?: string
  helpText?: string
  required?: boolean
  theme: { background: 'light' | 'dark' }
  options: { value: string | number; label?: string }[]
}

function Select({
  className,
  field,
  form,
  label,
  helpText,
  required,
  theme = {
    background: 'light',
  },
  options,
}: SelectProps) {
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
      className={classNames(s.root, className, s[`theme-${theme.background}`])}
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
      <select
        id={inputId}
        className={classNames(s.input, { [s.hasError]: error })}
        aria-label={label ?? field.name}
        {...field}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label ?? o.value}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
