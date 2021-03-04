const docsSidenavProps = require('../docs-sidenav/props')
const sharedProps = require('../../props')

module.exports = {
  product: {
    type: 'string',
    required: true,
    description:
      'The `name` and `slug` of the product this page is being rendered for. The `slug` is used for the `Edit this page` link.',
    properties: {
      name: {
        type: 'string',
        required: true,
        description:
          'Human-readable proper case product name. Used for the page `<title />` and `og:site_name`.',
      },
      slug: sharedProps.product,
    },
  },
  baseRoute: {
    type: 'string',
    required: true,
    description:
      'The path this page is rendering under, for example `"docs"` or `"api-docs"`. Passed directly to the `baseRoute` prop of `@hashicorp/react-docs-sidenav`. Also used for the `Edit this page` link.',
  },
  mainBranch: {
    type: 'string',
    description:
      'The default branch of the project being documented, typically either "master" or "main". Used for the `Edit this page` link.',
    default: 'main',
  },
  showEditPage: {
    type: 'boolean',
    description:
      'If `true`, an `Edit this page` link will appear on the bottom right of each page.',
    default: true,
  },
  additionalComponents: {
    type: 'object',
    description:
      'Object containing additional components to be made available within mdx pages. Uses the format `{ [key]: Component }`, for example, `{ TestComponent: () => <p>hello world</p> }`',
  },
  staticProps: {
    type: 'object',
    required: true,
    description:
      'Directly pass the return value of `server/generateStaticProps` in here.',
    properties: {
      mdxSource: {
        type: 'object',
        required: true,
        description:
          "Data returned from running `next-mdx-remote/render-to-string` on the page's isolated `.mdx` file contents.",
      },
      frontmatter: {
        type: 'object',
        required: true,
        description: "Frontmatter object parsed from the page's `.mdx` file.",
        properties: {
          canonicalUrl: {
            type: 'string',
            description:
              'Optional canonical URL. Passed directly to [@hashicorp/react-head](/?component=Head).',
          },
          description: {
            type: 'string',
            description:
              'Used for the `<meta name="description" />`. Passed directly to [@hashicorp/react-head](/?component=Head).',
            required: true,
          },
          pageTitle: {
            type: 'string',
            description:
              'Used to construct the meta `<title />` tag, then passed to [@hashicorp/react-head](/?component=Head).',
            required: true,
          },
        },
      },
      currentPath: docsSidenavProps.currentPath,
      navData: docsSidenavProps.navData,
    },
  },
}
