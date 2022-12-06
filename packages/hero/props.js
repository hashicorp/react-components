module.exports = {
  appearance: {
    type: 'string',
    description: 'Display intro on light or dark backgrounds.',
    options: ['light', 'dark'],
  },
  eyebrow: {
    type: 'string',
    description: 'Optional text displayed above the heading.',
  },
  title: {
    required: true,
    type: 'string',
    description: 'Text displayed within the heading element.',
  },
  headingSize: {
    type: 'number',
    description: 'Controls the size at which the heading is rendered.',
    options: [1, 2],
  },
  description: {
    required: true,
    type: 'string',
    description: 'Text following the heading element.',
  },
  descriptionColor: {
    type: 'string',
    description:
      'Color name or hex value to override default description color',
  },
  url: {
    type: 'string',
    description: 'URL for the featured video.',
  },
  primaryCta: {
    type: 'object',
    properties: {
      title: {
        required: true,
        type: 'string',
        description: 'The text that appears inside the button.',
      },
      href: {
        required: true,
        type: 'string',
        description: 'The URL destination',
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
          'neutral',
        ],
      },
    },
  },
  secondaryCta: {
    type: 'object',
    properties: {
      children: {
        description: 'The text that appears inside the link.',
        type: 'string',
        control: { type: 'text' },
        testValue: 'Call-to-action',
        required: true,
      },
      href: {
        description: 'The url destination.',
        type: 'string',
        required: true,
      },
      theme: {
        description: 'The link color.',
        type: 'string',
        options: ['primary', 'secondary', 'tertiary'],
        required: false,
      },
    },
  },
  backgroundColor: {
    type: 'string',
    description: 'Color name or hex value to override default background color',
  },
  smallImage: {
    type: 'string',
    description: 'URL for small background image',
  },
  mediumImage: {
    type: 'string',
    description: 'URL for medium background image',
  },
  largeImage: {
    type: 'string',
    description: 'URL for large background image',
  },
}
