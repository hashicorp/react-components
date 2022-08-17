module.exports = {
  children: {
    description: 'Sub-components added to the card content.',
    type: 'string',
    control: { type: 'text' },
    required: true,
  },
  thumbnail: {
    type: 'object',
    description: "An image showcasing the card's destination.",
    properties: {
      src: {
        description: 'URL for the image',
        type: 'string',
        control: { type: 'input' },
        required: true,
      },
      alt: {
        description: 'Alternative text for the image',
        type: 'string',
        control: { type: 'input' },
        required: false,
      },
    },
  },
  meta: {
    type: 'array',
    description: 'Content shown above the card heading.',
    required: false,
    testValue: ['August 15, 2022', 'Category'],
  },
  appearance: {
    description: 'Styles the card with either a light or dark theme.',
    type: 'string',
    required: false,
    options: ['light', 'dark'],
    testValue: 'light',
  },
  heading: {
    description: "A bold headline describing the card's destination.",
    type: 'string',
    required: false,
  },
  description: {
    description: "Text describing the card's destination.",
    type: 'string',
    required: false,
  },
  link: {
    type: 'string',
    description: 'A link followed when the card is clicked.',
    required: true,
    testValue: 'https://hashicorp.com',
  },
}
