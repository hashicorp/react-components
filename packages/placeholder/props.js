module.exports = {
  children: {
    type: 'function',
    description:
      'Render prop used to render the placeholder layout. The function accepts a single argument, which is the renderable placeholder component.',
    required: true,
  },
  className: {
    type: 'string',
    description: 'class to be passed to the wrapping element.',
  },
}
