module.exports = {
  items: {
    type: 'object',
    description: 'Data to be displayed as tabs',
    required: true,
    properties: {
      heading: { type: 'string', description: 'title of the tab' },
      tooltip: {
        type: 'string',
        description: 'optional tooltip to be displayed next to the tab title',
      },
      tabChildren: {
        type: 'function',
        description: 'render prop for content display, should return jsx',
      },
    },
  },
}
