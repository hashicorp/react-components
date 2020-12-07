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
    description:
      'Data passed to the LogoGrid component. Can also be a string which is mapped to a company logo.',
    required: true,
    properties: [
      {
        type: 'string',
        description:
          'a string representing a company in our default asset library',
        options: Object.keys(dictionarySvgColor.default),
      },
      {
        type: 'object',
        description: 'a custom company image',
        properties: Object.assign({}, imageProps, {
          hasWhitespace: {
            type: 'boolean',
            description:
              'set this to `true` if the image has built in whitespace surrounding it ',
          },
        }),
      },
    ],
  },
}
