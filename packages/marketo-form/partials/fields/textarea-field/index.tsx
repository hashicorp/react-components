import { useFormContext, useFormState } from 'react-hook-form'
import TextareaInput from '@hashicorp/react-textarea-input'
import FieldWrapper from '../../field-wrapper'
import { formattedLabel } from '../../../utils'
import type { MarketoFormTextAreaField } from '../../../types'

const Index = ({ field }: { field: MarketoFormTextAreaField }) => {
  const { register } = useFormContext()
  // We use the generic Record<string, unknown> to short-circuit a recursive
  // type that produces an unsatisfiable type when the default of
  // Record<string, any> is used.
  const { errors, touchedFields } = useFormState<Record<string, unknown>>()

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
