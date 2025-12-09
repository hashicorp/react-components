/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import clsx from 'clsx'
import s from './style.module.css'

interface LabelProps {
  label: string
  fieldName: string
  className?: string
}

export default function Label({ label, fieldName, className }: LabelProps) {
  return (
    <label
      htmlFor={fieldName}
      className={clsx(className && className, s.label)}
    >
      {label}
    </label>
  )
}
