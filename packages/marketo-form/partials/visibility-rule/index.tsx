import { useFormContext, useFormState } from 'react-hook-form'
import type { MarketoFormField } from '../../types'
import Field from '../field'
import { useMemo } from 'react'
import { MarketoFormComponents } from '../../types'

const AlwaysShownField = ({
  field,
  components,
}: {
  field: MarketoFormField
  components?: MarketoFormComponents
}) => {
  return <Field field={field} components={components} />
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
  const value = watch(field.visibilityRules.rules![0].subjectField)
  console.log({ __value: value })

  const show = useMemo(() => {
    const { operator, values } = field.visibilityRules.rules![0]
    console.log({ operator, values, value })
    const result =
      operator === 'is' &&
      (values.includes(value) ||
        (value === false && values.includes('no')) ||
        (value === true && values.includes('yes')))
    console.log({ result })
    return result
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
  if (field.visibilityRules.ruleType === 'alwaysShow') {
    return <AlwaysShownField field={field} components={components} />
  }

  return <FieldWithVisibilityRule field={field} components={components} />
}

export default VisibilityRule
