module.exports = {
  heading: {
    type: 'string',
    required: true,
  },
  description: {
    type: 'string',
    required: true,
  },
  ctas: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
      },
      url: {
        type: 'string',
      },
    },
  },
  steps: {
    type: 'object',
    required: true,
    properties: {
      heading: {
        type: 'string',
        required: true,
      },
      description: {
        type: 'string',
      },
      cta: {
        type: 'object',
        required: true,
        properties: {
          title: {
            type: 'string',
            required: true,
          },
          url: {
            type: 'string',
            required: true,
          },
        },
      },
    },
  },
}
