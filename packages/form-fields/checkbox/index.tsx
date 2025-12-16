/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import React, { ReactNode, ComponentProps } from 'react'
import RadioCheckbox from '../partials/radio-checkbox'

interface CheckboxInputProps {
  label: ReactNode
  appearance?: 'light' | 'dark'
  className?: string
  field: ComponentProps<'input'>
  error?: string
}

/**
 * A basic checkbox and label that allow the user to
 * control a `<input type="checkbox" />` element.
 */
function CheckboxInput(props: CheckboxInputProps) {
  return <RadioCheckbox type="checkbox" {...props} />
}

export default CheckboxInput
