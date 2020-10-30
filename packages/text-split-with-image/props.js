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
}
