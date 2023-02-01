/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import Field from '../field'
import type { MarketoFormField, MarketoFormComponents } from '../../types'

const FieldWithVisibilityRule = ({
  field,
  components,
}: {
  field: MarketoFormField
  components?: MarketoFormComponents
}) => {
  const { watch } = useFormContext()

  // Currently we only support the first defined rule.
  const value = watch(field.visibilityRules!.rules![0].subjectField)

  const show = useMemo(() => {
    const { operator, values } = field.visibilityRules!.rules![0]
    return (
      operator === 'is' &&
      (values.includes(value) ||
        (value === false && values.includes('no')) ||
        (value === true && values.includes('yes')))
    )
  }, [field, value])

  return show ? <Field field={field} components={components} /> : null
}

const VisibilityRule = ({
  field,
  components,
}: {
  field: MarketoFormField
  components?: MarketoFormComponents
}) => {
  if (field.visibilityRules && field.visibilityRules.ruleType === 'show') {
    return <FieldWithVisibilityRule field={field} components={components} />
  }

  return <Field field={field} components={components} />
}

export default VisibilityRule
