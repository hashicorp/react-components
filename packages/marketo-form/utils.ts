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
