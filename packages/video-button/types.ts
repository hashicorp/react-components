export interface VideoButtonProps {
  onClick: () => void
  theme?: 'action' | 'white' | 'black'
  size?: 'medium' | 'large'
  radius?: 'full' | 'rounded'
  children: string
  className?: string
}
