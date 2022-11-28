import { EyebrowProps } from './eyebrow-with-pattern'
import { InlineVideoProps } from '@hashicorp/react-inline-video/types'
import { IntroProps } from '@hashicorp/react-intro/types'

export type ContentProps = Pick<
  IntroProps,
  'appearance' | 'eyebrow' | 'heading' | 'description' | 'actions'
> &
  Pick<InlineVideoProps, 'url'> &
  Pick<EyebrowProps, 'theme'>

export interface HeroProps extends ContentProps {
  backgroundColor?: string
  smallImage: string
  mediumImage: string
  desktopImage: string
}
