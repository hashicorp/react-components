/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { useId } from 'react'
import Radio from '../../radio'
import Checkbox from '../../checkbox'
import Label from '../label'
import type { ComponentProps } from 'react'
import clsx from 'clsx'
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

export interface RadioProps extends ComponentProps<typeof Radio> {
  key: string
}

export interface CheckboxProps extends ComponentProps<typeof Checkbox> {}

interface RadioChoiceGroupProps extends BaseChoiceGroupProps {
  type: 'radio'
  inputs: RadioProps[]
}

interface CheckboxChoiceGroupProps extends BaseChoiceGroupProps {
  type: 'checkbox'
  inputs: CheckboxProps[]
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
  const errorId = useId()
  return (
    <fieldset className={clsx(s.root, className, s[`theme-${appearance}`])}>
      {label && (
        <Label
          legend
          label={label}
          helpId={helpId}
          helpText={helpText}
          required={required}
          error={error}
          errorId={errorId}
        />
      )}
      <div>
        {inputs.map((input: CheckboxProps | RadioProps) => {
          const props = {
            ...input,
            appearance,
            field: {
              ...input.field,
              'aria-describedby': `${helpId} ${errorId}`,
            },
          }
          return type === 'radio' ? (
            <Radio key={(input as RadioProps).key} {...props} />
          ) : (
            <Checkbox key={input.field.name} {...props} />
          )
        })}
      </div>
    </fieldset>
  )
}

export default ChoiceGroup
