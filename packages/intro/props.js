/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = {
  appearance: {
    type: 'string',
    description: 'Display intro on light or dark backgrounds.',
    options: ['light', 'dark'],
  },
  textAlignment: {
    type: 'string',
    description: 'Controls the text alignment rendering.',
    options: ['left', 'center'],
  },
  eyebrow: {
    type: 'string',
    description: 'Optional text displayed above the heading.',
  },
  heading: {
    required: true,
    type: 'string',
    description: 'Text displayed within the heading element.',
  },
  headingElement: {
    type: 'string',
    description: 'Controls which element the heading renders as.',
    options: ['h1', 'h2', 'h3', 'h4'],
  },
  headingSize: {
    type: 'number',
    description: 'Controls the size at which the heading is rendered.',
    options: [1, 2, 3],
  },
  description: {
    required: true,
    type: 'string|React.ReactNode',
    description: 'Text following the heading element.',
  },
  actions: {
    type: 'object',
    properties: {
      layout: {
        type: 'string',
        description: 'Display buttons inline or stacked by default.',
        options: ['inline', 'stacked'],
      },
      theme: {
        type: 'string',
        description: 'Render primary variant button with product color.',
        options: [
          'hashicorp',
          'nomad',
          'consul',
          'terraform',
          'vault',
          'packer',
          'vagrant',
          'waypoint',
          'boundary',
        ],
      },
      size: {
        type: 'string',
        description: 'Determines CTA button sizing.',
        options: ['small', 'medium'],
      },
      ctas: {
        type: 'object',
        description:
          'Array of CTAs. Minimum of one, max of two. See props for the `Actions` CTAs <a href="https://react-components.vercel.app/components/actions">here</a>',
      },
    },
  },
}
