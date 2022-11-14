import { useFormContext } from 'react-hook-form'
import CheckboxInput from '@hashicorp/react-form-fields/checkbox'
import FieldWrapper from '../../field-wrapper'
import type { MarketoFormCheckboxField } from '../../../types'
import { useErrorMessage } from '../../../utils'
import style from './style.module.css'

const PrivacyPolicyField = ({ field }: { field: MarketoFormCheckboxField }) => {
  const { register, watch } = useFormContext()
  const error = useErrorMessage(field.id)
  const checked = watch(field.id, false)

  return (
    <FieldWrapper size="lg" fieldId={field.id}>
      <CheckboxInput
        label={
          <>
            I agree to HashiCorp’s{' '}
            <a
              href="https://www.hashicorp.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            <span className={style.required}>*</span>
          </>
        }
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
