import Checkbox from '../checkbox'
import type { ComponentProps } from 'react'
import ChoiceGroup from '../partials/choice-group'

interface CheckboxGroupProps {
  label?: string
  helpText?: string
  required?: boolean
  error?: string
  appearance?: 'light' | 'dark'
  className?: string
  inputs: ComponentProps<typeof Checkbox>[]
}

function CheckboxGroup(props: CheckboxGroupProps) {
  return <ChoiceGroup type="checkbox" {...props} />
}

export default CheckboxGroup
