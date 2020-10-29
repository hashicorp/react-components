module.exports = {
  src: {
    description: 'Serialized SVG string to render',
    type: 'string',
    control: { type: 'json' },
    testValue:
      '<svg viewBox="0 0 300 200">\n  <rect width="100%" height="100%" fill="#000000" />\n  <circle cx="150" cy="100" r="80" fill="#1563ff" />\n  <text x="150" y="125" font-size="60" text-anchor="middle" fill="#ffffff">SVG</text>\n</svg>',
    required: true,
  },
}
