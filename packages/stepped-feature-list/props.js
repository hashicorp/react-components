module.exports = {
  features: {
    type: 'array',
    description: 'Features that get rendered in each stepped slide',
    required: true,
    testValue: [
      {
        title: 'Feature 1',
        description: 'Feature 1 Description',
        content: 'Slide content 1',
      },
      {
        title: 'Feature 2',
        description: 'Feature 2 Description',
        content: 'Slide content 2',
      },
    ],
    properties: [
      {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            required: true,
            description: 'Title of the feature',
          },
          description: {
            type: 'string',
            required: true,
            description: 'Description of the feature',
          },
          learnMoreLink: {
            type: 'string',
            description: 'Link to learn more about the feature',
          },
          content: {
            type: 'React.Element',
            required: true,
            description:
              'The primary content that is shown on the right (on web) or below the description (on mobile)',
          },
        },
      },
    ],
  },
}
