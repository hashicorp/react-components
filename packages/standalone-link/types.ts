/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

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
  theme?: 'primary' | 'secondary' | 'tertiary'
}
