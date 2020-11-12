module.exports = {
  tag: {
    type: 'string',
    description: 'The text contained inside the tag to the left',
    required: true,
    control: { type: 'text' },
  },
  text: {
    type: 'string',
    description: 'The text in the main area',
    required: true,
    control: { type: 'text' },
  },
  url: {
    type: 'string',
    description: 'where to link to when clicked',
    required: true,
    control: { type: 'text' },
  },
  theme: {
    type: 'string',
    description: 'Color theme to match a specific product',
    control: { type: 'select' },
    options: ['consul', 'terraform', 'nomad', 'vault', 'boundary', 'waypoint'],
  },
  linkText: {
    type: 'string',
    description: 'Secondary text styled as a link',
    control: { type: 'text' },
  },
  name: {
    type: 'string',
    description:
      'string used for cookie name (defaults to slugified text property)',
    control: { type: 'text' },
  },
  expirationDate: {
    type: 'string',
    description:
      'A datetime string that, when set, controls if the alert banner should appear',
    control: { type: 'text' },
  },
}
