module.exports = {
  appearance: {
    type: 'string',
    description: 'Display actions on light or dark background.',
    options: ['light', 'dark'],
  },
  layout: {
    type: 'string',
    description: 'Display buttons inline or stacked by default.',
    options: ['inline', 'stacked'],
  },
  alignment: {
    type: 'string',
    description: 'Align items when stacked.',
    options: ['left', 'center'],
  },
  theme: {
    type: 'string',
    description: 'Render primary variant button CTA with product color.',
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
      'Array of CTAs. Minimum of one, max of two. A CTA can either be rendered as a Button or a StandaloneLink via the `cta.type` prop.',
    properties: {
      title: {
        type: 'string',
        description: 'The text that appears inside the button.',
        required: true,
      },
      href: {
        type: 'string',
        description: 'Where the button links to when clicked.',
        required: true,
      },
      type: {
        type: 'string',
        description:
          'Render either a Button component or StandaloneLink component for the CTA. Defaults to Button.',
        options: ['button', 'standalone-link'],
      },
      onClick: {
        type: 'function',
        description:
          'A function that will be called when the button is clicked.',
      },
    },
  },
}
