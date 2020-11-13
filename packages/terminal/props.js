module.exports = {
  theme: {
    type: 'string',
    description: 'Color theme to match a specific product',
    control: { type: 'select' },
    options: ['consul', 'terraform', 'nomad', 'vault', 'waypoint', 'boundary'],
    testValue: 'terraform',
  },
  lines: {
    type: 'array',
    testValue: [
      {
        code: '» Building . . . . . . . . . . . . .',
      },
      {
        color: 'gray',
        code: '  Creating new buildpack-based image using builder:',
      },
    ],
    description:
      'The lines of code to be rendered. Indentation can be represented by using whitespace.',
    properties: [
      {
        type: 'object',
        properties: {
          code: { type: 'string', description: 'Code to be rendered' },
          color: {
            type: 'string',
            description: 'Color of rendered code',
            options: ['navy', 'gray', 'white'],
          },
        },
      },
    ],
  },
}
