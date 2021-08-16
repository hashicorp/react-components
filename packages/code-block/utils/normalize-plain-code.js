/**
 * Non-highlighted code in MDX needs to be tweaked
 * to work as expected with our code-block component.
 *
 * @param {*} codeChildren React element children, which may be a plain string
 * @returns
 */
function normalizePlainCode(codeChildren) {
  // Highlighted code is not a concern, we handle all related issues
  // with remark and rehype plugins in nextjs-scripts
  if (typeof codeChildren !== 'string') return codeChildren
  return (
    codeChildren
      // Non-highlighted code, which appears as a plain string in MDX,
      // seems to have an extra trailing newline. We remove it.
      .replace(/\n$/, '')
      // Non-highlighted code also needs to have its HTML
      // entities replaces, in order to prevent them from
      // being interpreted as HTML when we `dangerouslySetInnerHtml`
      // within the code-block component
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  )
}

export default normalizePlainCode
