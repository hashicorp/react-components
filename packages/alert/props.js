const baseProps = require('../../props.js')

module.exports = {
  product: {
    ...baseProps.product,
  },
  url: {
    description: 'URL that the alert points to',
    type: 'string',
    control: { type: 'text' },
    testValue: '#',
    required: true,
  },
  tag: {
    description: 'Label or summary of the main alert message',
    type: 'string',
    control: { type: 'text' },
    testValue: 'New',
    required: true,
  },
  text: {
    description: 'Primary message of the alert',
    type: 'string',
    control: { type: 'text' },
    testValue: 'Tortor Tellus Inceptos Parturient',
    required: true,
  },
  state: {
    description: 'Special tag states that override brand values.',
    type: 'string',
    control: { type: 'select' },
    options: ['error', 'warning', 'success'],
    required: false,
  },
  textColor: {
    description: 'Background color of the text - default is `light`',
    type: 'string',
    control: { type: 'select' },
    options: ['dark', 'light'],
    testValue: 'dark',
  },
  className: {
    description: 'class to apply to the root element',
    control: { type: 'text' },
    type: 'string',
  },
}
