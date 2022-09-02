import { useFormContext, useFormState } from 'react-hook-form'
import TextInput from '@hashicorp/react-text-input'
import FieldWrapper from '../../field-wrapper'
import { formattedLabel } from '../../../utils'
import type { MarketoFormEmailField } from '../../../types'

const EmailField = ({ field }: { field: MarketoFormEmailField }) => {
  const { register } = useFormContext()
  const { errors, touchedFields } = useFormState()

  return (
    <FieldWrapper>
      <TextInput
        label={formattedLabel(field)}
        field={{
          ...register(field.id),
          type: 'email',
        }}
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

export default EmailField
