import classNames from 'classnames'
import { useId } from '@reach/auto-id'
import s from './style.module.css'
import type { HTMLProps } from 'react'
import Label from '../partials/label'

interface SelectProps {
  className?: string
  field: HTMLProps<HTMLSelectElement>
  error?: string
  label?: string
  helpText?: string
  required?: boolean
  appearance?: 'light' | 'dark'
  options: { value: string | number; label?: string }[]
}

function Select({
  className,
  field,
  error,
  label,
  helpText,
  required,
  appearance = 'light',
  options,
}: SelectProps) {
  //  Label htmlFor relies on an id on the input field, which must be
  //  unique to prevent collisions between fields or forms on the same page
  const inputId = useId()
  const helpId = useId()
  return (
    <div className={classNames(s.root, className, s[`theme-${appearance}`])}>
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
