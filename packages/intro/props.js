module.exports = {
  eyebrow: {
    type: 'string',
    description: '',
  },
  heading: {
    required: true,
    type: 'string',
    description: '',
  },
  headingElement: {
    type: 'string',
    description: '',
    options: ['h1', 'h2', 'h3', 'h4'],
  },
  headingSize: {
    type: 'number',
    description: '',
    options: [1, 2, 3],
  },
  description: {
    required: true,
    type: 'string',
    description: '',
  },
}
