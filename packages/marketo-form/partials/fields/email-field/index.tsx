import { useFormContext } from 'react-hook-form'
import TextInput from '@hashicorp/react-form-fields/text'
import FieldWrapper from '../../field-wrapper'
import { formattedLabel, useErrorMessage } from '../../../utils'
import type { MarketoFormEmailField } from '../../../types'

const EmailField = ({ field }: { field: MarketoFormEmailField }) => {
  const { register } = useFormContext()
  const error = useErrorMessage(field.id)

  return (
    <FieldWrapper fieldId={field.id}>
      <TextInput
        label={formattedLabel(field)}
        type="email"
        field={{
          ...register(field.id),
          type: 'email',
        }}
        placeholder={field.hintText}
        error={error}
        required={field.required}
      />
    </FieldWrapper>
  )
}

export default EmailField
