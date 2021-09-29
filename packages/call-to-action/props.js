module.exports = {
  variant: {
    type: 'string',
    description:
      'Controls the visual appearance of the call to action, defaults to `centered`.',
    options: ['centered', 'compact', 'links'],
  },
  heading: {
    type: 'string',
    description: 'Header text',
    required: true,
  },
  content: {
    type: 'string',
    description: 'Description text',
    required: true,
  },
  theme: {
    type: 'string',
    description:
      'Color of background the CTA is on top of, default is `light`.',
    options: ['light', 'gray', 'dark', 'brand'],
  },
  className: {
    type: 'string',
    description: 'Optional className to add to the root element',
  },
  product: {
    type: 'string',
    description:
      'If a different brand color is needed for buttons it can be set with this prop.',
    options: [
      'hashicorp',
      'terraform',
      'vault',
      'nomad',
      'consul',
      'packer',
      'vagrant',
      'boundary',
      'waypoint',
    ],
  },
  links: {
    type: 'array',
    description:
      'Links to be displayed as buttons. The first will be primary, following will be secondary.',
    properties: [
      {
        type: 'object',
        properties: {
          text: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
          type: {
            type: 'string',
            options: ['inbound', 'outbound', 'anchor'],
          },
        },
      },
    ],
  },
}
