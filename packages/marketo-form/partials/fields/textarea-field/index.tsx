import { useFormContext } from 'react-hook-form'
import TextareaInput from '@hashicorp/react-form-fields/textarea'
import FieldWrapper from '../../field-wrapper'
import { formattedLabel, useErrorMessage } from '../../../utils'
import type { MarketoFormTextAreaField } from '../../../types'

const Index = ({ field }: { field: MarketoFormTextAreaField }) => {
  const { register } = useFormContext()
  const error = useErrorMessage(field.id)

  return (
    <FieldWrapper>
      <TextareaInput
        label={formattedLabel(field)}
        field={register(field.id)}
        placeholder={field.hintText}
        error={error}
        required={field.required}
      />
    </FieldWrapper>
  )
}

export default Index
