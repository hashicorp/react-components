/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export interface InlineVideoProps {
  appearance?: 'light' | 'dark'
  url: string
  description?: string
  solution?: 'infrastructure' | 'security' | 'networking' | 'applications'
  gradientPosition?: 'left' | 'right' | false
  videoClassName?: string
}
