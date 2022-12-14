import { isAnalyticsMethodAvailable } from '@hashicorp/platform-analytics'
import { MarketoFormField } from './types'
import { useFormState } from 'react-hook-form'

// Marketo stores field names in two versions, SOAP and REST. Some API
// endpoints return SOAP names, while others accept REST names. This object
// contains all fields from our Marketo instance that have a REST name that is
// different from the SOAP name.
const soapToRESTFieldNames: Record<string, string> = {
  Address: 'address',
  AnnualRevenue: 'annualRevenue',
  AnonymousIP: 'anonymousIP',
  BillingCity: 'billingCity',
  BillingCountry: 'billingCountry',
  BillingPostalCode: 'billingPostalCode',
  BillingState: 'billingState',
  BillingStreet: 'billingStreet',
  City: 'city',
  Company: 'company',
  Country: 'country',
  DoNotCall: 'doNotCall',
  DoNotCallReason: 'doNotCallReason',
  Email: 'email',
  EmailInvalid: 'emailInvalid',
  EmailInvalidCause: 'emailInvalidCause',
  Fax: 'fax',
  FirstName: 'firstName',
  Industry: 'industry',
  InferredCompany: 'inferredCompany',
  InferredCountry: 'inferredCountry',
  LastName: 'lastName',
  LeadRole: 'leadRole',
  LeadScore: 'leadScore',
  LeadSource: 'leadSource',
  LeadStatus: 'leadStatus',
  MainPhone: 'mainPhone',
  MarketoSocialFacebookDisplayName: 'facebookDisplayName',
  MarketoSocialFacebookId: 'facebookId',
  MarketoSocialFacebookPhotoURL: 'facebookPhotoURL',
  MarketoSocialFacebookProfileURL: 'facebookProfileURL',
  MarketoSocialFacebookReach: 'facebookReach',
  MarketoSocialFacebookReferredEnrollments: 'facebookReferredEnrollments',
  MarketoSocialFacebookReferredVisits: 'facebookReferredVisits',
  MarketoSocialGender: 'gender',
  MarketoSocialLastReferredEnrollment: 'lastReferredEnrollment',
  MarketoSocialLastReferredVisit: 'lastReferredVisit',
  MarketoSocialLinkedInDisplayName: 'linkedInDisplayName',
  MarketoSocialLinkedInId: 'linkedInId',
  MarketoSocialLinkedInPhotoURL: 'linkedInPhotoURL',
  MarketoSocialLinkedInProfileURL: 'linkedInProfileURL',
  MarketoSocialLinkedInReach: 'linkedInReach',
  MarketoSocialLinkedInReferredEnrollments: 'linkedInReferredEnrollments',
  MarketoSocialLinkedInReferredVisits: 'linkedInReferredVisits',
  MarketoSocialSyndicationId: 'syndicationId',
  MarketoSocialTotalReferredEnrollments: 'totalReferredEnrollments',
  MarketoSocialTotalReferredVisits: 'totalReferredVisits',
  MarketoSocialTwitterDisplayName: 'twitterDisplayName',
  MarketoSocialTwitterId: 'twitterId',
  MarketoSocialTwitterPhotoURL: 'twitterPhotoURL',
  MarketoSocialTwitterProfileURL: 'twitterProfileURL',
  MarketoSocialTwitterReach: 'twitterReach',
  MarketoSocialTwitterReferredEnrollments: 'twitterReferredEnrollments',
  MarketoSocialTwitterReferredVisits: 'twitterReferredVisits',
  MiddleName: 'middleName',
  MktoPersonNotes: 'mktoPersonNotes',
  MobilePhone: 'mobilePhone',
  NumberOfEmployees: 'numberOfEmployees',
  Phone: 'phone',
  PostalCode: 'postalCode',
  Rating: 'rating',
  Salutation: 'salutation',
  SICCode: 'sicCode',
  State: 'state',
  Title: 'title',
  Unsubscribed: 'unsubscribed',
  UnsubscribedReason: 'unsubscribedReason',
  Website: 'website',
}

