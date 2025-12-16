/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

const introProps = require('../intro/props')
const authorBylineProps = require('../author-byline/props')
const inlineVideoProps = require('../inline-video/props')

module.exports = {
  appearance: {
    type: 'string',
    description: 'Display the component on light or dark backgrounds.',
    options: ['light', 'dark'],
  },
  contentPosition: {
    description: 'Position for content to appear on.',
    type: 'string',
    control: { type: 'text' },
    testValue: 'left',
  },
  heading: introProps.heading,
  description: introProps.description,
  author: {
    type: 'object',
    description: 'Details about the video author.',
    properties: {
      avatar: authorBylineProps.avatar,
      name: authorBylineProps.name,
      role: authorBylineProps.role,
    },
  },
  video: {
    type: 'object',
    properties: {
      solution: inlineVideoProps.solution,
      url: inlineVideoProps.url,
      description: inlineVideoProps.description,
    },
  },
}
