import { useFormContext } from 'react-hook-form'
import CheckboxInput from '@hashicorp/react-form-fields/checkbox'
import FieldWrapper from '../../field-wrapper'
import { formattedLabel, useErrorMessage } from '../../../utils'
import type { MarketoFormCheckboxField } from '../../../types'

const CheckboxField = ({ field }: { field: MarketoFormCheckboxField }) => {
  const { register, watch } = useFormContext()
  const error = useErrorMessage(field.id)
  const checked = watch(field.id, false)

  return (
    <FieldWrapper fieldId={field.id}>
      <CheckboxInput
        label={formattedLabel(field)}
        field={{
          ...register(field.id),
          checked,
        }}
        error={error}
      />
    </FieldWrapper>
  )
}

export default CheckboxField
