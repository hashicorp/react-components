/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import Field from '../field'
import type {
  MarketoFormField,
  MarketoFormComponents,
  VisibilityRule as VisibilityRuleType,
} from '../../types'

function ruleApplies(rule: VisibilityRuleType, value: any): boolean {
  switch (rule.operator) {
    case 'is':
      return (
        rule.values.includes(value) ||
        (value === false && rule.values.includes('no')) ||
        (value === true && rule.values.includes('yes'))
      )
    case 'isEmpty':
      return value === null || typeof value === 'undefined' || value === ''
    default:
      return false
  }
}

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

  const hasMatchingRule = useMemo(() => {
    return field.visibilityRules!.rules!.some((rule) =>
      ruleApplies(rule, value)
    )
  }, [field, value])

  if (
    hasMatchingRule &&
    (field.visibilityRules!.ruleType === 'show' ||
      field.visibilityRules!.ruleType === 'hide')
  ) {
    return field.visibilityRules!.ruleType === 'show' ? (
      <Field field={field} components={components} />
    ) : null
  }

  // If the ruleType is show, that means the field is hidden by default.
  return field.visibilityRules!.ruleType === 'show' ? null : (
    <Field field={field} components={components} />
  )
}

const VisibilityRule = ({
  field,
  components,
}: {
  field: MarketoFormField
  components?: MarketoFormComponents
}) => {
  if (
    field.visibilityRules &&
    (field.visibilityRules.ruleType === 'show' ||
      field.visibilityRules.ruleType === 'hide')
  ) {
    return <FieldWithVisibilityRule field={field} components={components} />
  }

  return <Field field={field} components={components} />
}

export default VisibilityRule
