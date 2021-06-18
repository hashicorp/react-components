import { useField } from 'formik'
import Combobox, { ComboboxProps } from '../'

type ComboboxFieldProps = { name: string } & Omit<ComboboxProps, 'onSelect'>

export default function ComboboxField({ name, ...props }: ComboboxFieldProps) {
  const [, meta, helpers] = useField(name)
  return (
    <Combobox
      onInputChange={(e) => {
        if (!meta.touched) {
          helpers.setTouched(true, false) // Set touched if the input value changes at all, allow consumers to handle validation
        }
        if (e.currentTarget?.value === '')
          return helpers.setValue(e.currentTarget.value, true)
      }}
      onSelect={(value) => helpers.setValue(value, true)}
      {...props}
    />
  )
}
