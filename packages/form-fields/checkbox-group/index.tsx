/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import ChoiceGroup, { type CheckboxProps } from '../partials/choice-group'

interface CheckboxGroupProps {
  label?: string
  helpText?: string
  required?: boolean
  error?: string
  appearance?: 'light' | 'dark'
  className?: string
  inputs: CheckboxProps[]
}

function CheckboxGroup(props: CheckboxGroupProps) {
  return <ChoiceGroup type="checkbox" {...props} />
}

export default CheckboxGroup
