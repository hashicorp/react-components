export interface CloseButtonProps {
  /**
   * Display on light or dark background.
   */
  appearance?: 'light' | 'dark'
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
