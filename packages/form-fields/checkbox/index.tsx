import React, { HTMLProps } from 'react'
import { useId } from '@reach/auto-id'
import s from './style.module.css'
import classNames from 'classnames'
import clsx from 'clsx'

interface CheckboxInputProps {
  label: string
  theme?: { background: 'light' | 'dark' }
  className?: string
  field: HTMLProps<HTMLInputElement>
  form: {
    touched: Record<string, boolean>
    errors: Record<string, string | null | undefined>
  }
}

/**
 * A basic checkbox and label that allow the user to
 * control a `<input type="checkbox" />` element.
 */
function CheckboxInput({
  label,
  theme = { background: 'light' },
  field,
  form,
  className,
}: CheckboxInputProps) {
  //  `field` and `form` props typically come from Formik,
  // though you can also provide them without Formik.
  //  https://jaredpalmer.com/formik/docs/api/field
  const error =
    field.name && form.touched[field.name] && form.errors[field.name]
  //  Label htmlFor relies on an id on the input field, which must be
  //  unique to prevent collisions between fields or forms on the same page
  const inputId = useId()

  return (
    <div
      className={classNames(
        s.root,
        s[`background-${theme.background}`],
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
            <span dangerouslySetInnerHTML={{ __html: label }} />
          </label>
        )}
      </div>
      {error && <div className={s.error}>{error}</div>}
    </div>
  )
}

export default CheckboxInput
