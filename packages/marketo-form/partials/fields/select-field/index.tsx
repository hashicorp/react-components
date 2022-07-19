import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import SelectInput from '@hashicorp/react-select-input'
import FieldWrapper from '../../field-wrapper'
import type { MarketoFormSelectField, SelectValue } from '../../../types'

function applyVisibilityRule(
  field: MarketoFormSelectField,
  values: Record<string, string>
): { label: string; values: SelectValue[] } | null {
  if (field.visibilityRules && field.visibilityRules.rules) {
    for (let i = 0; i < field.visibilityRules.rules.length; i++) {
      const visibilityRule = field.visibilityRules.rules[i]
      if (
        visibilityRule.operator === 'is' &&
        visibilityRule.values.includes(values[visibilityRule.subjectField])
      ) {
        return {
          label: visibilityRule.altLabel,
          values: visibilityRule.picklistFilterValues,
        }
      }
    }

    // Fields with a visibility rule type of "show" have rules that determine
    // when they are shown (which is handled above). If we reach this point,
    // this field should be hidden;
    if (field.visibilityRules.ruleType === 'show') {
      return null
    }
  }

  return {
    label: field.label ?? field.id,
    values: field.fieldMetaData.values ?? [],
  }
}

const SelectField = ({ field }: { field: MarketoFormSelectField }) => {
  const { register, watch, setValue } = useFormContext()
  const values = watch()
  const visibility = useMemo(() => {
    return applyVisibilityRule(field, values as Record<string, string>)
  }, [field, values])

  return visibility !== null ? (
    <FieldWrapper>
      <SelectInput
        {...register(field.id, { required: field.required })}
        label={`${visibility.label}${field.required ? ' *' : ''}`}
        options={visibility.values.map((plv) => {
          return { name: plv.value, label: plv.label }
        })}
        onValueChange={(name) => {
          setValue(field.id, name)
        }}
      />
    </FieldWrapper>
  ) : null
}

export default SelectField
