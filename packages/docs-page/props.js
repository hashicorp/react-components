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
    testValue: { name: 'Terraform', slug: sharedProps.product.testValue },
  },
  baseRoute: {
    type: 'string',
    required: true,
    description:
      'The path this page is rendering under, for example `"docs"` or `"api-docs"`. Passed directly to the `baseRoute` prop of `@hashicorp/react-docs-sidenav`. Also used for the `Edit this page` link.',
    testValue: 'docs',
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
        description:
          "Data returned from running `next-mdx-remote/render-to-string` on the page's `.mdx` file contents.",
        required: true,
        testValue: {
          compiledSource:
            '"use strict";\n' +
            '\n' +
            'function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n' +
            '\n' +
            'function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n' +
            '\n' +
            'function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n' +
            '\n' +
            '/* @jsxRuntime classic */\n' +
            '\n' +
            '/* @jsx mdx */\n' +
            'var layoutProps = {};\n' +
            'var MDXLayout = "wrapper";\n' +
            '\n' +
            'function MDXContent(_ref) {\n' +
            '  var components = _ref.components,\n' +
            '      props = _objectWithoutProperties(_ref, ["components"]);\n' +
            '\n' +
            '  return mdx(MDXLayout, _extends({}, layoutProps, props, {\n' +
            '    components: components,\n' +
            '    mdxType: "MDXLayout"\n' +
            '  }), mdx("h1", { className: "g-type-display-2" }, "Example Page"), mdx("p", null, "This is a cool docs page!"));\n' +
            '}\n' +
            '\n' +
            ';\n' +
            'MDXContent.isMDXComponent = true;',
          renderedOutput:
            '<h1 className="g-type-display-2">Example Page</h1><p>This is a cool docs page!</p>',
          scope: {},
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
    },
    testValue: {},
  },
}
