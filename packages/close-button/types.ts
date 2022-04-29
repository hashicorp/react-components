export interface CloseButtonProps {
  appearance?: 'light' | 'dark'
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  disabled?: boolean
  className?: string
  ariaLabel: string
}
