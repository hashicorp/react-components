import { useFormContext } from 'react-hook-form'
import SelectInput from '@hashicorp/react-select-input'
import FieldWrapper from '../../field-wrapper'
import { formattedLabel } from '../../../utils'
import type { MarketoFormSelectField } from '../../../types'

const SelectField = ({ field }: { field: MarketoFormSelectField }) => {
  const { register, setValue } = useFormContext()

  return (
    <FieldWrapper fieldId={field.id}>
      <SelectInput
        {...register(field.id)}
        label={formattedLabel(field)}
        options={
          field.fieldMetaData.values
            ? field.fieldMetaData.values.map((plv) => {
                return { name: plv.value, label: plv.label }
              })
            : []
        }
        onValueChange={(name) => {
          setValue(field.id, name)
        }}
      />
    </FieldWrapper>
  )
}

export default SelectField
