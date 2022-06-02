import type { ActionsProps } from '@hashicorp/react-actions/types'

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface IntroProps {
  /**
   * Display intro on light or dark backgrounds.
   */
  appearance?: 'light' | 'dark'
  /**
   * Controls the text alignment rendering.
   */
  textAlignment?: 'left' | 'center'
  /**
   * Optional text displayed above the heading.
   */
  eyebrow?: string
  /**
   * Text displayed within the heading element.
   */
  heading: string
  /**
   * Controls which element the heading renders as.
   */
  headingElement?: 'h1' | 'h2' | 'h3' | 'h4'
  /**
   * Controls the size at which the heading is rendered.
   */
  headingSize?: 1 | 2 | 3
  /**
   * Text following the heading element.
   */
  description: string
  /**
   * Render CTAs following the description element.
   */
  actions?: WithOptional<ActionsProps, 'ctas'>
}
