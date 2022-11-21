import { InlineVideoProps } from '@hashicorp/react-inline-video/types'
import { IntroProps } from '@hashicorp/react-intro/types'

export type HeroProps = Pick<
  IntroProps,
  'appearance' | 'eyebrow' | 'heading' | 'description' | 'actions'
> &
  Pick<InlineVideoProps, 'url'>
