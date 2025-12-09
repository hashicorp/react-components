/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import classNames from 'classnames'
import { useId } from 'react'
import s from './style.module.css'
import type { HTMLProps } from 'react'
import Label from '../partials/label'

interface TextInputProps {
  className?: string
  field: HTMLProps<HTMLInputElement>
  error?: string
  type?: HTMLProps<HTMLInputElement>['type']
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
  required,
  placeholder,
  appearance = 'light',
}: TextInputProps) {
  //  Label htmlFor relies on an id on the input field, which must be
  //  unique to prevent collisions between fields or forms on the same page
  const inputId = useId()
  const errorId = useId()

  return (
    <div
      className={classNames(s.root, className, s[`theme-${appearance}`], {
        [s.hidden]: type === 'hidden',
      })}
    >
      {label && (
        <Label
          htmlFor={inputId}
          label={label}
          required={required}
          error={error}
          errorId={errorId}
        />
      )}
      <input
        id={inputId}
        type={type}
        className={classNames(s.input, { [s.hasError]: error })}
        placeholder={placeholder}
        aria-label={label ?? field.name}
        aria-describedby={error ? errorId : undefined}
        {...field}
      />
    </div>
  )
}

export default Text
