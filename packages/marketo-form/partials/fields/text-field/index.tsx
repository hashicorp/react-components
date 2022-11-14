import { useFormContext } from 'react-hook-form'
import TextInput from '@hashicorp/react-form-fields/text'
import FieldWrapper from '../../field-wrapper'
import { formattedLabel, useErrorMessage } from '../../../utils'
import type { MarketoFormTextField } from '../../../types'

const Index = ({ field }: { field: MarketoFormTextField }) => {
  const { register } = useFormContext()
  const error = useErrorMessage(field.id)

  return (
    <FieldWrapper fieldId={field.id}>
      <TextInput
        label={formattedLabel(field)}
        type="text"
        field={register(field.id)}
        placeholder={field.hintText}
        error={error}
        required={field.required}
      />
    </FieldWrapper>
  )
}

export default Index
