export interface StandaloneLinkProps {
  /**
   * Display on light or dark backgrounds.
   */
  appearance?: 'light' | 'dark'
  /**
   * The text that appears inside the link.
   */
  children: string
  /**
   * The url destination.
   */
  href: string
  /**
   * The link color.
   */
  variant?: 'primary' | 'secondary' | 'tertiary'
  /**
   * Optional onClick handler which is called when
   * the link is clicked.
   */
  onClick?: () => void
}
