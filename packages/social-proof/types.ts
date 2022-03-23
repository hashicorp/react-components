type FixedArraySix<T> = [T, T, T, T, T, T]
type FixedArrayNine<T> = [T, T, T, T, T, T, T, T, T]

interface LogoProps {
  src: string
  alt: string
}

interface SocialProofBaseProps {
  layout?: 'default' | 'reversed' | 'stacked'
  /**
   * Logos must be of length 6 or 9
   */
  logos: FixedArraySix<LogoProps> | FixedArrayNine<LogoProps>
}

interface SocialProofQuoteProps extends SocialProofBaseProps {
  quote: any
  content?: never
}

interface SocialProofContentProps extends SocialProofBaseProps {
  content: any
  quote?: never
}

export type SocialProofProps = SocialProofQuoteProps | SocialProofContentProps
