import clsx from 'clsx'
import { useId } from '@reach/auto-id'
import s from './style.module.css'
import { HTMLProps } from 'react'
import Label from '../partials/label'

interface Props {
  className?: string
  field: HTMLProps<HTMLTextAreaElement>
  error?: string
  label?: string
  helpText?: string
  required?: boolean
  placeholder?: string
  appearance?: 'light' | 'dark'
}

function TextareaInput({
  className,
  field,
  error,
  label,
  helpText,
  required,
  placeholder,
  appearance = 'light',
}: Props) {
  //  Label htmlFor relies on an id on the input field, which must be
  //  unique to prevent collisions between fields or forms on the same page
  const inputId = useId()
  const helpId = useId()
  return (
    <div className={clsx(s.root, className, s[`theme-${appearance}`])}>
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
      <textarea
        id={inputId}
        className={clsx(s.input, { [s.hasError]: error })}
        placeholder={placeholder}
        aria-label={label ?? field.name}
        rows={3}
        {...field}
      />
    </div>
  )
}

export default TextareaInput
