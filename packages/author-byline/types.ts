export interface AuthorBylineProps {
  /**
   * Source url of the image
   */
  avatar?: string
  /**
   * Renders as the first line of the byline
   */
  name: string
  /**
   * Renders as the second line of the byline
   */
  role: string
  /**
   * Render on light or dark backgrounds
   */
  appearance?: 'light' | 'dark'
}
