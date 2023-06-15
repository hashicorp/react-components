/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { NextApiRequest } from 'next'

export type MarketoFormDatatype =
  | 'text'
  | 'email'
  | 'telephone'
  | 'textArea'
  | 'select'
  | 'checkbox'
  | 'hidden'
  | 'htmltext'

export interface Autofill {
  value: string
  valueFrom: string
  parameterName: string
}

export interface VisibilityRule {
  subjectField: string
  operator: 'is' | 'isNot' | 'isEmpty'
  values: string[]
  altLabel: string
}

export interface VisibilityRules {
  rules?: VisibilityRule[]
  ruleType: 'alwaysShow' | 'show' | 'hide'
}

export interface MarketoBaseFormField {
  id: string
  dataType: MarketoFormDatatype
  rowNumber: number
  columnNumber: number
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
  formPrefill: boolean
}

export interface MarketoFormTelephoneField extends MarketoBaseFormField {
  dataType: 'telephone'
  hintText?: string
  formPrefill: boolean
}

export interface MarketoFormTextAreaField extends MarketoBaseFormField {
  dataType: 'textArea'
  hintText?: string
  formPrefill: boolean
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
  formPrefill: boolean
}

export interface CheckboxFieldMetaData {
  initiallyChecked: boolean
}

export interface MarketoFormCheckboxField extends MarketoBaseFormField {
  dataType: 'checkbox'
  fieldMetaData: CheckboxFieldMetaData
  formPrefill: boolean
}

export interface MarketoFormHiddenField extends MarketoBaseFormField {
  dataType: 'hidden'
}

export interface MarketoFormHtmltextField {
  id: string
  labelWidth: number
  dataType: 'htmltext'
  rowNumber: number
  columnNumber: number
  visibilityRules?: VisibilityRules
  text: string
}

export type MarketoFormField =
  | MarketoFormTextField
  | MarketoFormEmailField
  | MarketoFormTelephoneField
  | MarketoFormTextAreaField
  | MarketoFormSelectField
  | MarketoFormCheckboxField
  | MarketoFormHiddenField
  | MarketoFormHtmltextField

export interface MarketoFormMetadata {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
  url: string
  status: string
  theme: string
  language: string
  locale: string
  progressiveProfiling: boolean
  labelPosition: string
  fontFamily: string
  fontSize: string
  folder?: {
    type: string
    value: number
    folderName: string
  }
  knownVisitor?: {
    type: string
    template: unknown
  }
  thankYouList?: {
    followupType: string
    followupValue: string
    default: boolean
  }[]
  buttonLocation: number
  buttonLabel: string
  waitingLabel: string
  workSpaceId: number
}

/**
 * The Marketo API response containing form fields.
 */
export interface MarketoFormResponse<T> {
  success: boolean
  errors: { code: string; message: string }[]
  result: T[]
}

export type MarketoFormFieldsResponse = MarketoFormResponse<MarketoFormField>
export type MarketoFormMetadataResponse =
  MarketoFormResponse<MarketoFormMetadata>
export interface MarketoFormAPIResponse {
  fields: MarketoFormFieldsResponse
  metadata: MarketoFormMetadataResponse
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
  htmltext?: (props: { field: MarketoFormHtmltextField }) => JSX.Element
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
