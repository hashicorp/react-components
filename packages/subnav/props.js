const baseProps = require('../../props.js')

module.exports = {
  titleLink: {
    type: 'object',
    description:
      'Options for the primary logo/title link on the left side of the navigation',
    required: true,
    properties: {
      text: {
        type: 'string',
        description:
          "Passing a product slug to triggers a special case, where the product's logo and brand colors are used. Note that in other cases, it should be a string with proper casing.",
        options: [...baseProps.product.options, 'hcp', 'tfc'],
      },
      url: {
        type: 'string',
        description: 'A link applied to the product name or logo',
      },
    },
  },
  ctaLinks: {
    type: 'array',
    description:
      'An array of items to be displayed as buttons to the far right. There are special values for "Download" and "Github" if these are passed as the text.',
    properties: [
      {
        type: 'object',
        properties: {
          text: { type: 'string' },
          url: { type: 'string' },
          theme: {
            type: 'object',
            description:
              'An optional theme object, which will be passed to the Button element for this link, and will override and default settings in the component.',
          },
        },
      },
    ],
  },
  hideGithubStars: {
    type: 'boolean',
    description:
      'If `true`, will ensure GitHub stars are not shown in any `ctaLinks`, even if the special value `GitHub` is passed',
  },
  menuItems: {
    type: 'array',
    description: 'An array of links to be displayed as navigation menu items.',
    required: true,
    properties: [
      {
        type: 'string',
        options: ['divider'],
        description:
          'Using the string "divider" will render a vertical divider between items',
      },
      {
        type: 'object',
        description: 'This type will render a single link in the menu',
        properties: {
          text: { type: 'string' },
          url: { type: 'string' },
          type: { type: 'string', options: ['inbound', 'outbound', 'anchor'] },
        },
      },
      {
        type: 'object',
        description:
          'This type will render a dropdown menu with multiple links in the menu',
        properties: {
          text: { type: 'string' },
          submenu: {
            type: 'object',
            properties: {
              text: { type: 'string' },
              url: { type: 'string' },
              type: {
                type: 'string',
                options: ['inbound', 'outbound', 'anchor'],
              },
            },
          },
        },
      },
    ],
  },
  menuItemsAlign: {
    type: 'string',
    description: 'Controls alignment of menu bar items on Desktop',
    options: ['center', 'right'],
  },
  constrainWidth: {
    type: 'boolean',
    description: 'If true, will match the width of g-grid-container',
  },
  currentPath: {
    type: 'string',
    description:
      'The current active path relative to the root of the site. Will be matched to the `url` property of menuItems to determine the active page.',
  },
  Link: {
    type: 'React.Element',
    description:
      "The NextJS Link component to make client-side routing possible. Note that this is passed directly to @hashicorp/react-link-wrap, so we'll fall back to a normal <a/> tag if this prop is not provided.",
  },
  matchOnBasePath: {
    type: 'boolean',
    description:
      'Whether or not to highlight items if the base path matches the current URL. Defaults to `false`, requiring a full URL  match.',
  },
  className: {
    type: 'string',
    description: 'Optional className to add to the root element',
  },
}
