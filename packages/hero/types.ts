import { EyebrowProps } from './eyebrow-with-pattern'
import { InlineVideoProps } from '@hashicorp/react-inline-video/types'
import { StandaloneLinkProps } from '@hashicorp/react-standalone-link/types'
import { Theme } from '@hashicorp/react-button/types'

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type ContentProps = WithOptional<InlineVideoProps, 'url'> &
  WithOptional<EyebrowProps, 'theme'>

export interface HeroProps extends ContentProps {
  appearance: 'light' | 'dark'
  eyebrow?: string
  title: string
  description: string
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
  brand: Pick<Theme, 'brand'>
}
