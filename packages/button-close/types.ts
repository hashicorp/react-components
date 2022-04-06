export interface ButtonCloseProps {
  variant?: 'light' | 'dark'
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  disabled?: boolean
  className?: string
}
