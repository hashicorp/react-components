import { useId } from '@react-aria/utils'
import type { RadioInputProps } from './types'
import classNames from 'classnames'
import s from './style.module.css'

export default function RadioInput({
  variant = 'light',
  label,
  name,
  value,
  checked,
  disabled = false,
  onChange,
}: RadioInputProps) {
  const id = useId()
  return (
    <label className={classNames(s.radioInput, s[variant])}>
      <input
        className={s.input}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <span className={s.label}>{label}</span>
    </label>
  )
}
