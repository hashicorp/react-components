import classNames from 'classnames'
import RadioInput from './radio-input'
import { IconAlertTriangleFill16 } from '@hashicorp/flight-icons/svg-react/alert-triangle-fill-16'
import type { RadioGroupProps } from './types'
import s from './style.module.css'

export default function RadioGroup({
  layout = 'stacked',
  appearance = 'light',
  label,
  helpText,
  name,
  value,
  onChange,
  options,
  error,
}: RadioGroupProps) {
  return (
    <fieldset
      className={classNames(s.radioGroup, s[appearance])}
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
              key={index}
              appearance={appearance}
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
