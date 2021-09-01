module.exports = {
  children: {
    type: 'function',
    description:
      'Render prop for the page area. All visible elements on the page, except for the footer, should be rendered as children of Min100Layout.',
    required: true,
  },
  className: {
    type: 'function',
    description:
      'Optional className to pass to the root element. The root element always has a height of 100vh or greater. Styling such as page background coloration likely belongs on the root element.',
  },
  footer: {
    type: 'function',
    description:
      'Render prop for the footer area. This area will be displayed at the bottom of the page, regardless of the height of the page area.',
    required: true,
  },
}
