import { EyebrowProps } from './eyebrow-with-pattern'
import { InlineVideoProps } from '@hashicorp/react-inline-video/types'
import { Products } from '@hashicorp/platform-product-meta'
import { StandaloneLinkProps } from '@hashicorp/react-standalone-link/types'

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type ContentProps = WithOptional<InlineVideoProps, 'url'> &
  Pick<EyebrowProps, 'theme'>

export interface HeroProps extends ContentProps {
  appearance: 'light' | 'dark'
  eyebrow?: string
  heading: string
  headingSize?: '1' | '2'
  description: string
  descriptionColor?: string
  primaryCta: PrimaryCtaProps
  secondaryCta?: StandaloneLinkProps
  backgroundColor?: string
  smallImage?: string
  mediumImage?: string
  largeImage?: string
}

interface PrimaryCtaProps {
  title: string
  href: string
  brand?: Products | 'neutral'
}
