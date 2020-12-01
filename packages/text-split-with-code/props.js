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
        required: true,
        description:
          'A string of highlighted HTML elements. These elements will be rendered into a `<pre><code>` container.',
      },
      language: {
        type: 'options',
        options: ['ebnf', 'go', 'hcl', 'javascript', 'shell'],
        description:
          'Used for the `code` element\'s `class="language-*"`, for compatibility with language-specific highlight styles in [our shared Prism stylesheet](https://github.com/hashicorp/nextjs-scripts/blob/master/prism/style.css). This prop should be identical to the value used to generated the highlighted `code` prop.',
      },
      options: {
        type: 'object',
        description:
          'Additional options that enable supplementary `code-block` features.',
        properties: {
          showWindowBar: {
            type: 'boolean',
            description:
              'Set to `true` to display a window chrome bar UI above the code block.',
          },
          showClipboard: {
            type: 'boolean',
            description:
              'Set to `true` to show the copy-to-clipboard prompt and functionality.',
          },
        },
      },
    },
  },
}
