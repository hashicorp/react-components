module.exports = {
  theme: {
    type: 'string',
    description: 'Optional product color theme',
    control: { type: 'select' },
    options: [
      'vault',
      'consul',
      'nomad',
      'terraform',
      'vagrant',
      'packer',
      'waypoint',
      'boundary',
    ],
  },
  defaultTabIdx: {
    type: 'integer',
    description:
      'If set, the tab with the specified ID will be active by default. If not set or if the ID does not match, it will default to 0',
  },
  centered: {
    type: 'boolean',
    description:
      'If true, the tabs are centered in their container, rather than left-aligned',
    control: { type: 'checkbox' },
  },
  fullWidthBorder: {
    type: 'boolean',
    description:
      'If true, the border line underneath the tabs expands to the full width of the container, rather than being slightly padded from the edges',
    control: { type: 'checkbox' },
  },
  items: {
    type: 'object',
    description: 'Data to be displayed as tabs',
    required: true,
    properties: {
      heading: { type: 'string', description: 'Title of the tab' },
      tooltip: {
        type: 'string',
        description: 'Optional tooltip to be displayed next to the tab title',
      },
      tabChildren: {
        type: 'function',
        description: 'Render prop for content display, should return jsx',
      },
    },
  },
}
