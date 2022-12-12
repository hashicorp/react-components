import React, { ReactNode, ComponentProps } from 'react'
import RadioCheckbox from '../partials/radio-checkbox'

interface RadioInputProps {
  label: ReactNode
  appearance?: 'light' | 'dark'
  className?: string
  field: ComponentProps<'input'>
  error?: string
}

function RadioInput(props: RadioInputProps) {
  return <RadioCheckbox type="radio" {...props} />
}

export default RadioInput
