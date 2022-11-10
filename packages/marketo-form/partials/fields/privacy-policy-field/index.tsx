import { useFormContext, useFormState } from 'react-hook-form'
import CheckboxInput from '@hashicorp/react-checkbox-input'
import FieldWrapper from '../../field-wrapper'
import type { MarketoFormCheckboxField } from '../../../types'

const PrivacyPolicyField = ({ field }: { field: MarketoFormCheckboxField }) => {
  const { register, watch } = useFormContext()
  const { errors, touchedFields } = useFormState()
  const checked = watch(field.id, false)

  return (
    <FieldWrapper size="lg" fieldId={field.id}>
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
          ...register(field.id),
          checked,
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

export default PrivacyPolicyField
