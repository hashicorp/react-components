import classNames from 'classnames'
import RadioInput from '@hashicorp/react-radio-input'
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
}: RadioGroupProps) {
  return (
    <fieldset className={classNames(s.radioGroup, s[variant])}>
      <legend className={s.label}>{label}</legend>
      {helpText ? <span className={s.helpText}>{helpText}</span> : null}
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
              onChange={(e) => onChange(e.target.value)}
            />
          )
        })}
      </div>
    </fieldset>
  )
}
