import classNames from 'classnames'
import { useId } from '@reach/auto-id'
import s from './style.module.css'
import type { HTMLProps } from 'react'
import Label from '../partials/label'

interface TextInputProps {
  className?: string
  field: HTMLProps<HTMLInputElement>
  error?: string
  type: HTMLProps<HTMLInputElement>['type']
  label?: string
  helpText?: string
  required?: boolean
  placeholder?: string
  appearance?: 'light' | 'dark'
}

function Text({
  className,
  field,
  error,
  type = 'text',
  label,
  helpText,
  required,
  placeholder,
  appearance = 'light',
}: TextInputProps) {
  //  Label htmlFor relies on an id on the input field, which must be
  //  unique to prevent collisions between fields or forms on the same page
  const inputId = useId()
  const helpId = useId()
  return (
    <div
      className={classNames(s.root, className, s[`theme-${appearance}`], {
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
