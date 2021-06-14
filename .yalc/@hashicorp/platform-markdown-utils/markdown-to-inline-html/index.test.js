const markdownToInlineHtml = require('.')

test('returns an empty string for an empty markdown string', async () => {
  const markdown = ''
  const expected = ''
  const result = await markdownToInlineHtml(markdown)
  expect(result).toBe(expected)
})

test('throws an error if multiple paragraphs are passed', async () => {
  const markdown = 'Hello world!\n\nThis is multiple paragraphs.'
  await expect(markdownToInlineHtml(markdown)).rejects.toThrow()
})

test('throws an error if elements not interpreted as paragraphs are used', async () => {
  const markdownHeading = '### Hello world! This is a heading.'
  await expect(markdownToInlineHtml(markdownHeading)).rejects.toThrow()
  const markdownListItem = '- Hello world! this is a list item'
  await expect(markdownToInlineHtml(markdownListItem)).rejects.toThrow()
})

test('returns a basic example', async () => {
  const markdown = 'This is some **markdown** that I wrote _just now_.'
  const expected =
    'This is some \n<strong>markdown</strong>\n that I wrote \n<em>just now</em>\n.'
  const result = await markdownToInlineHtml(markdown)
  expect(result).toBe(expected)
})
