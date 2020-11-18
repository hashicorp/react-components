module.exports = {
  content: {
    type: 'React.Element',
    description: 'Content to be rendered and styled by the component',
  },
  product: {
    type: 'string',
    description: 'Product name for accent color',
    control: { type: 'select' },
    options: [
      'hashicorp',
      'terraform',
      'vault',
      'consul',
      'nomad',
      'packer',
      'vagrant',
      'boundary',
      'waypoint',
    ],
  },
}
