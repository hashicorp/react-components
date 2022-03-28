import type { AuthorBylineProps } from '../author-byline/types'

export interface QuoteProps extends AuthorBylineProps {
  /**
   * The text displayed as the quote
   */
  text: string
}
