import React from 'react'
import { v1 as uuidv1 } from 'uuid'

function CheckboxInput(props) {
  //  `field` and `form` props come from Formik
  //  https://jaredpalmer.com/formik/docs/api/field
  const { label, theme, field, form } = props
  const error = form.touched[field.name] && form.errors[field.name]
  //  Label htmlFor relies on an id on the input field, which must be
  //  unique to prevent collisions between fields or forms on the same page
  const inputId = 'u' + uuidv1()
  return (
    <div className="g-checkbox-input" data-theme-bg={theme.background}>
      <div className="wrapper">
        <span className="checkbox">
          {field.value && <SvgrCheckmark />}
          <input
            id={inputId}
            type="checkbox"
            data-has-error={(!!error).toString()}
            {...field}
          />
        </span>

        {label && (
          <label htmlFor={inputId}>
            <span
              className="g-type-body-small"
              dangerouslySetInnerHTML={{ __html: label }}
            />
          </label>
        )}
      </div>
      {error && <div className="g-type-body-small error">{error}</div>}
    </div>
  )
}

CheckboxInput.defaultProps = {
  theme: { background: 'light' },
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
