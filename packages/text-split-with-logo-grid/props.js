const textSplitProps = require('../text-split/props')
const imageProps = require('../image/props')

module.exports = {
  textSplit: {
    type: 'object',
    description: 'Data sent to the TextSplit component',
    required: true,
    properties: textSplitProps,
  },
  logoGrid: {
    type: 'object ',
    description: 'An array of `logoGrid` items.',
    required: true,
    properties: [
      {
        type: 'object',
        description:
          'Object option for a `logoGrid` array item. Note `url` must be present for the item to render. Properties are listed below.',
        properties: Object.assign(
          {
            url: {
              type: 'string',
              description: 'The path to the logo source',
            },
            alt: { type: 'string', description: 'Alt Text for the logo' },
            linkUrl: {
              type: 'string',
              description: 'A url to which the logo grid item should link',
            },
          },
          imageProps
        ),
      },
    ],
  },
}
