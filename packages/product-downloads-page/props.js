const baseProps = require('../../props.js')

module.exports = {
  pageTitle: {
    type: 'string',
    description:
      "Override the default constructed page title. Useful if the download page is for a non-product release asset, such as Vagrant's vmware utility.",
  },
  releases: {
    type: 'object',
    description: 'API response from releases endpoint',
    required: true,
  },
  packageManagersOverrides: {
    type: 'array',
    description:
      'object containing array of package managers (and associated commands), grouped by OS',
    required: true,
    properties: [
      {
        type: 'object',
        properties: {
          label: {
            type: 'string',
            description: 'human readable name of the package manager',
          },
          url: {
            type: 'string',
            description:
              'package manager informational link url, used in release information section',
          },
          commmands: {
            type: 'array',
            description:
              'array of commands. each array index is rendered on a new line',
          },
          os: {
            type: 'string',
            description: 'which operating system this package manager is for',
            options: [
              'darwin',
              'freebsd',
              'openbsd',
              'netbsd',
              'archlinux',
              'linux',
              'windows',
            ],
          },
        },
      },
    ],
  },
  showPackageManagers: {
    type: 'boolean',
    description:
      'defaults to `true`, if set to `false` it will hide all package manager information',
    default: true,
  },
  product: {
    ...baseProps.product,
    testValue: 'waypoint',
    required: true,
  },
  changelog: {
    type: 'string',
    description: 'custom changelog URL',
  },
  latestVersion: {
    type: 'string',
    description: 'latest version of the product',
    testValue: '0.1.0',
    required: true,
  },
  tutorialLink: {
    type: 'object',
    description: 'link to the product tutorial',
    properties: {
      href: {
        type: 'string',
        description: 'location of the link',
      },
      label: {
        type: 'string',
        description: 'link text',
      },
    },
  },
  merchandisingSlot: {
    type: 'React.Element',
    description: 'component to be rendered underneath the downloader cards',
  },
  logo: {
    type: 'React.Element',
    description: 'product logo',
    required: true,
  },
  getStartedLinks: {
    type: 'array',
    description: 'links in the "Get Started" section',
    properties: [
      {
        type: 'object',
        properties: {
          href: {
            type: 'text',
            description: 'location of the link',
          },
          label: {
            type: 'string',
            description: 'link text',
          },
        },
      },
    ],
  },
  getStartedDescription: {
    type: 'string',
    description: 'description of the "Get Started" section',
  },
  containers: {
    type: 'array',
    description: 'links to package containers',
    properties: [
      {
        type: 'object',
        properties: {
          href: {
            type: 'string',
            description: 'location of the link',
          },
          label: {
            type: 'string',
            description: 'link text',
          },
        },
      },
    ],
  },
  tutorials: {
    type: 'array',
    description: 'links to tutorials',
    properties: [
      {
        type: 'object',
        properties: {
          href: {
            type: 'text',
            description: 'location of the link',
          },
          label: {
            type: 'string',
            description: 'link text',
          },
        },
      },
    ],
  },
}
