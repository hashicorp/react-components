import { useFormContext, useFormState } from 'react-hook-form'
import CheckboxInput from '@hashicorp/react-checkbox-input'
import Wrapper from '../../wrapper'
import { formattedLabel } from '../../../utils'
import type { MarketoFormCheckboxField } from '../../../types'

const CheckboxField = ({ field }: { field: MarketoFormCheckboxField }) => {
  const { register, watch } = useFormContext()
  const { errors, touchedFields } = useFormState()
  const value = watch(field.id, false)

  return (
    <Wrapper size="lg">
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
    </Wrapper>
  )
}

export default CheckboxField
