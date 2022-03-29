module.exports = {
  textAlignment: {
    type: 'string',
    description: 'Controls the text alignment rendering.',
    options: ['left' | 'center'],
  },
  eyebrow: {
    type: 'string',
    description: 'Optional text displayed above the heading.',
  },
  heading: {
    required: true,
    type: 'string',
    description: 'Text displayed within the heading element.',
  },
  headingElement: {
    type: 'string',
    description: 'Controls which element the heading renders as.',
    options: ['h1', 'h2', 'h3', 'h4'],
  },
  headingSize: {
    type: 'number',
    description: 'Controls the size at which the heading is rendered.',
    options: [1, 2, 3],
  },
  description: {
    required: true,
    type: 'string',
    description: 'Text following the heading element.',
  },
}
