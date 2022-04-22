module.exports = {
  appearance: {
    type: 'string',
    options: ['light', 'dark'],
    description: 'Render NextSteps on light or dark background.',
  },
  theme: {
    type: 'string',
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
    description: 'Optional theme which controls the primary step color.',
  },
  heading: {
    type: 'string',
    required: true,
    description: 'The heading for the section.',
  },
  description: {
    type: 'string',
    required: true,
    description: 'The description for the section.',
  },
  ctas: {
    type: 'object',
    description: 'Optional ctas displayed below the heading and description.',
    properties: {
      title: {
        type: 'string',
        description: 'The title of the cta.',
      },
      url: {
        type: 'string',
        description: 'The url of the cta.',
      },
    },
  },
  steps: {
    type: 'object',
    description: 'The list of steps to display as tiles.',
    required: true,
    properties: {
      heading: {
        type: 'string',
        required: true,
        description: 'The heading for the step.',
      },
      description: {
        type: 'string',
        description: 'The description for the step.',
      },
      cta: {
        type: 'object',
        required: true,
        properties: {
          title: {
            type: 'string',
            required: true,
            description: 'The title of the cta.',
          },
          url: {
            type: 'string',
            required: true,
            description: 'The url of the cta.',
          },
        },
      },
    },
  },
}
