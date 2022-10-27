import type { AuthorBylineProps } from 'packages/author-byline/types'
import type { IntroProps } from '@hashicorp/react-intro/types'

export interface VideoFeatureProps {
  appearance?: 'light' | 'dark'
  contentSide?: 'left' | 'right'
  heading: IntroProps['heading']
  description: IntroProps['description']
  author: AuthorBylineProps
  // TODO Import video types from InlineVideo component once built
  video: {
    url: string
    description?: string
  }
}
