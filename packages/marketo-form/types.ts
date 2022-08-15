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

export interface MarketoBaseFormField {
  id: string
  dataType: MarketoFormDatatype
  defaultValue?: string
  label?: string
  required: boolean
  validationMessage?: string
  autoFill?: Autofill
}

export interface MarketoFormTextField extends MarketoBaseFormField {
  dataType: 'text'
}

export interface MarketoFormEmailField extends MarketoBaseFormField {
  dataType: 'email'
}

export interface MarketoFormTelephoneField extends MarketoBaseFormField {
  dataType: 'telephone'
}

export interface MarketoFormTextAreaField extends MarketoBaseFormField {
  dataType: 'textArea'
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
  fieldMetaData: FieldMetaData
}

export interface MarketoFormCheckboxField extends MarketoBaseFormField {
  dataType: 'checkbox'
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
