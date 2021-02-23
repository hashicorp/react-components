const baseProps = require('../../props.js')

module.exports = {
  heading: {
    type: 'string',
    required: true,
  },
  content: {
    type: 'string|function',
    required: true,
  },
  product: {
    ...baseProps.product,
  },
  links: {
    type: 'array',
    properties: [
      {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'link url',
          },
          text: {
            type: 'string',
            description: 'link text',
          },
        },
      },
    ],
  },
}
