/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { ScriptProps } from 'next/script'
export interface ConsentManagerService {
  async?: boolean
  strategy?: Pick<ScriptProps, 'strategy'>
  body?: string
  category: string
  description: string
  name: string
  url?: string
  dataAttrs?: { name: string; value: string }[]
  hide?: () => boolean
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
  version?: number
  onManagePreferences?: () => void
  onAcceptAll?: () => void
}

export interface ConsentManagerPreferences {
  loadAll?: boolean
  segment?: Record<string, boolean>
  custom?: Record<string, boolean>
}
