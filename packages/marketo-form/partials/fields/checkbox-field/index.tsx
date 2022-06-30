import { useFormContext, useFormState } from 'react-hook-form'
import CheckboxInput from '@hashicorp/react-checkbox-input'
import Wrapper from '../../wrapper'
import { formattedLabel } from '../../../utils'
import type { MarketoFormCheckboxField } from '../../../types'

const CheckboxField = ({ field }: { field: MarketoFormCheckboxField }) => {
  const { register } = useFormContext()
  const { errors, touchedFields } = useFormState()

  if (field.id === 'Consent_Privacy_Policy__c') {
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
          field={register(field.id, {
            required: field.required ? field.validationMessage : false,
          })}
          form={{
            touched: {
              [field.id]: touchedFields[field.id] !== undefined,
            },
            errors: {
              [field.id]: errors[field.id] ? errors[field.id].message : null,
            },
          }}
        />
      </Wrapper>
    )
  }

  return (
    <Wrapper size="lg">
      <CheckboxInput
        label={formattedLabel(field)}
        field={register(field.id, { required: field.required })}
        form={{
          touched: {
            [field.id]: touchedFields[field.id] !== undefined,
          },
          errors: {
            [field.id]: errors[field.id] ?? '',
          },
        }}
      />
    </Wrapper>
  )
}

export default CheckboxField
