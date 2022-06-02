export interface RadioInputProps {
  /**
   * Render on light or dark backgrounds.
   */
  appearance?: 'light' | 'dark'
  /**
   * The name attribute that will be applied to the radio option.
   */
  name: string
  /**
   * The label associated with the radio option.
   */
  label: string
  /**
   * The value associated with the radio option.
   */
  value: string
  /**
   * If true, the radio option will be disabled.
   */
  disabled?: boolean
  /**
   * If true, the radio option will be selected.
   */
  checked: boolean
  /**
   * A function that will be called when the radio option is clicked.
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
