const refractor = require('refractor')

module.exports = {
  code: {
    type: 'string',
    required: true,
    description:
      'A string of highlighted HTML or React elements. These elements will be rendered into a `<pre><code>` container. Note that a plain string can be passed, though it will not be highlighted.',
  },
  language: {
    type: 'options',
    description:
      'Used for the `code` element\'s `class="language-*"`, for compatibility with language-specific highlight styles in [our shared Prism stylesheet](https://github.com/hashicorp/nextjs-scripts/blob/master/prism/style.css). This value should be identical to the `language` used to generate the highlighted `code`. All [`refractor` languages](https://github.com/wooorm/refractor#syntaxes) are supported.',
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
}
