const introProps = require('../intro/props')
const authorBylineProps = require('../author-byline/props')

module.exports = {
  appearance: {
    type: 'string',
    description: 'Display the component on light or dark backgrounds.',
    options: ['light', 'dark'],
  },
  contentSide: {
    description:
      'Side that content will appear on. (update to correct nomenclature)',
    type: 'string',
    control: { type: 'text' },
    testValue: 'left',
  },
  heading: introProps.heading,
  description: introProps.description,
  author: {
    type: 'object',
    description: 'Details about the video author.',
    properties: authorBylineProps,
  },
  // TODO Move props into <InlineVideo /> and import from there
  video: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'URL for the featured video. [Host] links are supported.',
        required: true,
      },
      description: {
        type: 'string',
        description: 'Description for the video.',
      },
    },
  },
}
