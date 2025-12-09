/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = {
  appearance: {
    type: 'string',
    description: 'Display on light or dark backgrounds.',
    options: ['light', 'dark'],
  },
  products: {
    type: 'object',
    description:
      'Array of products or products with links. Only supports one or the other, not a mix of the two.',
    properties: {
      name: {
        description:
          'A lower-case product identifier to render the name of the product',
        type: 'string',
        control: { type: 'select' },
        options: [
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
        description: 'Where the anchor element links to when clicked.',
      },
    },
  },
}
