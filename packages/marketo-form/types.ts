import type { NextApiRequest } from 'next'

export type MarketoFormDatatype =
  | 'text'
  | 'email'
  | 'telephone'
  | 'textArea'
  | 'select'
  | 'checkbox'
  | 'hidden'

export interface Autofill {
  value: string
  valueFrom: string
  parameterName: string
}

export interface VisibilityRule {
  subjectField: string
  operator: 'is'
  values: string[]
  altLabel: string
}

export interface VisibilityRules {
  rules?: VisibilityRule[]
  ruleType: 'alwaysShow' | 'show'
}

export interface MarketoBaseFormField {
  id: string
  dataType: MarketoFormDatatype
  defaultValue?: string
  label?: string
  required: boolean
  validationMessage?: string
  autoFill?: Autofill
  visibilityRules?: VisibilityRules
}

export interface MarketoFormTextField extends MarketoBaseFormField {
  dataType: 'text'
  hintText?: string
}

export interface MarketoFormEmailField extends MarketoBaseFormField {
  dataType: 'email'
  hintText?: string
}

export interface MarketoFormTelephoneField extends MarketoBaseFormField {
  dataType: 'telephone'
  hintText?: string
}

export interface MarketoFormTextAreaField extends MarketoBaseFormField {
  dataType: 'textArea'
  hintText?: string
}

export interface SelectValue {
  label: string
  value: string
  selected?: boolean
  isDefault?: boolean
}

export interface SelectFieldMetaData {
  values?: SelectValue[]
}

export interface MarketoFormSelectField extends MarketoBaseFormField {
  dataType: 'select'
  fieldMetaData: SelectFieldMetaData
}

export interface CheckboxFieldMetaData {
  initiallyChecked: boolean
}

export interface MarketoFormCheckboxField extends MarketoBaseFormField {
  dataType: 'checkbox'
  fieldMetaData: CheckboxFieldMetaData
}

export interface MarketoFormHiddenField extends MarketoBaseFormField {
  dataType: 'hidden'
}

export type MarketoFormField =
  | MarketoFormTextField
  | MarketoFormEmailField
  | MarketoFormTelephoneField
  | MarketoFormTextAreaField
  | MarketoFormSelectField
  | MarketoFormCheckboxField
  | MarketoFormHiddenField

/**
 * The Marketo API response containing form fields.
 */
export interface MarketoForm {
  success: boolean
  errors: { code: string; message: string }[]
  result: MarketoFormField[]
}

/**
 * Custom components to be used in lieu of the default built-in components.
 */
export interface MarketoFormComponents {
  text?: (props: { field: MarketoFormTextField }) => JSX.Element
  email?: (props: { field: MarketoFormEmailField }) => JSX.Element
  telephone?: (props: { field: MarketoFormTelephoneField }) => JSX.Element
  textArea?: (props: { field: MarketoFormTextAreaField }) => JSX.Element
  select?: (props: { field: MarketoFormSelectField }) => JSX.Element
  checkbox?: (props: { field: MarketoFormCheckboxField }) => JSX.Element
  hidden?: (props: { field: MarketoFormHiddenField }) => JSX.Element
}

/**
 * Configuration on which fields to render with a single component. Can be used
 * to render multiple default components on one row (such as First Name and
 * Last Name) or to render a particular set of fields with a single component.
 */
export type MarketoFormGroups = Record<
  string,
  {
    fields: string[]
    component: (props: { fields: MarketoFormField[] }) => JSX.Element
  }
>

export type SubmissionFilter = (req: NextApiRequest) => Promise<boolean>

export interface MarketoSubmissionResponse {
  success: boolean
  result: { status: 'created' | 'updated' | 'skipped' }[]
}
