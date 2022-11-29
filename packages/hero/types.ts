import { EyebrowProps } from './eyebrow-with-pattern'
import { InlineVideoProps } from '@hashicorp/react-inline-video/types'
import { IntroProps } from '@hashicorp/react-intro/types'

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
  Partial<Pick<Type, Key>>

export type ContentProps = Pick<
  IntroProps,
  'appearance' | 'eyebrow' | 'heading' | 'description' | 'actions'
> &
  MakeOptional<InlineVideoProps, 'url'> &
  MakeOptional<EyebrowProps, 'theme'>

export interface HeroProps extends ContentProps {
  backgroundColor?: string
  smallImage: string
  mediumImage: string
  largeImage: string
}
