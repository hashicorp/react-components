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
  cta: {
    type: 'object',
    description: 'Optional CTA displayed below the tiles.',
    properties: {
      copy: {
        type: 'string',
        description: 'The description copy prior to the CTA.',
      },
      href: {
        type: 'string',
        description: 'The url of the CTA.',
      },
      ctaText: {
        type: 'string',
        description: 'The text of the CTA.',
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
      badge: {
        type: 'string',
        description: 'Optional badge. Limit to one word.',
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
