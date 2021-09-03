import React from 'react'
import { v1 as uuidv1 } from 'uuid'
import s from './style.module.css'
import classNames from 'classnames'

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
}) {
  //  `field` and `form` props typically come from Formik,
  // though you can also provide them without Formik.
  //  https://jaredpalmer.com/formik/docs/api/field
  const error = form.touched[field.name] && form.errors[field.name]
  //  Label htmlFor relies on an id on the input field, which must be
  //  unique to prevent collisions between fields or forms on the same page
  const inputId = 'u' + uuidv1()

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
          {field.value && <SvgrCheckmark />}
          <input id={inputId} type="checkbox" {...field} />
        </span>

        {label && (
          <label htmlFor={inputId} className={s.label}>
            <span dangerouslySetInnerHTML={{ __html: label }} />
          </label>
        )}
      </div>
      {error && <div className={s.errorText}>{error}</div>}
    </div>
  )
}

const SvgrCheckmark = (props) => (
  <svg width={12} height={12} viewBox="0 0 12 12" fill="none" {...props}>
    <g id="Check">
      <path
        id="Vector"
        d="M1.91889 5.37109L0.941895 6.51009L5.08989 10.0641L11.0569 2.90409L9.90489 1.94409L4.91189 7.93609L1.91889 5.37109Z"
        fill="black"
      />
    </g>
  </svg>
)

export default CheckboxInput
