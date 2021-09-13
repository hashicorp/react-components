module.exports = {
  versions: {
    type: 'Array',
    description: 'Array of version options',
    required: true,
    properties: [
      {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'A version’s programmatic value',
          },
          label: {
            type: 'string',
            description: 'A version’s human-friendly display value',
          },
        },
      },
    ],
  },
}
