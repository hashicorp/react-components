export type MarketoFormDatatype =
  | 'text'
  | 'email'
  | 'phone'
  | 'select'
  | 'checkbox'
  | 'hidden'

export interface Autofill {
  value: string
  valueFrom: string
  parameterName: string
}

export interface MarketoBaseFormField {
  id: string
  dataType: MarketoFormDatatype
  label?: string
  required: boolean
  autoFill?: Autofill
  visibilityRules?: VisibilityRules
}

export interface VisibilityRules {
  ruleType: string
  rules?: VisibilityRule[]
}

export interface MarketoFormTextField extends MarketoBaseFormField {
  dataType: 'text'
  validationMessage: string
}

export interface MarketoFormEmailField extends MarketoBaseFormField {
  dataType: 'email'
  validationMessage: string
}

export interface VisibilityRule {
  subjectField: string
  operator: string
  values: string[]
  altLabel: string
  picklistFilterValues: SelectValue[]
}

export interface SelectValue {
  label: string
  value: string
  selected?: boolean
  isDefault?: boolean
}

export interface FieldMetaData {
  values?: SelectValue[]
}

export interface MarketoFormSelectField extends MarketoBaseFormField {
  dataType: 'select'
  defaultValue?: string
  validationMessage: string
  fieldMetaData: FieldMetaData
}

export interface MarketoFormCheckboxField extends MarketoBaseFormField {
  dataType: 'checkbox'
  validationMessage: string
}

export interface MarketoFormHiddenField extends MarketoBaseFormField {
  dataType: 'hidden'
}

export type MarketoFormField =
  | MarketoFormTextField
  | MarketoFormEmailField
  | MarketoFormSelectField
  | MarketoFormCheckboxField
  | MarketoFormHiddenField

export interface MarketoForm {
  result: MarketoFormField[]
}

export interface MarketoFormikComponents {
  text?: (props: { field: MarketoFormTextField }) => JSX.Element
  email?: (props: { field: MarketoFormEmailField }) => JSX.Element
  select?: (props: { field: MarketoFormSelectField }) => JSX.Element
  checkbox?: (props: { field: MarketoFormCheckboxField }) => JSX.Element
  hidden?: (props: { field: MarketoFormHiddenField }) => JSX.Element
}
