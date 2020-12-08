const textSplitProps = require('../text-split/props')
const imageProps = require('../image/props')
const dictionarySvgColor = require('@hashicorp/mktg-assets/dist/companies/dictionary-svgr-color')

module.exports = {
  textSplit: {
    type: 'object',
    description: 'Data sent to the TextSplit component',
    required: true,
    properties: textSplitProps,
  },
  logoGrid: {
    type: 'object | string',
    description: 'An array of `logoGrid` items.',
    required: true,
    properties: [
      {
        type: 'string',
        description:
          'String option for a `logoGrid` array item. A shortcut for passing a `{ slug }` object. The string should be a valid company `slug`, as listed under `logoGrid[x].slug`.',
      },
      {
        type: 'object',
        description:
          'Object option for a `logoGrid` array item. Note that one of `slug` or `url` must be present for the item to render. Properties are listed below.',
        properties: Object.assign(
          {
            slug: {
              type: 'string',
              description:
                'A slug representing a company in our default asset library.',
              options: Object.keys(dictionarySvgColor.default),
            },
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
