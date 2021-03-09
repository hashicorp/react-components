const docsPageProps = require('../docs-page/props')

module.exports = {
  product: {
    type: 'object',
    description: 'Name and slug of the product this page is being rendered for',
    properties: {
      name: {
        type: 'string',
        description: 'Human-readable proper case product name',
      },
      slug: {
        type: 'string',
        description: 'HashiCorp product slug',
        control: { type: 'select' },
        options: [
          'hashicorp',
          'boundary',
          'consul',
          'nomad',
          'packer',
          'terraform',
          'vault',
          'vagrant',
          'waypoint',
        ],
      },
    },
  },
  additionalComponents: {
    type: 'object',
    description:
      'Object containing additional components to be made available within mdx pages. Uses the format { [key]: Component }, for example, `{ TestComponent: () => <p>hello world</p> }`',
  },
  showEditPage: {
    type: 'boolean',
    description:
      'if true, an "edit this page" link will appear on the bottom right',
    default: true,
  },
  staticProps: {
    type: 'object',
    description:
      'Directly pass the return value of `server/generateStaticProps` in here.',
    properties: {
      terms: {
        type: 'array',
        description:
          'A list of glossary terms, passed to `<GlossaryTableOfContents />`',
        properties: [
          {
            type: 'object',
            description: 'A glossary term item',
            properties: {
              slug: {
                type: 'string',
                description:
                  "The term's slug, used to construct an anchor link",
              },
              title: {
                type: 'string',
                description:
                  "The term's title, used to label an anchor link to the term",
              },
            },
          },
        ],
      },
      githubFileUrl: docsPageProps.staticProps.properties.githubFileUrl,
      mdxSource: docsPageProps.staticProps.properties.mdxSource,
      navData: docsPageProps.staticProps.properties.navData,
    },
  },
}
