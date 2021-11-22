const docsSidenavProps = require('../docs-sidenav/props')
const versionSelectProps = require('../version-select/props')
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
    testValue: { name: 'Terraform', slug: sharedProps.product.testValue },
  },
  baseRoute: {
    type: 'string',
    required: true,
    description:
      'The path this page is rendering under, for example `"docs"` or `"api-docs"`. Passed directly to the `baseRoute` prop of `@hashicorp/react-docs-sidenav`.',
    testValue: 'docs',
  },
  showEditPage: {
    type: 'boolean',
    description:
      'If `true`, an `Edit this page` link will appear on the bottom right of each page.',
    default: true,
  },
  showVersionedDocs: {
    type: 'boolean',
    description:
      'If `true`, a version select option will be displayed. Defaults to `process.env.ENABLE_VERSIONED_DOCS === "true"`',
    default: null,
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
      githubFileUrl: {
        type: 'string',
        description:
          "A link to the page's associated `.mdx` file on GitHub. Used for the `Edit this page` link.",
        testValue: `https://github.com/hashicorp/vault/blob/master/website/content/docs/agent/autoauth/methods/aws.mdx`,
      },
      mdxSource: {
        type: 'object',
        description:
          "Data returned from running `next-mdx-remote/serialize` on the page's `.mdx` file contents.",
        required: true,
        // In `react-components`, this overwritten in [[...swingset]].jsx
        testValue: {
          compiledSource: null,
          scope: null,
        },
      },
      frontMatter: {
        type: 'object',
        required: true,
        description: "Frontmatter object parsed from the page's `.mdx` file.",
        properties: {
          canonical_url: {
            type: 'string',
            description:
              'Optional canonical URL. Passed directly to [@hashicorp/react-head](/?component=Head).',
          },
          description: {
            type: 'string',
            description:
              'Used for the `<meta name="description" />`. Passed directly to [@hashicorp/react-head](/?component=Head).',
            required: true,
            testValue: 'Test description',
          },
          page_title: {
            type: 'string',
            description:
              'Used to construct the meta `<title />` tag, then passed to [@hashicorp/react-head](/?component=Head).',
            required: true,
            testValue: 'Test Page',
          },
        },
        testValue: {},
      },
      currentPath: docsSidenavProps.currentPath,
      navData: docsSidenavProps.navData,
      versions: versionSelectProps.versions,
    },
    testValue: {},
  },
}
