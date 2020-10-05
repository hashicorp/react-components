const props = {}
props.default = [
  {
    name: 'version',
    type: 'string',
    description:
      'Version number - increment to override previous consent preferences and force the user to re-accept, if services have changed.',
    value: '0'
  },
  {
    name: 'showDialog',
    type: 'boolean',
    description: 'If set to true, the consent preferences dialog will open.',
    value: false
  },
  {
    name: 'segmentWriteKey',
    type: 'string',
    description:
      'Segment write key, used to fetch integrations. This is a public key by default, no security concerns here.',
    value: 'iyi06c432UL7SB1r3fQReec4bNwFyzkW'
  },
  {
    name: 'utilServerRoot',
    type: 'string',
    description:
      'Root URL of the web-utility-server to use. Default is staging, you can override with localhost if you wish',
    value: 'https://hashicorp-web-util-staging.herokuapp.com'
  },
  {
    name: 'privacyPolicyLink',
    type: 'string',
    description:
      'A link to the company privacy policy, to be displayed within the consent manager interface when relevant.',
    value: 'https://www.hashicorp.com/privacy'
  },
  {
    name: 'companyName',
    type: 'string',
    description:
      'Name of your company, to be displayed within the interface where relevant.',
    value: 'HashiCorp'
  },
  {
    name: 'segmentServices',
    type: 'array',
    description:
      'Set these options to override the category and/or description of a Segment-integrated service.',
    value: [
      {
        name:
          'Name of segment service - must be an exact match to the name segment provides',
        category: 'Example Category',
        description:
          'A short description of what the service is and how your company uses the data.'
      }
    ]
  },
  {
    name: 'additionalServices',
    type: 'array',
    description:
      'Any additional data-collecting scripts outside of Segment that you wish to include in the consent manager.',
    value: [
      {
        name: 'Name of the service',
        category: 'Example Category',
        description:
          'A short description of what the service is and how your company uses the data.',
        body:
          '// a chunk of javascript to add to the page if permission is granted\n// this is optional',
        url: 'http://www.an-optional-url-for-a-script-to-add-to-the-page.com'
      },
      {
        name: 'Name of the service',
        category: 'Example Category',
        description: 'A script with additional elements to be injected',
        body: '',
        url: 'https://source-url-of-script.com',
        async: true,
        addToBody: true,
        dataAttrs: [
          {
            name: 'test',
            value: 'foobar'
          }
        ]
      }
    ]
  },
  {
    name: 'categories',
    type: 'array',
    description:
      'List of categories to group services into, along with their descriptions.',
    value: [
      {
        name: 'Example Category',
        description: 'A short description of the category'
      }
    ]
  },
  {
    name: 'container',
    type: 'string',
    description:
      'An html selector that the consent manager will be injected into, if you are using the "init" method.',
    value: '#consent-manager'
  },
  {
    name: 'forceShow',
    type: 'boolean',
    description:
      "If set to true, the consent banner will show no matter what country you are in. Otherwise it will only show if you're in the EU.",
    value: true
  },
  {
    name: 'preferences',
    type: 'object',
    description: 'Consent preferences object',
    value: {}
  }
]

props.name = 'Consent Manager'
export default props
