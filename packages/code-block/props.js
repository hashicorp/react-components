module.exports = {
  code: {
    type: 'string',
    description: 'A block of code to be displayed as an example',
  },
  prefix: {
    type: 'options',
    options: ['numbered', 'dollar', 'terminal'],
    description: 'A prefix appended to each line',
  },
  language: {
    type: 'options',
    options: ['ebnf', 'go', 'hcl', 'javascript', 'sentinel', 'shell'],
    description: 'A programming language to use for syntax highlighting',
  },
}
