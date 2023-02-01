/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = {
  textSize: {
    type: 'number',
    description: 'The display size the text should render as.',
    options: [4, 5],
  },
  text: {
    type: 'string',
    required: true,
    description: 'The text displayed as the quote',
  },
  avatar: {
    type: 'string',
    description: 'Source url of the image',
  },
  name: {
    type: 'string',
    required: true,
    description: 'Renders as the first line of the byline',
  },
  role: {
    type: 'string',
    required: true,
    description: 'Renders as the second line of the byline',
  },
  appearance: {
    type: 'string',
    options: ['light', 'dark'],
    description: 'Render on light or dark backgrounds',
  },
}
