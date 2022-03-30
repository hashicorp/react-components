export interface RadioInputProps {
  variant?: 'light' | 'dark'
  label: string
  name: string
  value: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
