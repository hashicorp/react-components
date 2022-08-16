module.exports = {
  features: {
    type: 'array',
    properties: [
      {
        type: 'object',
        properties: {
          heading: {
            type: 'string',
            required: true,
          },
          footnote: {
            type: 'string',
          },
          content: {
            type: 'object',
            description: 'Tabs or Table',
            properties: {
              tabs: {
                type: 'array',
                properties: [
                  {
                    type: 'object',
                    properties: {
                      label: {
                        type: 'object',
                        required: true,
                        properties: {
                          icon: {
                            type: 'React.ReactNode',
                            required: true,
                          },
                          heading: {
                            type: 'string',
                            required: true,
                          },
                        },
                      },
                      content: {
                        type: 'table',
                        required: true,
                        description: 'See rows & columns below',
                      },
                    },
                  },
                ],
              },
              columns: {
                type: 'array',
                description:
                  'Array of strings used for the column headers. If the first column header is blank, use an empty string',
              },
              rows: {
                type: 'array',
                properties: [
                  {
                    type: 'object',
                    properties: {
                      header: {
                        type: 'object',
                        properties: {
                          heading: {
                            type: 'string',
                            description:
                              'Suggested to use with RowHeaderHeading primitive component',
                            required: true,
                          },
                          content: {
                            type: 'string',
                            description:
                              'Suggested to use with RowHeaderContent primitive component',
                          },
                        },
                        required: true,
                      },
                      isCollapsible: {
                        type: 'boolean',
                        description: 'Controls collapsibility of row',
                        default: false,
                      },
                      cells: {
                        type: 'array',
                        properties: [
                          {
                            type: 'object | boolean',
                            properties: {
                              heading: {
                                type: 'string',
                                description:
                                  'Suggested to use with CellHeading primitive component',
                                required: true,
                              },
                              content: {
                                type: 'string',
                                description:
                                  'Suggested to use with CellContent primitive component',
                              },
                            },
                          },
                        ],
                        description:
                          'Array of objects or boolean items. If boolean, check or x-circle flight icon will be rendered',
                        required: true,
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    ],
  },
}
