import { useField } from 'formik'
import Combobox, { ComboboxProps } from '../'

type ComboboxFieldProps = { name: string } & Omit<ComboboxProps, 'onSelect'>

export default function ComboboxField({ name, ...props }: ComboboxFieldProps) {
  const [, meta, helpers] = useField(name) // https://formik.org/docs/api/useField#reference

  function handleTouched() {
    if (meta.touched) return
    return helpers.setTouched(true, false)
  }
  return (
    <Combobox
      onInputChange={(e) => {
        handleTouched() // Set touched if the input value changes at all
        if (e.currentTarget?.value === '')
          return helpers.setValue(e.currentTarget.value, true)
      }}
      onSelect={(value) => {
        handleTouched() // Set touched if the selected value changes at all
        helpers.setValue(value, true)
      }}
      {...props}
    />
  )
}
