module.exports = {
  heading: {
    type: 'string',
    description: 'Header for the list',
  },
  className: {
    type: 'string',
    description: 'Optional className to add to the root element',
  },
  features: {
    type: 'array',
    description:
      'An array detailing each of the features - the icon should be a url',
    properties: [
      {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'name of the feature' },
          content: {
            type: 'string',
            description: 'description of the feature, html not accepted',
          },
          icon: {
            type: 'string',
            description:
              'an icon displayed above the feature, piped in to the `src` of an image element',
          },
          link: {
            type: 'object',
            description:
              'a button intended to link to more information about the feature',
            properties: {
              type: {
                type: 'string',
                options: ['internal', 'external', 'anchor'],
                description: 'link type',
              },
              text: { type: 'string', description: 'link text' },
              url: { type: 'string', description: 'link url' },
            },
          },
        },
      },
    ],
  },
}
