module.exports = {
  items: {
    type: 'object',
    description: 'Array of callout items',
    required: true,
    properties: {
      title: {
        type: 'string',
        description: 'Short callout item title',
        required: true,
      },
      description: {
        type: 'string',
        description:
          'Short description. Both HTML and plain text are supported.',
      },
      link: {
        type: 'object',
        description: 'Contains a link object',
        properties: {
          title: {
            type: 'string',
            description: 'Link title',
          },

          url: { type: 'string', description: 'The link URL' },
        },
      },
      image: {
        type: 'object',
        description: 'Contains a URL prop which links to the image',
        properties: {
          url: {
            type: 'string',
            description: 'Path to the image',
          },
        },
      },
    },
  },
  className: {
    type: 'string',
    description: 'Optional className to add to the root element',
  },
}
