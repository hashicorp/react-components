const textSplitProps = require('../text-split/props')

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
    properties: {
      code: {
        type: 'string',
        description: 'A whitespace-sensitive string of code',
      },
      prefix: {
        type: 'string',
        description: 'Add decoration to the beginning of each line',
        options: ['numbered', 'dollar', 'terminal'],
      },
      language: {
        type: 'string',
        description: 'Used syntax highlighting',
        options: [
          'bash',
          'ebnf',
          'go',
          'hcl',
          'javascript',
          'sentinel',
          'shell',
        ],
      },
    },
  },
  chrome: {
    type: 'boolean',
    description: 'If `true`, show a window-chrome bar above the code block',
  },
}
