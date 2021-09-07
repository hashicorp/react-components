module.exports = {
  heading: {
    type: 'string',
    description: 'headline above the accordion',
  },
  className: {
    type: 'string',
    description: 'Optional className to add to the root element',
  },
  tabs: {
    type: 'array',
    description: "information about each of the accordion's top level tabs",
    properties: [
      {
        type: 'object',
        properties: {
          heading: { type: 'string', description: 'heading of the tab' },
          items: {
            type: 'object',
            description: 'information about each accordion item within the tab',
            properties: {
              heading: {
                type: 'string',
                description: 'heading of the accordion item',
              },
              content: {
                type: 'string',
                description: 'content of the accordion item',
              },
            },
          },
        },
      },
    ],
  },
}
