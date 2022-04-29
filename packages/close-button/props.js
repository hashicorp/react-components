module.exports = {
  appearance: {
    type: 'string',
    description: 'Display on light or dark background.',
    options: ['light', 'dark'],
  },
  className: {
    type: 'string',
    description: 'Optional class to be added to the button element.',
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
      'A label that describes the buttons action. Applied as aria-label value.',
  },
}
