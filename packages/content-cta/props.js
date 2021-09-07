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
  className: {
    type: 'string',
    description: 'Optional className to add to the root element',
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
