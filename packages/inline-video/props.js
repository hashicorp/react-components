module.exports = {
  appearance: {
    description: 'Styles the description with either a light or dark theme.',
    type: 'string',
    required: false,
    options: ['light', 'dark'],
    testValue: 'light',
  },
  gradientSide: {
    description:
      'Side that the gradient will appear on. (update to correct nomenclature)',
    type: 'string',
    control: { type: 'text' },
    testValue: 'left',
  },
  url: {
    type: 'string',
    description: 'URL for the featured video. [Host] links are supported.',
    required: true,
  },
  description: {
    type: 'string',
    description: 'Text describing the video.',
  },
  solution: {
    type: 'string',
    description: 'Solution theme to apply to the gradient.',
    options: ['infrastructure', 'security', 'networking', 'applications'],
  },
}
