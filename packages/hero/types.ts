import { InlineVideoProps } from '@hashicorp/react-inline-video/types'
import { IntroProps } from '@hashicorp/react-intro/types'

export type ContentProps = Pick<
  IntroProps,
  'appearance' | 'eyebrow' | 'heading' | 'description' | 'actions'
> &
  Pick<InlineVideoProps, 'url'>

export interface HeroProps extends ContentProps {
  backgroundColor: string
  smallImage: string
  mediumImage: string
  desktopImage: string
}
