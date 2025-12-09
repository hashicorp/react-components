/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = {
  appearance: {
    description: 'Styles the description with either a light or dark theme.',
    type: 'string',
    required: false,
    options: ['light', 'dark'],
    testValue: 'light',
  },
  gradientPosition: {
    description: 'Position for the gradient.',
    type: 'string',
    control: { type: 'text' },
    testValue: 'left',
  },
  url: {
    type: 'string',
    description: 'URL for the featured video.',
    required: true,
  },
  description: {
    type: 'string',
    description: 'Text describing the video.',
  },
  solution: {
    type: 'string',
    description: 'Solution theme to apply to the gradient.',
    options: ['infrastructure', 'security', 'networking', 'applications'],
  },
}
