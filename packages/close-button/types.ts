/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export interface CloseButtonProps {
  /**
   * Display on light or dark background.
   */
  appearance?: 'light' | 'dark'
  /**
   * The size of rendered button.
   */
  size?: 'medium' | 'large'
  /**
   * A function that will be called when the button is clicked.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  /**
   * If true, button will be disabled.
   */
  disabled?: boolean
  /**
   * Optional class to be added to the button element.
   */
  className?: string
  /**
   * A label that describes the buttons action. Applied as aria-label value.
   */
  ariaLabel: string
}
