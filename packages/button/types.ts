import { Products as HashiCorpProduct } from '@hashicorp/platform-product-meta'

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

/* 
Note: the .brand-neutral "brand" class  is an exception that
sits outside of our usual useProductMeta use.

We could consider making this the default prop value,
falling back to this appearance if no "theme.brand"
is provided. However, this would be a breaking change,
and disrupt many current uses, requiring brand=hashicorp
to be set explicitly.
*/
export interface Theme {
  variant?: ThemeVariant
  background?: ThemeBackground
  brand?: HashiCorpProduct | 'neutral'
}

export interface IconProps {
  svg: string
  position: IconPosition
  animationId?: LinkType
  isAnimated?: boolean
  isHovered: boolean
  size: Size
}
