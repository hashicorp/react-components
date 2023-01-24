import type { CardProps } from '@hashicorp/react-card/types'
import type { StandaloneLinkProps } from '@hashicorp/react-standalone-link/types'

export const headings = ['h2', 'h3', 'h4', 'h5'] as const
export interface RelatedContentProps {
  appearance?: 'light' | 'dark'
  headline: string
  headlineAs: typeof headings[number]
  description?: string
  cards: Array<RelatedContentCardProps>
  cta: RelatedContentCtaProps
}

interface RelatedContentCtaProps
  extends Omit<StandaloneLinkProps, 'children' | 'appearance'> {
  text: string
}

type RelatedContentCardProps = Omit<CardProps, 'appearance'>
