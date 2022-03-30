export interface RadioGroupProps {
  /**
   * Render radios inline or stacked.
   */
  layout: 'stacked' | 'inline'
  /**
   * Render on light or dark backgrounds.
   */
  variant: 'light' | 'dark'
  /**
   * A label that describes the radio options.
   */
  label: string
  /**
   * Optional text displayed after the label.
   */
  helpText?: string
  /**
   * The name attribute that will be applied to the group of
   * radio inputs.
   */
  name: string
  /**
   * The currently selected value.
   */
  value: string
  /**
   * A function that will be called when a radio option is clicked. Returns the radio options value.
   */
  onChange: (value: string) => string
  /**
   * Supplied by formik
   */
  errors?: Record<string, string>
  /**
   * Supplied by formik
   */
  touched?: Record<string, boolean>
  /**
   * Supplied by formik
   */
  errors?: Record<string, string>
  /**
   * Supplied by formik
   */
  touched?: Record<string, boolean>
  /**
   * Array of radio options.
   */
  options: Array<{
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
  }>
}
