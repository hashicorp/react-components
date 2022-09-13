type AnchorElementProps = JSX.IntrinsicElements['a']

export interface StandaloneLinkProps extends AnchorElementProps {
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
}
