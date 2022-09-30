import type { CardProps } from '@hashicorp/react-card/types'
import type { StandaloneLinkProps } from '@hashicorp/react-standalone-link/types'
export interface RelatedContentProps {
  appearance?: 'light' | 'dark'
  headline: string
  description?: string
  cards: Array<RelatedContentCardProps>
  cta?: StandaloneLinkProps
}

type RelatedContentCardProps = Omit<CardProps, 'appearance'>
