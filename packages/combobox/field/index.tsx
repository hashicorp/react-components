import { useField } from 'formik'
import Combobox, { ComboboxProps } from '../'

type ComboboxFieldProps = { name: string; setValueOnChange?: boolean } & Omit<
  ComboboxProps,
  'onSelect'
>

export default function ComboboxField({
  name,
  setValueOnChange = false, // Allows consumers to override the default behavior and validate arbitrary user input (i.e. not just from onSelect)
  ...props
}: ComboboxFieldProps) {
  const [field, meta, helpers] = useField(name) // https://formik.org/docs/api/useField#reference

  function handleTouched() {
    if (meta.touched) return
    return helpers.setTouched(true, !setValueOnChange) // Validation will occur after the input
  }

  return (
    <Combobox
      onInputChange={(e) => {
        handleTouched() // Set touched if the input value changes at all
        if (e.currentTarget?.value === '' || !!setValueOnChange)
          return helpers.setValue(e.currentTarget.value, true)
      }}
      onSelect={(value) => {
        handleTouched() // Set touched if the selected value changes at all
        helpers.setValue(value, true)
      }}
      invalidInputValue={meta.error ? true : false}
      {...props}
    />
  )
}
