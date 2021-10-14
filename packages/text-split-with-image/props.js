const textSplitProps = require('../text-split/props')
const imageProps = require('../image/props')

module.exports = {
  textSplit: {
    type: 'object',
    description: 'Data sent to the TextSplit component',
    required: true,
    properties: textSplitProps,
  },
  image: {
    type: 'object',
    description: 'Data passed to the Image component',
    required: true,
    properties: imageProps,
  },
  className: {
    type: 'string',
    description:
      'Optional className to add to the root element of the TextSplit. If textSplit.className is provided, it will override this prop.',
  },
}
