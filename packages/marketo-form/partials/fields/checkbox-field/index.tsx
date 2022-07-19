import { useFormContext, useFormState } from 'react-hook-form'
import CheckboxInput from '@hashicorp/react-checkbox-input'
import FieldWrapper from '../../field-wrapper'
import { formattedLabel } from '../../../utils'
import type { MarketoFormCheckboxField } from '../../../types'

const CheckboxField = ({ field }: { field: MarketoFormCheckboxField }) => {
  const { register, watch } = useFormContext()
  const { errors, touchedFields } = useFormState()
  const value = watch(field.id, false)

  return (
    <FieldWrapper size="lg">
      <CheckboxInput
        label={formattedLabel(field)}
        field={{
          ...register(field.id, {
            required: field.required ? field.validationMessage : false,
          }),
          value,
        }}
        form={{
          touched: {
            [field.id]: touchedFields[field.id] !== undefined,
          },
          errors: {
            [field.id]: errors[field.id] ?? '',
          },
        }}
      />
    </FieldWrapper>
  )
}

export default CheckboxField
