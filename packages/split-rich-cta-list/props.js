module.exports = {
  brand: {
    description:
      'Styles the SplitRichCTAList with a color based on a HashiCorp product',
    type: 'string',
    control: { type: 'select' },
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
    testValue: 'hashicorp',
  },
  heading: {
    type: 'string',
    description: 'Heading to the left of the CTAs',
  },
  items: {
    type: 'array',
    description: 'call-to-action items to be displayed',
    properties: [
      {
        type: 'object',
        properties: {
          icon: { type: 'svg', description: 'The SVG icon to display in the CTA' },
          title: { type: 'string', description: 'The CTA title text' },
          description: { type: 'string', description: 'The CTA description text' },
          linkUrl: { type: 'string', description: 'The destination of the CTA when clicked' },
        },
      },
    ],
  },

}
