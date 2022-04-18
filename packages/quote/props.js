module.exports = {
  text: {
    type: 'string',
    description: 'The text displayed as the quote',
  },
  avatar: {
    type: 'string',
    description: 'Source url of the image',
  },
  name: {
    type: 'string',
    required: true,
    description: 'Renders as the first line of the byline',
  },
  role: {
    type: 'string',
    required: true,
    description: 'Renders as the second line of the byline',
  },
  appearance: {
    type: 'string',
    options: ['light', 'dark'],
    description: 'Render on light or dark backgrounds',
  },
}