// Given an object with SOAP named keys, returns an object with SOAP
// names replaced with their REST variants.
export function convertToRESTFields(
  data: Record<string, unknown>
): Record<string, unknown> {
  const restData: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(data)) {
    if (key in soapToRESTFieldNames) {
      restData[soapToRESTFieldNames[key]] = value
    } else {
      restData[key] = value
    }
  }
  return restData
}

// Returns the label for a field.
export function formattedLabel(field: MarketoFormField): string {
  if (field.label) {
    return field.label
  }

  return field.id
}

// Returns a Record<string, MarketoFormField[]> that groups fields that should
// be rendered by a single component.
//
// This function allows consumers to define multiple fields that should be
// rendered by a single component. The configuration is in the following form:
// const config = {
//   groupName: {
//     fields: ["FieldNameOne", "FieldNameTwo"],
//     component: RenderComponent
//   }
// }
// In this instance, MarketoForm will call RenderComponent with a `fields` prop
// containing the MarketoFormField object for FieldNameOne and FieldNameTwo.
export function groupFields(
  fields: MarketoFormField[],
  groups: Record<
    string,
    {
      fields: string[]
      component: (props: { fields: MarketoFormField[] }) => JSX.Element
    }
  >
): Record<string, MarketoFormField[]> {
  // Final value that will be returned. Keys are group names and values are
  // an array of MarketoFormField objects.
  const grouped: Record<string, MarketoFormField[]> = {}

  fields.forEach((field) => {
    // Check if groups contains a group targeting this field
    const customGroup = Object.entries(groups).filter(([_, config]) => {
      return config.fields.includes(field.id)
    })
    if (customGroup.length > 0) {
      const customGroupName = customGroup[0][0]
      if (customGroupName in grouped) {
        grouped[customGroupName].push(field)
      } else {
        grouped[customGroupName] = [field]
      }
    } else {
      grouped[field.id] = [field]
    }
  })

  return grouped
}

// Returns an object representing the default state of the form as defined by
// the Marketo form's configuration.
export function calculateDefaultValues(
  fields: MarketoFormField[],
  values?: Record<string, any>
): Record<string, string | boolean> {
  const initialValues: Record<string, string | boolean> = {}
  fields.forEach((field) => {
    if (field.defaultValue && field.defaultValue !== '') {
      if (field.dataType === 'select') {
        // For some reason, the Marketo API returns the value for <select> fields
        // as a JSON encoded string.
        initialValues[field.id] = JSON.parse(field.defaultValue)[0]
      } else {
        initialValues[field.id] = field.defaultValue
      }
    } else if (field.dataType === 'checkbox') {
      initialValues[field.id] = field.fieldMetaData.initiallyChecked
    } else {
      initialValues[field.id] = ''
    }
  })
  return { ...initialValues, ...values }
}

export function useErrorMessage(id: string): string | undefined {
  const { errors, touchedFields } = useFormState()

  if (!touchedFields[id] || !errors[id]) {
    return
  }

  return errors[id]?.message as string
}

export function segmentIdentify(leadFormFields: Record<string, unknown>) {
  // This function is wrapped in a try/catch to prevent Segment errors from
  // interrupting the form submission workflow.
  try {
    if (isAnalyticsMethodAvailable('identify')) {
      const traits: Record<string, unknown> = {}

      // Segment traits mostly map 1:1 to Marketo REST field names. However,
      // since that's not always the case, we check and set each
      // field individually.
      // Reference: https://segment.com/docs/connections/spec/identify/
      if ('email' in leadFormFields) {
        traits['email'] = leadFormFields['email']
      }

      if ('firstName' in leadFormFields) {
        traits['firstName'] = leadFormFields['firstName']
      }

      if ('lastName' in leadFormFields) {
        traits['lastName'] = leadFormFields['lastName']
      }

      if ('phone' in leadFormFields) {
        traits['phone'] = leadFormFields['phone']
      }

      if ('title' in leadFormFields) {
        traits['title'] = leadFormFields['title']
      }

      if ('company' in leadFormFields) {
        traits['company'] = { name: leadFormFields['company'] }
      }

      if ('country' in leadFormFields) {
        traits['address'] = { country: leadFormFields['country'] }
      }

      if (Object.keys(traits).length > 0) {
        window.analytics.identify(traits)
      }
    }
  } catch (err) {
    console.error(err)
  }
}
