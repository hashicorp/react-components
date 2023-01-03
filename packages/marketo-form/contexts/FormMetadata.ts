import { createContext } from 'react'
import type { MarketoFormMetadata } from '../types'

export const FormMetadataContext = createContext<MarketoFormMetadata | null>(
  null
)
