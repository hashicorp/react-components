import TextField from '../fields/text-field'
import EmailField from '../fields/email-field'
import SelectField from '../fields/select-field'
import CountryField from '../fields/country-field'
import CheckboxField from '../fields/checkbox-field'
import PrivacyPolicyField from '../fields/privacy-policy-field'
import HiddenField from '../fields/hidden-field'
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
    case 'email':
      if (components && 'email' in components) {
        const Component = components.email!
        return <Component field={field} />
      }
      return <EmailField field={field} />
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
      return <HiddenField field={field} />
    default:
      console.error(`Unknown form field type: ${(field as any).Datatype}`)
  }

  return null
}

export default Field
