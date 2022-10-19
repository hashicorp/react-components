module.export = {
  appearance: {
    type: 'string',
    description: 'Display on light or dark backgrounds.',
    options: ['light', 'dark'],
  },
  products: {
    type: 'object',
    description: 'Array of products.',
    properties: {
      name: {
        description:
          'A lower-case product identifier to pull in respective theme colors.',
        type: 'string',
        control: { type: 'select' },
        options: [
          'hashicorp',
          'boundary',
          'consul',
          'nomad',
          'packer',
          'terraform',
          'vault',
          'vagrant',
          'waypoint',
        ],
        required: true,
      },
      href: {
        type: 'string',
        description: 'Where the button links to when clicked.',
      },
    },
  },
}
