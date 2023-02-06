/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { useFormContext } from 'react-hook-form'
import TextInput from '@hashicorp/react-form-fields/text'
import FieldWrapper from '../../field-wrapper'
import { formattedLabel, useErrorMessage } from '../../../utils'
import type { MarketoFormTelephoneField } from '../../../types'

const TelephoneField = ({ field }: { field: MarketoFormTelephoneField }) => {
  const { register } = useFormContext()
  const error = useErrorMessage(field.id)

  return (
    <FieldWrapper fieldId={field.id}>
      <TextInput
        label={formattedLabel(field)}
        type="tel"
        field={register(field.id)}
        placeholder={field.hintText}
        error={error}
        required={field.required}
      />
    </FieldWrapper>
  )
}

export default TelephoneField
