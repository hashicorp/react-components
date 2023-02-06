/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = {
  appearance: {
    type: 'string',
    description: 'Display `<ProductBadge />` on light or dark background.',
    options: ['light', 'dark'],
  },
  productName: {
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
  theme: {
    type: 'string',
    description: 'Applies styling to the component.',
    options: ['primary', 'secondary'],
  },
  hasDot: {
    type: 'boolean',
    description: 'Applies a dot. Forces the `secondary` theme.',
  },
}
