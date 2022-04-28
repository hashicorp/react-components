export interface CloseButtonProps {
  variant?: 'light' | 'dark'
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  disabled?: boolean
  className?: string
  ariaLabel: string
}
