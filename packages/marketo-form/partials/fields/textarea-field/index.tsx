import { useFormContext, useFormState } from 'react-hook-form'
import TextareaInput from '@hashicorp/react-textarea-input'
import FieldWrapper from '../../field-wrapper'
import { formattedLabel } from '../../../utils'
import type { MarketoFormTextAreaField } from '../../../types'

const Index = ({ field }: { field: MarketoFormTextAreaField }) => {
  const { register } = useFormContext()
  const { errors, touchedFields } = useFormState()

  return (
    <FieldWrapper>
      <TextareaInput
        label={formattedLabel(field)}
        field={register(field.id)}
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

export default Index
