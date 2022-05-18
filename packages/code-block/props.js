module.exports = {
  className: {
    type: 'string',
    description:
      'A className string which will be added to the outer element of this component.',
  },
  code: {
    type: 'string',
    required: true,
    description:
      'A string of highlighted HTML or React elements. These elements will be rendered into a `<pre><code>` container.<br/><br/>A plain string can be passed, but it will not be highlighted.',
  },
  language: {
    type: 'string',
    description:
      'Used to set a global `"language-*"` `className` on both the `pre` and `code` element, for compatibility with language-specific highlight styles. This value should be identical to the `language` used to generate the highlighted `code`.',
  },
  theme: {
    type: 'string',
    options: ['light', 'dark'],
    default: 'light',
    description:
      'Sets the color theme for the code block. Intended to match light and dark system appearance, for example through CSS `@media (prefers-color-scheme)`.',
  },
  hasBarAbove: {
    type: 'boolean',
    description:
      'Intended for automatic use in CodeTabs, not meant as a consumer-facing prop. Set to `true` to remove border rounding from the top of the CodeBlock.',
  },
  onCopyCallback: {
    type: 'function',
    description:
      'Optional callback that is called when copy success state changes. Copy success state is `null` initially. When code is successfully copied using the "Copy" button, it changes to `true`. If there is an error when copying code, it changes to `false`. After a timeout set within the `clipboard-button` partial, the copy success state reverts to `null`.',
  },
  options: {
    type: 'object',
    description:
      'Additional options that enable supplementary `code-block` features.',
    properties: {
      showChrome: {
        type: 'boolean',
        description:
          'Set to `true` to display a window chrome bar UI above the code block.',
      },
      highlight: {
        type: 'string',
        description:
          'Specify line numbers to highlight. Supports a comma-separate list of numbers and number ranges, where number ranges are dash-separated pairs of numbers.<br/><br/>For example: `"5"` highlights line 5; `"2,5"` highlights lines 2 and 5; `"2-5"` highlights lines 2, 3, 4, and 5; `"2,6-8,11"` highlights line 2, 6, 7, 8 and 11.',
      },
      lineNumbers: {
        type: 'boolean',
        description:
          'Set to `true` to display line numbers on the left edge of the code block.',
      },
      showClipboard: {
        type: 'boolean',
        description:
          'Set to `true` to show the copy-to-clipboard prompt and functionality.',
      },
    },
  },
}
