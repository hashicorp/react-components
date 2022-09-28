import type { CardProps } from '@hashicorp/react-card/types'
import type { ThemeVariant } from '@hashicorp/react-button/types'
export interface RelatedContentProps {
  appearance?: 'light' | 'dark'
  headline: string
  description: string
  cards: Array<CardProps>
  cta: {
    title: string
    url: string
    variant: ThemeVariant
  }
}
