import { EyebrowProps } from './eyebrow-with-pattern'
import { InlineVideoProps } from '@hashicorp/react-inline-video/types'
import { IntroProps } from '@hashicorp/react-intro/types'

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type ContentProps = Pick<
  IntroProps,
  'appearance' | 'eyebrow' | 'heading' | 'description' | 'actions'
> &
  WithOptional<InlineVideoProps, 'url'> &
  WithOptional<EyebrowProps, 'theme'>

export interface HeroProps extends ContentProps {
  backgroundColor?: string
  smallImage?: string
  mediumImage?: string
  largeImage?: string
}
