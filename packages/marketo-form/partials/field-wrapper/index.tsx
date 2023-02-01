/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ReactNode } from 'react'

const FieldWrapper = ({
  children,
  fieldId,
}: {
  children: ReactNode
  fieldId: string
}) => {
  return (
    <div
      style={{ display: 'flex' }}
      className="marketo-form-field-wrapper"
      data-field-id={fieldId}
    >
      {children}
    </div>
  )
}

export default FieldWrapper
