/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import classNames from 'classnames'
import { useId } from '@reach/auto-id'
import s from './style.module.css'

function TextInput({
  className,
  field,
  form,
  type = 'text',
  label,
  placeholder,
  theme = {
    background: 'light',
  },
}) {
  //  Note: `field` and `form` props typically come from Formik
  //  ref: https://jaredpalmer.com/formik/docs/api/field
  //  However, they can also be provided in non-Formik use cases
  //  and this component will still function as expected.
  const error = form.touched[field.name] && form.errors[field.name]
  //  Label htmlFor relies on an id on the input field, which must be
  //  unique to prevent collisions between fields or forms on the same page
  const inputId = useId()
  return (
    <div
      className={classNames(s.root, className, s[`theme-${theme.background}`], {
        [s.hidden]: type === 'hidden',
      })}
    >
      {label && (
        <label htmlFor={inputId} className={s.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={classNames(s.input, { [s.hasError]: error })}
        placeholder={placeholder}
        aria-label={!label && field.name}
        {...field}
      />
      {error && <div className={s.error}>{error}</div>}
    </div>
  )
}

export default TextInput
