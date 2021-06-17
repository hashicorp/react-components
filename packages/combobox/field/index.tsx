import { useField } from 'formik'
import Combobox, { ComboboxProps } from '../'

type IComboboxFieldProps = Omit<ComboboxProps, 'onSelect'>

interface ComboboxFieldProps extends IComboboxFieldProps {
  name: string
}

export default function ComboboxField({ name, ...props }: ComboboxFieldProps) {
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
