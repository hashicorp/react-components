import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import type { MarketoFormHiddenField } from '../../../types'

const FormPageUrlField = ({ field }: { field: MarketoFormHiddenField }) => {
  const { register, setValue } = useFormContext()

  useEffect(() => {
    setValue(field.id, window.location.href)
  }, [])

  return <input type="hidden" {...register(field.id)} />
}

export default FormPageUrlField
