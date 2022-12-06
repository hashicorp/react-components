module.exports = {
  appearance: {
    type: 'string',
    description: 'Display intro on light or dark backgrounds.',
    options: ['light', 'dark'],
  },
  theme: {
    description: 'Styles the button with a color based on a HashiCorp product',
    type: 'string',
    control: { type: 'select' },
    options: [
      'neutral',
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
  eyebrow: {
    type: 'string',
    description: 'Optional text displayed above the heading.',
  },
  solution: {
    type: 'string',
    description: 'Controls eyebrow pattern and video gradient colors',
    options: ['infrastructure' | 'security' | 'networking' | 'applications'],
  },
  heading: {
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
  ctas: {
    required: true,
    type: 'object',
    description:
      'Array of CTAs. Minimum of one, max of two. See props for the `Actions` CTAs <a href="https://react-components.vercel.app/components/actions">here</a>',
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
