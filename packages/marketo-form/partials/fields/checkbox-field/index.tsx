import { useFormContext, useFormState } from 'react-hook-form'
import CheckboxInput from '@hashicorp/react-checkbox-input'
import FieldWrapper from '../../field-wrapper'
import { formattedLabel } from '../../../utils'
import type { MarketoFormCheckboxField } from '../../../types'

const CheckboxField = ({ field }: { field: MarketoFormCheckboxField }) => {
  const { register, watch } = useFormContext()
  const { errors, touchedFields } = useFormState()
  const checked = watch(field.id, false)

  return (
    <FieldWrapper size="lg" fieldId={field.id}>
      <CheckboxInput
        label={formattedLabel(field)}
        field={{
          ...register(field.id),
          checked,
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
