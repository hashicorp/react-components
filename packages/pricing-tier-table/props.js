module.exports = {
  columns: {
    type: 'array',
    description:
      'Array of strings used for the column headers. If the first column header is blank, use an empty string',
  },
  rows: {
    type: 'array',
    required: true,
    properties: [
      {
        type: 'object',
        properties: {
          heading: {
            type: 'string',
            description: 'Html string used as row heading in first column',
            required: true,
          },
          isCollapsible: {
            type: 'boolean',
            description: 'Controls collapsibility of row',
            default: false,
          },
          cells: {
            type: 'array',
            description:
              'Array of html string or boolean items. If boolean, check or x-circle flight icon will be rendered',
            required: true,
          },
        },
      },
    ],
  },
}
