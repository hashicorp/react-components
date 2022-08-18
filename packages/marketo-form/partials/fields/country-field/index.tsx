import Combobox from '@hashicorp/react-combobox'
import { useFormContext, useFormState } from 'react-hook-form'
import Label from '../../label'
import { formattedLabel } from '../../../utils'
import ErrorMessage from '../../error-message'
import type { MarketoFormSelectField } from '../../../types'

interface CountryFieldProps {
  field: MarketoFormSelectField
}

export default function CountryField({ field }: CountryFieldProps) {
  const { register, setValue } = useFormContext()
  const { errors, touchedFields } = useFormState()

  const error = errors[field.id]
  const touched = touchedFields[field.id]

  const showError = !!touched && !!error

  function handleSelect(value: unknown) {
    return setValue(field.id, value)
  }

  const { onBlur, name, ref } = register(field.id)

  function onChangeHandler(e: any) {
    const val = e.currentTarget.value
    setValue(field.id, val)
  }

  return (
    <>
      <Label fieldName={field.id} label={formattedLabel(field)} />
      <Combobox
        invalidInputValue={showError}
        onSelect={handleSelect}
        label="Country"
        inputProps={
          {
            name,
            onChange: onChangeHandler,
            onBlur,
            ref,
            placeholder: 'Select your country',
          } as any
        }
        options={
          field.fieldMetaData.values
            ? field.fieldMetaData.values.map((plv) => plv.value)
            : []
        }
      />
      {showError && (
        <ErrorMessage
          error={field.validationMessage ?? 'Please select your country.'}
        />
      )}
    </>
  )
}
