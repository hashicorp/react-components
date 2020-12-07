const textSplitProps = require('../text-split/props')
const codeBlockProps = require('../code-block/props')
const imageProps = require('../image/props')
const logoGridProps = require('../text-split-with-logo-grid/props').logoGrid

module.exports = {
  textSplits: {
    type: 'object',
    description:
      'An array of text split entries. Each entry should have a `textSplit` property, which should consist of props for `<TextSplit />`. It should also have one of `codeBlock`, `image`, or `logoGrid` properties, which will be passed to the corresponding `text-split-with-*` component.',
    properties: [
      {
        type: 'object',
        description:
          'Array entry to pass to the `<TextSplitWith* />` component.',
        properties: {
          textSplit: {
            type: 'object',
            description: 'Props for the `<TextSplit />` part.',
            properties: textSplitProps,
          },
          codeBlock: {
            type: 'object',
            description:
              'If used, will render a `<TextSplitWithCodeBlock />`, and pass these props to `codeBlock`.',
            properties: codeBlockProps,
          },
          image: {
            type: 'object',
            description:
              'If used, will render a `<TextSplitWithImage />`, and pass these props to `image`.',
            properties: imageProps,
          },
          logoGrid: {
            type: 'object',
            description:
              'If used, will render a `<TextSplitWithLogoGrid />`, and pass these props to `logoGrid`.',
            properties: logoGridProps.properties,
          },
        },
      },
    ],
  },
}
