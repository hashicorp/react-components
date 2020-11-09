module.exports = {
  product: {
    type: 'string',
    description: 'Name of the current product for color theming',
    testValue: 'default',
    options: [
      'default',
      'nomad',
      'consul',
      'terraform',
      'packer',
      'vagrant',
      'red',
      'blue',
    ],
  },
  currentPage: {
    type: 'string',
    description:
      'Path to the current page, used to select the currently active page.',
    testValue: '/docs/agent/autoauth/methods/aws',
  },
  category: {
    type: 'string',
    description: 'Top level navigation category, for example docs, api, etc.',
    testValue: 'docs',
  },
  disableFilter: {
    type: 'boolean',
    description: 'If true, disable the sidebar filter input',
    testValue: false,
  },
  order: {
    type: 'object',
    description: 'user-defined navigation configuration object',
    testValue: [
      {
        category: 'agent',
        content: [
          {
            category: 'autoauth',
            content: [
              {
                category: 'methods',
                content: [
                  { title: 'External Link', href: 'https://google.com' },
                  'alicloud',
                  'aws',
                  'azure',
                  '----------',
                  'gcp',
                  'jwt',
                  'kubernetes',
                ],
              },
              {
                category: 'sinks',
                content: ['file'],
              },
              'aws',
            ],
          },
          // { category: 'test' },
          {
            category: 'no-index-test',
            name: 'No Index Category',
            content: ['foo'],
          },
          {
            category: 'only-index-test',
            content: [],
          },
          // { category: 'only-index-no-content' }
        ],
      },
    ],
  },
  data: {
    type: 'array',
    description:
      'array of frontmatter data objects from all pages that need to be displayed within the nav',
    properties: [
      {
        type: 'object',
        properties: {
          __resourcePath: { type: 'string' },
          page_title: { type: 'string' },
          sidebar_title: { type: 'string' },
        },
      },
    ],
    testValue: [
      {
        __resourcePath: 'docs/agent/autoauth/methods/gcp.mdx',
        page_title: 'Vault Agent Auto-Auth GCP Method',
        sidebar_title: '<code>GCP</code>',
      },
      {
        __resourcePath: 'docs/agent/autoauth/methods/index.mdx',
        page_title: 'Vault Agent Auto-Auth Methods',
        sidebar_title: 'Methods',
      },
      {
        __resourcePath: 'docs/agent/autoauth/methods/aws.mdx',
        page_title: 'Vault Agent Auto-Auth AWS Method',
        sidebar_title: '<code>AWS</code>',
        sidebar_current: 'docs-agent-autoauth-methods-aws',
      },
      {
        __resourcePath: 'docs/agent/autoauth/methods/kubernetes.mdx',
        page_title: 'Vault Agent Auto-Auth Kubernetes Method',
        sidebar_title: 'Kubernetes',
      },
      {
        __resourcePath: 'docs/agent/autoauth/methods/azure.mdx',
        page_title: 'Vault Agent Auto-Auth Azure Method',
        sidebar_title: 'Azure',
      },
      {
        __resourcePath: 'docs/agent/autoauth/methods/alicloud.mdx',
        page_title: 'Vault Agent Auto-Auth AliCloud Method',
        sidebar_title: 'AliCloud',
      },
      {
        __resourcePath: 'docs/agent/autoauth/methods/jwt.mdx',
        page_title: 'Vault Agent Auto-Auth JWT Method',
        sidebar_title: 'JWT',
      },
      {
        __resourcePath: 'docs/agent/autoauth/index.mdx',
        page_title: 'Vault Agent Auto-Auth',
        sidebar_title: 'Auto-Auth',
      },
      {
        __resourcePath: 'docs/agent/autoauth/sinks/file.mdx',
        page_title: 'Vault Agent Auto-Auth File Sink',
        sidebar_title: 'File',
      },
      {
        __resourcePath: 'docs/agent/autoauth/sinks/index.mdx',
        page_title: 'Vault Agent Auto-Auth Sinks',
        sidebar_title: 'Sinks',
      },
      {
        __resourcePath: 'docs/agent/index.mdx',
        page_title: 'Vault Agent',
        sidebar_title: 'Vault Agent',
      },
      {
        __resourcePath: 'docs/agent/test/index.mdx',
        page_title: 'Test Item',
      },
      {
        __resourcePath: 'docs/agent/no-index-test/foo.mdx',
        page_title: 'Foo Item',
      },
      {
        __resourcePath: 'docs/agent/autoauth/aws.mdx',
        page_title: '<code>AWS</code>',
      },
      {
        __resourcePath: 'docs/agent/only-index-test/index.mdx',
        page_title: 'Only Index Test <sup>ENT</sup>',
      },
      {
        __resourcePath: 'docs/agent/only-index-no-content/index.mdx',
        page_title: 'Only Index No Content <sup>ENT</sup>',
      },
    ],
  },
}
