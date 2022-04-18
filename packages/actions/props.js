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
  brand: {
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
    description: 'Array of CTAs. Minimum of one, max of two.',
    properties: {
      title: {
        type: 'string',
        description: 'The text that appears inside the button.',
        required: true,
      },
      url: {
        type: 'string',
        description: 'Where the button links to when clicked.',
        require: true,
      },
      onClick: {
        type: 'function',
        description:
          'A function that will be called when the button is clicked.',
      },
      variant: {
        type: 'string',
        description:
          'Applies a styling to the button based on the desired hierarchy.',
        options: ['primary', 'secondary', 'tertiary-neutral'],
      },
    },
  },
}
