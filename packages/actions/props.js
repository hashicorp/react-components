module.exports = {
  layout: {
    type: 'string',
    description: '',
    options: ['inline', 'stacked'],
  },
  brand: {
    type: 'string',
    description: '',
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
  ctas: {
    type: 'object',
    description: '',
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
