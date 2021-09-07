const baseProps = require('../../props.js')

module.exports = {
  product: {
    ...baseProps.product,
  },
  inline: {
    description:
      'Determines whether to display the alert inline and only with a tagline',
    type: 'boolean',
    control: { type: 'checkbox' },
    testValue: false,
  },
  children: {
    description: 'Custom content replacing the content of the alert',
    type: 'string',
    control: { type: 'textarea' },
  },
  className: {
    type: 'string',
    description: 'Optional className to add to the root element',
  },
}
