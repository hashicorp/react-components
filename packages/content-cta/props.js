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
    type: 'string',
    control: { type: 'select' },
    options: [
      'hashicorp',
      'terraform',
      'vault',
      'consul',
      'nomad',
      'packer',
      'vagrant',
    ],
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
