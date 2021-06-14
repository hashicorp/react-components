const unified = require('unified')
const remarkParse = require('remark-parse')
const remarkRehype = require('remark-rehype')
const rehypeStringify = require('rehype-stringify')

/**
 * Transforms a string of inline markdown into a string of inline HTML
 *
 * @param {string} markdown - A string of markdown. Must only contain inline markdown elements. If block elements are detected, this function will throw an error.
 */
async function markdownToInlineHtml(markdown) {
  //  Configure a unified processor
  var processor = unified()
  //  Parse markdown to an [`mdast`](https://github.com/syntax-tree/mdast) syntax tree
  processor.use(remarkParse)
  // Throw an error if block elements are found
  processor.use(inlineElementsOnly)
  //  Parse the [`mdast`](https://github.com/syntax-tree/mdast) syntax tree
  //  into a [`hast`](https://github.com/syntax-tree/hast) syntax tree
  processor.use(remarkRehype)
  //  Transform the [`hast`](https://github.com/syntax-tree/hast) syntax tree
  //  into a string of HTML with rehype-stringify
  processor.use(rehypeStringify)
  //  Use our configured processor to get from markdown to HTML
  const htmlOutput = String(await processor.process(markdown))
  return htmlOutput
}

function inlineElementsOnly() {
  return function transformer(tree) {
    //  Ignore cases where we have an empty string (an empty tree)
    if (!tree.children || tree.children.length == 0) return
    //  Throw an error if there are multiple child elements at the root
    const hasMultipleChildren = tree.children.length > 1
    if (hasMultipleChildren)
      throw new Error('Please pass a markdown string without newlines.')
    //  Throw an error if the single child element is anything other than a paragraph
    const hasNonParagraphChild = tree.children[0].type !== 'paragraph'
    if (hasNonParagraphChild)
      throw new Error(
        'Please pass inline markdown elements only. Headings and other block elements cannot be processed.'
      )
    //  Flatten the children of the paragraph element onto the root of the tree
    //  These children are guaranteed to be inline elements, because paragraphs
    //  can only contain inline elements.
    const flatChildren = tree.children[0].children
    tree.children = flatChildren
  }
}

module.exports = markdownToInlineHtml
