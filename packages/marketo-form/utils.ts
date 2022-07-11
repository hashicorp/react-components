import { MarketoFormField } from './types'

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

export function convertToRESTFields(
  data: Record<string, unknown>
): Record<string, unknown> {
  const restData: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(data)) {
    if (k in soapToRESTFieldNames) {
      restData[soapToRESTFieldNames[k]] = v
    } else {
      restData[k] = v
    }
  }
  return restData
}

export function formattedLabel(field: MarketoFormField): string {
  if (field.required && field.label) {
    return `${field.label} *`
  } else if (field.label) {
    return field.label
  }

  return field.id
}

export function groupFields(
  groups: Record<
    string,
    {
      fields: string[]
      component: (props: { fields: MarketoFormField[] }) => JSX.Element
    }
  >,
  fields: MarketoFormField[]
): Record<string, MarketoFormField[]> {
  const grouped: Record<string, MarketoFormField[]> = {}
  fields.forEach((field) => {
    if (groups) {
      const customGroup = Object.entries(groups).filter((group) => {
        return group[1].fields.includes(field.id)
      })
      if (customGroup.length > 0) {
        const customGroupName = customGroup[0][0]
        if (customGroupName) {
          if (!grouped[customGroupName]) {
            grouped[customGroupName] = [field]
          } else {
            grouped[customGroupName].push(field)
          }
        }
      } else {
        grouped[field.id] = [field]
      }
    } else {
      grouped[field.id] = [field]
    }
  })
  return grouped
}

export function calculateDefaultValues(
  fields: MarketoFormField[]
): Record<string, string> {
  const initialValues: Record<string, string> = {}
  fields.forEach((field) => {
    if (field.dataType === 'select' && field.defaultValue) {
      initialValues[field.id] = JSON.parse(field.defaultValue)[0]
    } else {
      initialValues[field.id] = ''
    }
  })
  return initialValues
}
