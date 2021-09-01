module.exports = {
  heading: {
    type: 'string',
    description: 'A heading for the menu, defaults to "Content".',
    default: 'Content',
  },
  sections: {
    type: 'array',
    description: 'Sections which will be rendered.',
    properties: {
      type: 'object',
      properties: {
        level: {
          type: 'number',
        },
        text: {
          type: 'string',
        },
        slug: {
          type: 'string',
        },
      },
    },
  },
}
