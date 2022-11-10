import { useFormContext } from 'react-hook-form'
import CheckboxInput from '@hashicorp/react-form-fields/checkbox'
import FieldWrapper from '../../field-wrapper'
import type { MarketoFormCheckboxField } from '../../../types'
import { useErrorMessage } from '../../../utils'

const PrivacyPolicyField = ({ field }: { field: MarketoFormCheckboxField }) => {
  const { register, watch } = useFormContext()
  const error = useErrorMessage(field.id)
  const checked = watch(field.id, false)

  return (
    <FieldWrapper size="lg">
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
        error={error}
      />
    </FieldWrapper>
  )
}

export default PrivacyPolicyField
