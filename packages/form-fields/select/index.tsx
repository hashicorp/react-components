/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import classNames from 'classnames'
import { useId } from 'react'
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
  const errorId = useId()
  return (
    <div className={classNames(s.root, className, s[`theme-${appearance}`])}>
      {label && (
        <Label
          htmlFor={inputId}
          label={label}
          helpId={helpId}
          helpText={helpText}
          required={required}
          error={error}
          errorId={errorId}
        />
      )}
      <select
        id={inputId}
        className={classNames(s.input, { [s.hasError]: error })}
        aria-label={label ?? field.name}
        aria-describedby={error ? errorId : undefined}
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
