module.exports = {
  children: {
    description: 'The text that appears inside the badge.',
    type: 'string',
    control: { type: 'text' },
    testValue: 'New',
    required: true,
  },
  theme: {
    description: 'Styles the badge background and text color.',
    type: 'string',
    required: true,
    options: [
      'neutral',
      'white',
      'black',
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
  variant: {
    description: '',
    type: 'string',
    options: ['primary', 'secondary'],
  },
}
