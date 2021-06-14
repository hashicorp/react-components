const unified = require('unified')
const parse = require('rehype-parse')
const stringify = require('rehype-stringify')
const rehypePrism = require('@mapbox/rehype-prism')
const escapeHtmlTags = require('./escape-html-tags')

/**
 * Transforms a string of code into highlighted HTML, using rehypePrism
 * @param {string} code - A string of code
 * @param {string} language - Language used to determine highlighting. Note that language options come from [`refractor`](https://github.com/wooorm/refractor#syntaxes).
 */
async function highlightString(code, language) {
  //  We need rehype to know our string of code has a role
  //  of "code" in a larger document or document fragment.
  //  One way to do this is to use the rehype-dom-parse parser,
  //  since we only need HTML fragments, not the whole document.
  //
  //  With this in mind, we need the code block to wrapped
  //  in <pre> and <code>, so it's a valid HTML fragment.
  //
  //  Also, rehype-prism will skip code blocks that don't have
  //  a language-* class, so we need to add that as well
  const langClass = `class="language-${language}"`
  const escapedCode = escapeHtmlTags(code)
  const htmlInput = `<pre><code ${langClass}>${escapedCode}</code></pre>`
  //  Set up the unified processor
  //  Note:  the `ignoreMissing` means unsupported or undefined
  //  languages will result in un-highlighted code being returned
  //  unmodified. This seems preferable to throwing an error,
  //  and we're generally just trying to mirror the approach
  //  taken in our default config in "../../index.js"
  const processor = unified()
    .use(parse, { fragment: true })
    .use(rehypePrism, { ignoreMissing: true })
    .use(stringify)
    .data('settings', { fragment: true })
  //  Process our constructed HTML input
  const htmlOutput = String(await processor.process(htmlInput))
  //  Our htmlOutput is the nice highlighted code elements we want,
  //  but they're wrapped in extraneous <pre> and <code> elements.
  //  We need to remove these.
  //
  //  Note that per rehype-prism's docs, both <pre> and <code>
  //  opening tags will have the language-* class attached to them.
  //  Ref: https://github.com/mapbox/rehype-prism#faq
  const codeHtml = htmlOutput
    .replace(`<pre ${langClass}><code ${langClass}>`, '')
    .replace(`</code></pre>`, '')
  return codeHtml
}

module.exports = highlightString
