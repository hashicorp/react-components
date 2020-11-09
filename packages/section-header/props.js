module.exports = {
  headline: {
    type: 'string',
    description: 'The primary headline.',
    testValue: 'Lorem ipsum dolor sit amet.',
  },
  description: {
    type: 'string',
    description: 'A smaller line of text below the headline.',
    testValue:
      'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
  },
  useH1: {
    type: 'boolean',
    description: 'Whether to make the headline an h1 or h2.',
    testValue: true,
  },
}
