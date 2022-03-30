import classNames from 'classnames'
import RadioInput from '@hashicorp/react-radio-input'
import { IconAlertTriangleFill16 } from '@hashicorp/flight-icons/svg-react/alert-triangle-fill-16'
import type { RadioGroupProps } from './types'
import s from './style.module.css'

export default function RadioGroup({
  layout = 'stacked',
  variant = 'light',
  label,
  helpText,
  name,
  value,
  onChange,
  options,
  errors,
  touched,
}: RadioGroupProps) {
  //  `errors` and `touched` props typically come from Formik,
  // though you can also provide them without Formik.
  //  https://jaredpalmer.com/formik/docs/api/field
  const error = touched && touched[name] && errors && errors[name]
  return (
    <fieldset
      className={classNames(s.radioGroup, s[variant])}
      data-testid="radio-group"
    >
      <legend className={s.label}>{label}</legend>
      {error ? (
        <p className={s.error}>
          <IconAlertTriangleFill16 className={s.icon} />
          {error}
        </p>
      ) : null}
      {helpText ? <p className={s.helpText}>{helpText}</p> : null}
      <div className={classNames(s.radios, s[layout])}>
        {options.map((option, index) => {
          return (
            <RadioInput
              variant={variant}
              key={index}
              label={option.label}
              name={name}
              value={option.value}
              checked={option.value === value}
              disabled={option.disabled}
              onChange={() => onChange(option.value)}
            />
          )
        })}
      </div>
    </fieldset>
  )
}
