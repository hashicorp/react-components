module.exports = {
  variant: {
    type: 'string',
    description: 'Render on light or dark backgrounds.',
    options: ['light', 'dark'],
  },
  className: {
    type: 'string',
    description:
      'An optional class to be added directly to the button if necessary.',
  },
  onClick: {
    type: 'function',
    description: 'A function that will be called when the button is clicked.',
    required: true,
  },
  disabled: {
    type: 'boolean',
    description: 'If true, button will be disabled.',
  },
  ariaLabel: {
    type: 'string',
    description:
      'Label describing the buttons action. Rendered as aria-label value.',
  },
}
