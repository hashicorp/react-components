const textSplitProps = require('../text-split/props')
const codeBlockProps = require('../code-block/props')

module.exports = {
  textSplit: {
    type: 'object',
    description: 'Data sent to the TextSplit component',
    required: true,
    properties: textSplitProps,
  },
  codeBlock: {
    type: 'object',
    description: 'Data passed to the CodeBlock component',
    required: true,
    properties: codeBlockProps,
  },
}
