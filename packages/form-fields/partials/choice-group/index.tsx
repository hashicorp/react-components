import { useId } from '@reach/auto-id'
import Radio from '../../radio'
import Checkbox from '../../checkbox'
import Label from '../label'
import type { ComponentProps } from 'react'
import classNames from 'classnames'
import s from './style.module.css'

interface BaseChoiceGroupProps {
  label?: string
  helpText?: string
  required?: boolean
  error?: string
  appearance?: 'light' | 'dark'
  className?: string
  inputs: (ComponentProps<typeof Radio> | ComponentProps<typeof Checkbox>)[]
}

interface RadioChoiceGroupProps extends BaseChoiceGroupProps {
  type: 'radio'
  inputs: ComponentProps<typeof Radio>[]
}

interface CheckboxChoiceGroupProps extends BaseChoiceGroupProps {
  type: 'checkbox'
  inputs: ComponentProps<typeof Checkbox>[]
}

type ChoiceGroupProps = RadioChoiceGroupProps | CheckboxChoiceGroupProps

function ChoiceGroup({
  type,
  label,
  error,
  required,
  helpText,
  appearance,
  className,
  inputs,
}: ChoiceGroupProps) {
  const helpId = useId()
  const Component = type === 'radio' ? Radio : Checkbox
  return (
    <fieldset
      className={classNames(s.root, className, s[`theme-${appearance}`])}
    >
      {label && (
        <Label
          legend
          label={label}
          helpId={helpId}
          helpText={helpText}
          required={required}
          error={error}
        />
      )}
      <div>
        {inputs.map((input) => (
          <Component
            {...input}
            key={input.field.name}
            appearance={appearance}
            field={{
              ...input.field,
              'aria-describedby': helpId,
            }}
          />
        ))}
      </div>
    </fieldset>
  )
}

export default ChoiceGroup
