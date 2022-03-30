module.exports = {
  variant: {
    type: 'string',
    description: 'Render on light or dark backgrounds.',
    options: ['light', 'dark'],
  },
  name: {
    type: 'string',
    description: 'The name attribute that will be applied to the radio option.',
    required: true,
  },
  label: {
    type: 'string',
    description: 'The label associated with the radio option.',
    required: true,
  },
  value: {
    type: 'string',
    description: 'The value associated with the radio option.',
    required: true,
  },
  checked: {
    type: 'boolean',
    description: 'If true, the radio option will be selected.',
    required: true,
  },
  disabled: {
    type: 'boolean',
    description: 'If true, the radio option will be disabled.',
  },
  onChange: {
    type: 'function',
    description:
      'A function that will be called when the radio option is clicked.',
    required: true,
  },
}
