const buttonProps = require('../button/props')

module.exports = {
  heading: {
    type: 'string',
    description: 'headline above the text content',
  },
  content: {
    type: 'function | string',
    description:
      'Content to be shown under the `heading`. Accepts either a `string` or `React` content. If a `string` is passed, it will be rendered into paragraph tags. Each newline in the string will create a new paragraph.',
  },
  theme: {
    type: 'string',
    options: ['light', 'dark', 'gray'],
    default: 'light',
  },
  product: Object.assign(buttonProps.theme.properties.brand, {
    default: 'hashicorp',
  }),
  checkboxes: {
    type: 'array',
    description:
      'A set of checked-off checkbox images typically used as a bulleted list to describe a set of features',
    properties: [
      {
        type: 'string',
        description: 'text displayed to the right of the check',
      },
    ],
  },
  links: {
    type: 'array',
    description: 'call-to-action links to be displayed below the text',
    properties: [
      {
        type: 'object',
        properties: {
          text: { type: 'string', description: 'link text' },
          url: { type: 'string', description: 'link URL' },
          type: { type: 'string', options: ['inbound', 'outbound', 'anchor'] },
        },
      },
    ],
  },
  linkStyle: {
    type: 'string',
    description: 'styling for the links, can be as links or buttons',
    options: ['links', 'buttons'],
    default: 'links',
  },
  textSide: {
    type: 'string',
    options: ['left', 'right'],
    default: 'left',
  },
  children: {
    type: 'React.Element',
    description:
      'Children are displayed opposite the text block and can be any arbitrary react code. If using a code example, image, or logo grid, we recommend using the pre-set components for that seen below.',
  },
  className: {
    type: 'string',
    description: 'Optional className to add to the root element',
  },
}
