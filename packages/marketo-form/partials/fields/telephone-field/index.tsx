import { useFormContext, useFormState } from 'react-hook-form'
import TextInput from '@hashicorp/react-text-input'
import FieldWrapper from '../../field-wrapper'
import { formattedLabel } from '../../../utils'
import type { MarketoFormTelephoneField } from '../../../types'

const TelephoneField = ({ field }: { field: MarketoFormTelephoneField }) => {
  const { register } = useFormContext()
  const { errors, touchedFields } = useFormState()

  return (
    <FieldWrapper>
      <TextInput
        label={formattedLabel(field)}
        field={register(field.id)}
        placeholder={field.hintText}
        form={{
          touched: {
            [field.id]: touchedFields[field.id] !== undefined,
          },
          errors: {
            [field.id]: errors[field.id] ? errors[field.id]?.message : null,
          },
        }}
      />
    </FieldWrapper>
  )
}

export default TelephoneField