import { ActionsProps } from 'packages/actions/types'
import { EyebrowProps } from './eyebrow-with-pattern'
import { InlineVideoProps } from '@hashicorp/react-inline-video/types'
import { Products } from '@hashicorp/platform-product-meta'

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type ContentProps = WithOptional<InlineVideoProps, 'url'> &
  Pick<EyebrowProps, 'solution'> &
  Pick<ActionsProps, 'ctas'>

export interface HeroProps extends ContentProps {
  appearance: 'light' | 'dark'
  eyebrow?: string
  heading: string
  headingSize?: '1' | '2'
  description: string
  descriptionColor?: string
  backgroundColor?: string
  smallImage?: string
  mediumImage?: string
  largeImage?: string
  theme?: Products
}
