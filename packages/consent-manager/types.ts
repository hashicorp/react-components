export interface ConsentManagerService {
  async?: boolean
  body?: string
  category: string
  description: string
  name: string
  url?: string
}

export interface ConsentManagerPreset {
  additionalServices: ConsentManagerService[]
  segmentServices: ConsentManagerService[]
}

export interface ConsentManagerCategory {
  description: string
  name: string
}

export interface ConsentManagerProps {
  additionalServices?: ConsentManagerService[]
  categories?: ConsentManagerCategory[]
  className?: string
  companyName?: string
  cookiePolicyLink?: string
  forceShow?: boolean
  privacyPolicyLink?: string
  segmentServices?: ConsentManagerService[]
  segmentWriteKey?: string
  showDialog?: boolean
  utilServerRoot?: string
  version?: number
}
