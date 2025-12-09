/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import ChoiceGroup, { type RadioProps } from '../partials/choice-group'

interface CheckboxGroupProps {
  label?: string
  helpText?: string
  required?: boolean
  error?: string
  appearance?: 'light' | 'dark'
  className?: string
  inputs: RadioProps[]
}

function RadioGroup(props: CheckboxGroupProps) {
  return <ChoiceGroup type="radio" {...props} />
}

export default RadioGroup
