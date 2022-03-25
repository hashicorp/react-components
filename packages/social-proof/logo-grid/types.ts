import type { LogoCardProps } from '../logo-card/types'

type FixedArraySix<T> = [T, T, T, T, T, T]
type FixedArrayNine<T> = [T, T, T, T, T, T, T, T, T]

export interface LogoGridProps {
  bordered?: boolean
  layout?: 'grid' | 'inline'
  logos: FixedArraySix<LogoCardProps> | FixedArrayNine<LogoCardProps>
}
