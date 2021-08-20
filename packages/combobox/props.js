module.exports = {
  label: {
    type: 'string',
    required: true,
    description: 'A label for the combobox, used directly for aria-label',
  },
  options: {
    type: 'array',
    required: true,
    description: 'Array of string values for the dropdown options',
  },
  onSelect: {
    type: 'function',
    description:
      'A handler called when a new option is selected, takes the newly selected option value as its only parameter',
  },
  inputProps: {
    type: 'object',
    description:
      'Props passed to the combobox input, props listed below are not an exhaustive list, conforms to <a href="https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts" target="_blank"  rel="noopener noreferrer">React\'s InputHTMLAttributes</a>',
    properties: {
      onChange: {
        type: 'function',
        required: false,
        description: 'A `onChange` handler for the input',
      },
      onBlur: {
        type: 'function',
        required: false,
        description: 'An `onBlur` handler for the input',
      },
    },
  },
  openOnFocus: {
    type: 'boolean',
    description: 'Controls whether the dropdown opens on focus of the input',
    default: false,
  },
  buttonLabel: {
    type: 'string',
    description: 'Accessible label for the dropdown button',
    default: 'Show all options',
  },
  invalidInputValue: {
    type: 'boolean',
    description:
      'Declaratively mark the input as invalid, useful for form inputs (validation)',
  },
  renderOption: {
    type: 'function',
    description: 'Render function to customize the display of options',
  },
}
