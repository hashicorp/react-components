import { HashiCorpProduct } from '../../types'

export type Size = 'medium' | 'small'
export type LinkType = 'inbound' | 'outbound' | 'anchor' | 'download'
export type IconPosition = 'left' | 'right'
export type ThemeBackground = 'light' | 'dark' | 'brand'
export type ThemeVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'tertiary-neutral'
  | 'ghost'

export interface IconObject {
  svg: string
  position?: IconPosition
  isAnimated?: boolean
}

export interface Theme {
  variant: ThemeVariant
  background: ThemeBackground
  brand: HashiCorpProduct
}

export interface IconProps {
  svg: string
  position: IconPosition
  animationId: LinkType
  isAnimated: boolean
  isHovered: boolean
  size: Size
}
