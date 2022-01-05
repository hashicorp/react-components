import { useField } from 'formik'
import Combobox, { ComboboxProps } from '../'

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
type ComboboxFieldProps = { name: string } & Omit<Optional<ComboboxProps, 'inputProps'>, 'onSelect'>

export default function ComboboxField({ name, ...props }: ComboboxFieldProps) {
  const [_, meta, helpers] = useField(name) // https://formik.org/docs/api/useField#reference

  function handleTouched() {
    if (meta.touched) return
    return helpers.setTouched(true, true) // Validation will occur after the input
  }

  return (
    <Combobox
      inputProps={{
        onChange: (e) => {
          handleTouched() // Set touched if the input value changes at all
          return helpers.setValue(e.currentTarget.value, true)
        },
        name,
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
