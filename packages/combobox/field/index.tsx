import { useField } from 'formik'
import Combobox, { ComboboxProps } from '../'

type ComboboxFieldProps = { name: string } & Omit<ComboboxProps, 'onSelect'>

export default function ComboboxField({ name, ...props }: ComboboxFieldProps) {
  const [_, meta, helpers] = useField(name) // https://formik.org/docs/api/useField#reference

  function handleTouched() {
    if (meta.touched) return
    return helpers.setTouched(true, true) // Validation will occur after the input
  }

  return (
    <Combobox
      onInputChange={(e) => {
        handleTouched() // Set touched if the input value changes at all
        return helpers.setValue(e.currentTarget.value, true)
      }}
      onSelect={(value) => {
        handleTouched() // Set touched if the selected value changes at all
        return helpers.setValue(value, true)
      }}
      invalidInputValue={meta.error ? true : false}
      {...props}
    />
  )
}
