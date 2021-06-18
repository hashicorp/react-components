import { useField } from 'formik'
import Combobox, { ComboboxProps } from '../'

type ComboboxFieldProps = { name: string } & Omit<ComboboxProps, 'onSelect'>

export default function ComboboxField({ name, ...props }: ComboboxFieldProps) {
  if (!name) return null
  const [, , helpers] = useField(name)
  return (
    <Combobox
      onInputChange={(e) => {
        if (e.currentTarget?.value === '')
          return helpers.setValue(e.currentTarget.value, true)
      }}
      onSelect={(value) => helpers.setValue(value, true)}
      {...props}
    />
  )
}
