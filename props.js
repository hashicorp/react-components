module.exports = {
  product: {
    description:
      'A lower-case product identifier to pull in respective theme colors. The default is hashicorp blue.',
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
    testValue: 'terraform',
    required: false,
  },
}
