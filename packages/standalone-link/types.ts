import type Link from 'next/link'
import type { ComponentProps } from 'react'

type AnchorElementProps = ComponentProps<typeof Link>

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
  theme?: 'primary' | 'secondary' | 'tertiary'
}
