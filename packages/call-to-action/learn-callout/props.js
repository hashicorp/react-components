module.exports = {
  heading: {
    type: 'string',
    description: 'Heading copy to show on the left/top',
    control: { type: 'input' },
    required: true,
  },
  product: {
    type: 'string',
    description: 'Sets the brand colors to be used',
    control: { type: 'dropdown' },
    defaultValue: 'hashicorp',
    required: true,
    options: [
      'hashicorp',
      'terraform',
      'vault',
      'nomad',
      'consul',
      'packer',
      'vagrant',
      'boundary',
      'waypoint',
    ],
  },
  background: {
    type: 'string',
    description: 'URL for a background image',
    control: { type: 'input' },
  },
  items: {
    type: 'array',
    description:
      'Array of items to appear on the right/bottom - the icon should be a url',
    properties: {
      title: { type: 'string', description: 'name of the learn track' },
      category: { type: 'string', description: 'type of guide' },
      time: { type: 'string', description: 'estimated completion time' },
      link: { type: 'string', description: 'link to the actual guide' },
      image: {
        type: 'string',
        description: 'image used to represent the content',
      },
    },
    required: true,
  },
  className: {
    type: 'string',
    description: 'Optional className to add to the root element',
  },
}
