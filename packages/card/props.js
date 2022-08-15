module.exports = {
  children: {
    description: 'Sub-components added to the card content.',
    type: 'string',
    control: { type: 'text' },
    testValue: 'Sample content (TODO: polish this documentation)',
    required: true,
  },
  appearance: {
    description: 'Styles the card with either a light or dark theme.',
    type: 'string',
    required: false,
    options: ['light', 'dark'],
    testValue: 'light',
  },
  featured: {
    description:
      'Determines whether the card will render with a "featured" layout or not',
    type: 'boolean',
    required: false,
    control: { type: 'checkbox' },
    testValue: false,
  },
  cta: {
    type: 'object',
    description: 'A link followed when the card is clicked.',
    required: true,
    properties: {
      title: {
        description: 'The text used within the link.',
        type: 'string',
        required: false,
      },
      url: {
        description: 'The url used within the link.',
        type: 'string',
        required: true,
      },
    },
  },
}
