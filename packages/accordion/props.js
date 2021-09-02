module.exports = {
  heading: {
    type: 'String',
    description:
      'the text for the `<h2>` that precedes your expandable elements',
    required: false,
  },
  className: {
    type: 'string',
    description: 'Optional className to add to the root element',
  },
  items: {
    type: 'Array',
    description: 'an array of your expandable `<AccordionElement>` items',
    required: true,
    properties: [
      {
        type: 'object',
        properties: {
          heading: {
            type: 'string',
            description: 'the title and heading of the accordion element',
          },
          content: {
            type: 'string|React.Element',
            description:
              'content within the expandable area - can be a string or jsx content',
          },
        },
      },
    ],
  },
}
