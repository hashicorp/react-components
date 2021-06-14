const markdownDefaults = require('.').default

test('mdx options default', () => {
  const opts = markdownDefaults()
  expect(opts.remarkPlugins).toHaveLength(4)
  expect(opts.remarkPlugins[0][0].name).toBe('includeMarkdownPlugin')
  expect(opts.remarkPlugins[1][0].name).toBe('anchorLinksPlugin')
  expect(opts.remarkPlugins[2].name).toBe('paragraphCustomAlertsPlugin')
  expect(opts.remarkPlugins[3][0].name).toBe('typographyPlugin')
  expect(opts.rehypePlugins[0][0].name).toBe('')
})

test('mdx options with custom plugins & options', () => {
  const opts = markdownDefaults({
    addRemarkPlugins: [function foo() {}],
    addRehypePlugins: [function bar() {}],
    resolveIncludes: 'foo',
    enableMath: true,
  })

  expect(opts.remarkPlugins[0][0].name).toBe('includeMarkdownPlugin')
  expect(opts.remarkPlugins[0][1].resolveFrom).toBe('foo')
  expect(opts.remarkPlugins[1][0].name).toBe('anchorLinksPlugin')
  expect(opts.remarkPlugins[2].name).toBe('paragraphCustomAlertsPlugin')
  expect(opts.remarkPlugins[3][0].name).toBe('typographyPlugin')
  expect(opts.remarkPlugins[4].name).toBe('foo')
  expect(opts.remarkPlugins[5].name).toBe('math')
  expect(opts.rehypePlugins[0][0].name).toBe('')
  expect(opts.rehypePlugins[1].name).toBe('bar')
  expect(opts.rehypePlugins[2].name).toBe('rehypeKatex')
})
