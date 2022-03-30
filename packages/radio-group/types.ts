export interface RadioGroupProps {
  layout: 'stacked' | 'inline'
  variant: 'light' | 'dark'
  label: string
  helpText?: string
  name: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => string
  options: Array<{
    label: string
    value: string
  }>
}
