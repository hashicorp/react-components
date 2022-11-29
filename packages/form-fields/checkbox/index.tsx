import React, { ReactNode, ComponentProps } from 'react'
import { useId } from '@reach/auto-id'
import s from './style.module.css'
import classNames from 'classnames'
import clsx from 'clsx'

interface CheckboxInputProps {
  label: ReactNode
  appearance?: 'light' | 'dark'
  className?: string
  field: ComponentProps<'input'>
  error?: string
}

/**
 * A basic checkbox and label that allow the user to
 * control a `<input type="checkbox" />` element.
 */
function CheckboxInput({
  label,
  appearance = 'light',
  field,
  error,
  className,
}: CheckboxInputProps) {
  //  Label htmlFor relies on an id on the input field, which must be
  //  unique to prevent collisions between fields or forms on the same page
  const inputId = useId()

  return (
    <div
      className={classNames(
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
            type="checkbox"
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

export default CheckboxInput
