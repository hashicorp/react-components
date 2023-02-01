/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { createContext } from 'react'
import type { MarketoFormMetadata } from '../types'

export const FormMetadataContext = createContext<MarketoFormMetadata | null>(
  null
)
