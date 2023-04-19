/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import React, { ReactNode, ComponentProps, useId } from 'react'
import s from './style.module.css'
import clsx from 'clsx'

interface RadioCheckboxInputProps {
  label: ReactNode
  appearance?: 'light' | 'dark'
  className?: string
  type: 'radio' | 'checkbox'
  field: ComponentProps<'input'>
  error?: string
}

/**
 * A basic checkbox and label that allow the user to
 * control a `<input type="checkbox" />` element.
 */
function RadioCheckboxInput({
  label,
  appearance = 'light',
  type,
  field,
  error,
  className,
}: RadioCheckboxInputProps) {
  //  Label htmlFor relies on an id on the input field, which must be
  //  unique to prevent collisions between fields or forms on the same page
  const inputId = useId()

  return (
    <div
      className={clsx(
        s.root,
        s[`theme-${appearance}`],
        {
          [s.hasError]: Boolean(error),
        },
        className
      )}
    >
      <div className={s.wrapper}>
        <span className={s.checkbox}>
          <input
            className={clsx(s.input, { [s.hasError]: error })}
            id={inputId}
            type={type}
            {...field}
          />
        </span>

        {label && (
          <label htmlFor={inputId} className={s.label}>
            {label}
          </label>
        )}
      </div>
      {error && <div className={s.error}>{error}</div>}
    </div>
  )
}

export default RadioCheckboxInput
