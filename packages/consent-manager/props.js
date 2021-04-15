module.exports = {
  version: {
    type: 'string',
    description:
      'bump this number when services have changed to "reset" the consent manager and prompt for consent again',
  },
  privacyPolicyLink: {
    type: 'string',
    description: "a link to the company's privacy policy page",
  },
  cookiePolicyLink: {
    type: 'string',
    description: "a link to the company's cookie policy page",
  },
  segmentWriteKey: {
    type: 'string',
    description: 'segment.io write key',
  },
  utilServerRoot: {
    type: 'string',
    description:
      "root path of the instance of HashiCorp's `web-utility-server` to use. This is used to fetch integrations based on segment write key",
  },
  segmentServices: {
    type: 'array',
    description:
      'use this to override the category or description of a service provided by Segment',
    properties: [
      {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description:
              'name of the service - must exactly match the name returned from the segment API',
          },
          category: {
            type: 'string',
            description:
              'name of the category you want the integration to appear within - must match the name of a category defined in the `categories` prop',
          },
          description: {
            type: 'string',
            description:
              'description of the service, overrides the default description returned from segment',
          },
        },
      },
    ],
  },
  categories: {
    type: 'array',
    description:
      'categories in which various services reside. entire categories can be toggled on or off',
    properties: [
      {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description:
              'name of the category as it appears in the consent manager interface',
          },
          description: {
            type: 'string',
            description:
              'description of the category as it appears in the consent manager interface',
          },
        },
      },
    ],
  },
  additionalServices: {
    type: 'array',
    description:
      'Additional integrations outside of Segment that you wish to include in the consent manager can be added using this prop. They are injected using a `<script>` tag, which can be controlled via the props below.',
    properties: [
      {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description:
              'name of the integration as it appears in the interface',
          },
          description: {
            type: 'string',
            description:
              'description of the integration as it appears in the interface',
          },
          category: {
            type: 'string',
            description:
              'category the integration should be part of. must exactly match a category defined in the `categories` prop',
          },
          body: {
            type: 'string',
            description:
              'This and all the following props are optional. If adding a script, the contents of the script can be defined using this prop, and it will be dropped into a `<script>` tag on the page',
          },
          url: {
            type: 'string',
            description:
              'If linkng to a script that lives at a URL, the url can be defined using this prop and it will be loaded in via `<script>` tag',
          },
          async: {
            type: 'boolean',
            description:
              'If defining a script using `body` or `url`, setting this prop to `true` will add the `async` attribute to the script tag.',
          },
          addToBody: {
            type: 'boolean',
            description:
              'scripts are added to the `<head>` by default, but if this prop is set to `true` it will instead be added to `<body>`',
          },
          dataAttrs: {
            type: 'object',
            description:
              'this prop can be used to place data attributes on the script tag',
            properties: {
              name: {
                type: 'string',
                description:
                  'name of the data attribute - no need to prefix with `data-`',
              },
              value: {
                type: 'string',
                description: 'value of the data attrivute',
              },
            },
          },
        },
      },
    ],
  },
}
