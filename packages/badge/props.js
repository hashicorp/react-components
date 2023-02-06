/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = {
  children: {
    description: 'The text that appears inside the badge.',
    type: 'string',
    control: { type: 'text' },
    required: true,
  },
  theme: {
    description: 'Styles the badge background and text color.',
    type: 'string',
    required: false,
    options: [
      'action',
      'neutral',
      'boundary',
      'consul',
      'nomad',
      'packer',
      'terraform',
      'vault',
      'vagrant',
      'waypoint',
    ],
  },
  variant: {
    description: 'Variant styling based upon choosen theme.',
    type: 'string',
    required: false,
    options: ['primary', 'secondary'],
  },
  page: {
    description: 'Variant styling based page color',
    type: 'string',
    required: false,
    options: [
      'light',
      'faint',
      'strong',
      'strongFaint',
      'action',
      'actionFaint',
    ],
  },
}
