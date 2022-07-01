import { useFormContext, useFormState } from 'react-hook-form'
import TextInput from '@hashicorp/react-text-input'
import Wrapper from '../../wrapper'
import { formattedLabel } from '../../../utils'
import type { MarketoFormTextField } from '../../../types'

const Index = ({ field }: { field: MarketoFormTextField }) => {
  const { register } = useFormContext()
  const { errors, touchedFields } = useFormState()

  return (
    <Wrapper>
      <TextInput
        label={formattedLabel(field)}
        field={register(field.id, {
          required: field.required ? field.validationMessage : false,
        })}
        form={{
          touched: {
            [field.id]: touchedFields[field.id] !== undefined,
          },
          errors: {
            [field.id]: errors[field.id] ? errors[field.id]?.message : null,
          },
        }}
      />
    </Wrapper>
  )
}

export default Index
