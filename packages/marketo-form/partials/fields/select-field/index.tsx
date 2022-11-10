import { useFormContext } from 'react-hook-form'
import SelectInput from '@hashicorp/react-form-fields/select'
import FieldWrapper from '../../field-wrapper'
import { formattedLabel, useErrorMessage } from '../../../utils'
import type { MarketoFormSelectField } from '../../../types'

const SelectField = ({ field }: { field: MarketoFormSelectField }) => {
  const { register } = useFormContext()
  const error = useErrorMessage(field.id)

  return (
    <FieldWrapper>
      <SelectInput
        field={{ ...register(field.id) }}
        label={formattedLabel(field)}
        options={
          field.fieldMetaData.values
            ? field.fieldMetaData.values.map((plv) => {
                return { value: plv.value, label: plv.label }
              })
            : []
        }
        error={error}
        required={field.required}
      />
    </FieldWrapper>
  )
}

export default SelectField
