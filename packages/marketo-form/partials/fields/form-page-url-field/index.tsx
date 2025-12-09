/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import type { MarketoFormHiddenField } from '../../../types'

const FormPageUrlField = ({ field }: { field: MarketoFormHiddenField }) => {
  const { register, setValue } = useFormContext()

  useEffect(() => {
    const { protocol, host, pathname } = window.location
    setValue(field.id, `${protocol}//${host}${pathname}`)
  }, [])

  return <input type="hidden" {...register(field.id)} />
}

export default FormPageUrlField
