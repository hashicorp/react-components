module.exports = {
  product: {
    description: 'Product name for the alert, link url, and theme colors.',
    type: 'string',
    control: { type: 'select' },
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
    testValue: 'consul',
    required: true,
  },
  inline: {
    description:
      'Determines whether to display the alert inline and only with a tagline',
    type: 'boolean',
    control: { type: 'checkbox' },
    testValue: false,
  },
  children: {
    description: 'Custom content replacing the content of the alert',
    type: 'string',
    control: { type: 'textarea' },
  },
}
