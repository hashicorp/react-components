import { useField } from 'formik'
import Combobox, { ComboboxProps } from '../'

type ComboboxFieldProps = { name: string } & Omit<ComboboxProps, 'onSelect'>

export default function ComboboxField({ name, ...props }: ComboboxFieldProps) {
  const [, meta, helpers] = useField(name)

  function handleTouched() {
    if (meta.touched) return
    return helpers.setTouched(true, false) // Set touched if the input value changes at all, allow consumers to handle validation
  }
  return (
    <Combobox
      onInputChange={(e) => {
        handleTouched()
        if (e.currentTarget?.value === '')
          return helpers.setValue(e.currentTarget.value, true)
      }}
      onSelect={(value) => {
        handleTouched()
        helpers.setValue(value, true)
      }}
      {...props}
    />
  )
}
