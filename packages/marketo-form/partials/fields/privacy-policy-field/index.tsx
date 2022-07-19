import { useFormContext, useFormState } from 'react-hook-form'
import CheckboxInput from '@hashicorp/react-checkbox-input'
import Wrapper from '../../wrapper'
import type { MarketoFormCheckboxField } from '../../../types'

const PrivacyPolicyField = ({ field }: { field: MarketoFormCheckboxField }) => {
  const { register, watch } = useFormContext()
  const { errors, touchedFields } = useFormState()
  const value = watch(field.id, false)

  return (
    <Wrapper size="lg">
      <CheckboxInput
        label={`I agree to HashiCorp’s
                   <a
                     href="https://www.hashicorp.com/privacy"
                     target="_blank"
                     rel="noopener noreferrer"
                   >
                     Privacy Policy
                   </a>`}
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
            [field.id]: errors[field.id] ? errors[field.id]?.message : null,
          },
        }}
      />
    </Wrapper>
  )
}

export default PrivacyPolicyField
