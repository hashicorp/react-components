import TextField from '../fields/text-field'
import EmailField from '../fields/email-field'
import TelephoneField from '../fields/telephone-field'
import TextareaField from '../fields/textarea-field'
import SelectField from '../fields/select-field'
import CountryField from '../fields/country-field'
import CheckboxField from '../fields/checkbox-field'
import PrivacyPolicyField from '../fields/privacy-policy-field'
import HiddenField from '../fields/hidden-field'
import FormPageUrlField from '../fields/form-page-url-field'
import type { MarketoFormField, MarketoFormComponents } from '../../types'

const Field = ({
  field,
  components,
}: {
  field: MarketoFormField
  components?: MarketoFormComponents
}) => {
  switch (field.dataType) {
    case 'text':
      if (components && 'text' in components) {
        const Component = components.text!
        return <Component field={field} />
      }
      return <TextField field={field} />
    case 'textArea':
      if (components && 'textArea' in components) {
        const Component = components.textArea!
        return <Component field={field} />
      }
      return <TextareaField field={field} />
    case 'email':
      if (components && 'email' in components) {
        const Component = components.email!
        return <Component field={field} />
      }
      return <EmailField field={field} />
    case 'telephone':
      if (components && 'telephone' in components) {
        const Component = components.telephone!
        return <Component field={field} />
      }
      return <TelephoneField field={field} />
    case 'select':
      if (components && 'select' in components) {
        const Component = components.select!
        return <Component field={field} />
      }
      if (field.id === 'Country') {
        return <CountryField field={field} />
      }
      return <SelectField field={field} />
    case 'checkbox':
      if (components && 'checkbox' in components) {
        const Component = components.checkbox!
        return <Component field={field} />
      }
      if (field.id === 'Consent_Privacy_Policy__c') {
        return <PrivacyPolicyField field={field} />
      }
      return <CheckboxField field={field} />
    case 'hidden':
      if (components && 'hidden' in components) {
        const Component = components.hidden!
        return <Component field={field} />
      }
      if (field.id === 'form_page_url__c') {
        return <FormPageUrlField field={field} />
      }
      return <HiddenField field={field} />
    default:
      console.error(`Unknown form field type: ${(field as any).Datatype}`)
  }

  return null
}

export default Field
