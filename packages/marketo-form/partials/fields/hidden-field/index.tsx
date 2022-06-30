import { useFormContext } from 'react-hook-form'
import type { MarketoFormHiddenField } from '../../../types'

const HiddenField = ({ field }: { field: MarketoFormHiddenField }) => {
  const { register } = useFormContext()
  return <input type="hidden" {...register(field.id)} />
}

export default HiddenField
