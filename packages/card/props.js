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
  link: {
    type: 'string',
    description: 'A link followed when the card is clicked.',
    required: true,
    testValue: 'https://hashicorp.com',
  },
}
