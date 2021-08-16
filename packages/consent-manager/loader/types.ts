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

export interface ConsentManagerConfig {
  version: number
  companyName: string
  privacyPolicyLink: string
  segmentWriteKey?: string
  utilServerRoot: string
  categories: ConsentManagerCategory[]
  forceShow: boolean
  segmentServices?: ConsentManagerService[]
  additionalServices?: ConsentManagerService[]
}
