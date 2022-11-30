import { useId } from '@reach/auto-id'
import Checkbox from '../checkbox'
import Label from '../partials/label'
import type { ComponentProps } from 'react'
import classNames from 'classnames'
import s from './style.module.css'

interface CheckboxGroupProps {
  label?: string
  helpText?: string
  required?: boolean
  error?: string
  appearance?: 'light' | 'dark'
  className?: string
  inputs: ComponentProps<typeof Checkbox>[]
}

function CheckboxGroup({
  label,
  error,
  required,
  helpText,
  appearance,
  className,
  inputs,
}: CheckboxGroupProps) {
  const labelId = useId()
  const helpId = useId()
  return (
    <div className={classNames(s.root, className, s[`theme-${appearance}`])}>
      {label && (
        <Label
          id={labelId}
          label={label}
          helpId={helpId}
          helpText={helpText}
          required={required}
          error={error}
        />
      )}
      <div>
        {inputs.map((input) => (
          <Checkbox
            {...input}
            key={input.field.name}
            appearance={appearance}
            field={{
              ...input.field,
              'aria-describedby': helpId,
              'aria-labelledby': labelId,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default CheckboxGroup
