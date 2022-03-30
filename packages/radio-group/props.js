module.exports = {
  layout: {
    type: 'string',
    descrition: 'Render radios inline or stacked.',
    options: ['stacked', 'inline'],
  },
  variant: {
    type: 'string',
    description: 'Render on light or dark backgrounds.',
    options: ['light', 'dark'],
  },
  label: {
    type: 'string',
    description: 'A label that describes the radio options.',
  },
  helpText: {
    type: 'string',
    description: 'Optional text displayed after the label.',
  },
  name: {
    type: 'string',
    description:
      'The name attribute that will be applied to the group of radio inputs.',
  },
  value: {
    type: 'string',
    description: 'The currently selected value.',
  },
  onChange: {
    type: 'function',
    description:
      'A function that will be called when the button is clicked. Returns the radio options value.',
  },
  options: {
    type: 'object',
    properties: {
      label: {
        type: 'string',
        description: 'The label associated with the radio option.',
      },
      value: {
        type: 'string',
        description: 'The value associated with the radio option.',
      },
      disabled: {
        type: 'boolean',
        description: 'If true, the radio option will be disabled.',
      },
    },
  },
}