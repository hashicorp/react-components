import Radio from '../checkbox'
import type { ComponentProps } from 'react'
import ChoiceGroup from '../partials/choice-group'

interface CheckboxGroupProps {
  label?: string
  helpText?: string
  required?: boolean
  error?: string
  appearance?: 'light' | 'dark'
  className?: string
  inputs: ComponentProps<typeof Radio>[]
}

function RadioGroup(props: CheckboxGroupProps) {
  return <ChoiceGroup type="radio" {...props} />
}

export default RadioGroup
