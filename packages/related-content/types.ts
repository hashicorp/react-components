/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { CardProps } from '@hashicorp/react-card/types'
import type { StandaloneLinkProps } from '@hashicorp/react-standalone-link/types'
export interface RelatedContentProps {
  appearance?: 'light' | 'dark'
  headline: string
  description?: string
  cards: Array<RelatedContentCardProps>
  cta: RelatedContentCtaProps
}

interface RelatedContentCtaProps
  extends Omit<StandaloneLinkProps, 'children' | 'appearance'> {
  text: string
}

type RelatedContentCardProps = Omit<CardProps, 'appearance'>
