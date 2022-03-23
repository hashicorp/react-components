import React from 'react'
import ConsentManagerComponent, { open } from '../'
import defaultCategories from './categories'
import ossPreset from './presets/oss'
import enterprisePreset from './presets/enterprise'
import {
  ConsentManagerCategory,
  ConsentManagerProps,
  ConsentManagerService,
} from '../types'

const VERSION = 4
const COMPANY_NAME = 'HashiCorp'
const PRIVACY_LINK = 'https://www.hashicorp.com/privacy'

export default function createConsentManager({
  segmentWriteKey = process.env.SEGMENT_WRITE_KEY,
  preset,
  segmentServices,
  otherServices,
  categories,
  forceShow = false,
  onAcceptAll,
  onManagePreferences,
}: {
  segmentWriteKey?: string
  preset?: 'oss' | 'enterprise'
  segmentServices?: ConsentManagerService[]
  otherServices?: ConsentManagerService[]
  categories?: ConsentManagerCategory[]
  forceShow?: boolean
  onAcceptAll?: () => void
  onManagePreferences?: () => void
}): {
  ConsentManager: typeof ConsentManagerComponent
  openConsentManager: () => void
} {
  // if hashi env is present, check against it. if not, fall back to checking node env
  const isProd = process.env.HASHI_ENV
    ? process.env.HASHI_ENV === 'production'
    : process.env.NODE_ENV === 'production'

  if (!process.env.HASHI_ENV)
    console.warn(
      'Consent manager expects the "HASHI_ENV" environment variable to be set in order to ensure proper analytics tracking. Please make sure "HASHI_ENV" is set appropriately within your app.'
    )

  // set the correct segment key based on environment
  const segmentKey = isProd
    ? segmentWriteKey
    : '0EXTgkNx0Ydje2PGXVbRhpKKoe5wtzcE'

  // same for the utility server
  let utilityServerRoot = isProd
    ? 'https://util.hashicorp.com'
    : 'https://hashicorp-web-util-staging.herokuapp.com'

  // allow per-project utility server override. useful for local development
  if (process.env.UTIL_SERVER) {
    utilityServerRoot = process.env.UTIL_SERVER.replace(/\/$/, '')
  }

  // next we build the config objct, kicking it off with the default values
  let config: ConsentManagerProps = {
    version: VERSION,
    companyName: COMPANY_NAME,
    privacyPolicyLink: PRIVACY_LINK,
    segmentWriteKey: segmentKey,
    utilServerRoot: utilityServerRoot,
    categories: defaultCategories,
    forceShow,
    onAcceptAll,
    onManagePreferences,
  }

  // add preset values if present
  if (preset === 'oss') config = { ...config, ...ossPreset }
  if (preset === 'enterprise') config = { ...config, ...enterprisePreset }

  // add any other custom values nondestructively if present
  if (segmentServices) {
    if (!config.segmentServices) config.segmentServices = []
    config.segmentServices.push(...segmentServices)
  }
  if (otherServices) {
    if (!config.additionalServices) config.additionalServices = []
    config.additionalServices.push(...otherServices)
  }
  if (categories) config.categories!.push(...categories)

  // finally, we return a HOC that will render the fully configured consent manager
  return {
    ConsentManager: function ConsentManagerWrapper() {
      return <ConsentManagerComponent {...config} />
    },
    openConsentManager: open,
  }
}
