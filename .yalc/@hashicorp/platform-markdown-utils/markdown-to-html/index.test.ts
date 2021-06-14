import { Node } from 'unist'
import markdownToHtml from './'
import visit from 'unist-util-visit'

test('returns an empty string for an empty markdown string', async () => {
  const markdown = ''
  const expected = ''
  const result = await markdownToHtml(markdown)
  expect(result).toBe(expected)
})

test('returns a basic example, without plugins', async () => {
  const markdown = '### Hello world!\n\nThis is some markdown that I wrote.'
  const expected =
    '<h3>Hello world!</h3>\n<p>This is some markdown that I wrote.</p>'
  const result = await markdownToHtml(markdown)
  expect(result).toBe(expected)
})

test('returns a basic example using our default plugins', async () => {
  const markdown =
    '### Hello world!\n\nThis is some markdown that I wrote.\n\n!> Here be dragons. Proceed with caution!'
  const result = await markdownToHtml(markdown, { contentPlugins: true })
  expect(result).toMatchInlineSnapshot(`
    "<h3 class=\\"g-type-display-4\\"><a class=\\"__permalink-h\\" href=\\"#hello-world\\" aria-label=\\"hello world permalink\\">»</a><a class=\\"__target-h\\" id=\\"hello-world\\" aria-hidden></a>Hello world!</h3>
    <p class=\\"g-type-long-body\\">This is some markdown that I wrote.</p>
    <div class=\\"alert alert-danger g-type-body\\" role=\\"alert\\"><p class=\\"g-type-long-body\\">Here be dragons. Proceed with caution!</p></div>"
  `)
})

test('returns a basic example using typography plugin options', async () => {
  const markdown = '### Hello world!\n\nThis is some markdown that I wrote.'
  const pluginOptions = {
    typography: { map: { h3: 'g-type-label', p: 'g-type-body-small' } },
  }
  const result = await markdownToHtml(markdown, {
    contentPlugins: { pluginOptions },
  })
  expect(result).toMatchInlineSnapshot(`
    "<h3 class=\\"g-type-label\\"><a class=\\"__permalink-h\\" href=\\"#hello-world\\" aria-label=\\"hello world permalink\\">»</a><a class=\\"__target-h\\" id=\\"hello-world\\" aria-hidden></a>Hello world!</h3>
    <p class=\\"g-type-body-small\\">This is some markdown that I wrote.</p>"
  `)
})

test('returns a basic example using an additional remark plugin', async () => {
  const markdown = '### Hello world!\n\nThis is some markdown that I wrote.'

  function exampleRemarkPlugin() {
    return function transformer(tree: Node) {
      visit(tree, 'paragraph', (node) => {
        const data = node.data || (node.data = {})
        const props = (data.hProperties || (data.hProperties = {})) as Record<
          string,
          unknown
        >
        props.dataTestAttribute = 'some-value'
      })
    }
  }
  const result = await markdownToHtml(markdown, {
    contentPlugins: { addRemarkPlugins: [exampleRemarkPlugin] },
  })
  expect(result).toMatchInlineSnapshot(`
    "<h3 class=\\"g-type-display-4\\"><a class=\\"__permalink-h\\" href=\\"#hello-world\\" aria-label=\\"hello world permalink\\">»</a><a class=\\"__target-h\\" id=\\"hello-world\\" aria-hidden></a>Hello world!</h3>
    <p class=\\"g-type-long-body\\" data-test-attribute=\\"some-value\\">This is some markdown that I wrote.</p>"
  `)
})
