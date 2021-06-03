import splitTextNode from './split-text-node'

it('returns a string without newlines as a single-element array', () => {
  expect(splitTextNode('hello')).toMatchObject(['hello'])
})

it('returns a single newline as a single-element array', () => {
  expect(splitTextNode('\n')).toMatchObject(['\n'])
})

it('returns a basic example', () => {
  expect(splitTextNode('hello\nworld')).toMatchObject(['hello', '\n', 'world'])
})

it('handles cases that start with newlines', () => {
  expect(splitTextNode('\nhello\nworld')).toMatchObject([
    '\n',
    'hello',
    '\n',
    'world',
  ])
})

it('handles cases that end with newlines', () => {
  expect(splitTextNode('hello\nworld\n')).toMatchObject([
    'hello',
    '\n',
    'world',
    '\n',
  ])
})

it('handles cases with consecutive newlines', () => {
  expect(splitTextNode('\n\nhello\n\nworld\n\n')).toMatchObject([
    '\n',
    '\n',
    'hello',
    '\n',
    '\n',
    'world',
    '\n',
    '\n',
  ])
})
