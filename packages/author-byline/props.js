module.exports = {
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
  variant: {
    type: 'string',
    options: ['light', 'dark'],
    description: 'Render on light or dark backgrounds',
  },
  appearance: {
    type: 'string',
    options: ['light', 'dark'],
    description: 'Render on light or dark backgrounds',
  },
}
