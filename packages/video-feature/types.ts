import type { AuthorBylineProps } from '@hashicorp/react-author-byline/types'
import type { IntroProps } from '@hashicorp/react-intro/types'
import type { InlineVideoProps } from '@hashicorp/react-inline-video/types'

export interface VideoFeatureProps {
  appearance?: 'light' | 'dark'
  contentPosition?: 'left' | 'right'
  heading: IntroProps['heading']
  description: IntroProps['description']
  author?: Pick<AuthorBylineProps, 'avatar' | 'name' | 'role'>
  video: Pick<InlineVideoProps, 'solution' | 'url' | 'description'>
}
