import shellwords from 'shellwords'

/**
 * @TODO
 *
 * Assess whether we might be able to modify our
 * workflow around processing snippets, based on
 * the fact we have a `shell-session` highlight language,
 * and that all `shell-symbols` should therefore be already
 * wrapped in a `<span class="shell-symbol">` element.
 *
 * Maybe, rather than re-processing the code with `shellwords`,
 * we could remove all `<span class="shell-symbol">` elements?
 * This might be more robust, as it rather than just replacing `$`
 * characters, it might let us leverage parsing of the snippet
 * that our highlighting library has already done for us.
 */

/**
 * Given a snippet of code,
 * process it based on the detected language,
 * returning a modified snippet that has is
 * more suited to direct execution
 * @param {string} snippet
 */
function processSnippet(snippet) {
  const isShell = snippet.split('\n')[0].startsWith('$ ')
  return isShell ? parseShellSnippet(snippet) : snippet
}

/**
 * Given a snippet of shell code that begins with `$ `,
 * return the snippet with all non-executable shell-symbols removed
 * @param {string} snippet
 */
function parseShellSnippet(snippet) {
  const firstLine = snippet.split('\n')[0]
  // Is this shell snippet multiline?
  const isMultiLine = firstLine.endsWith('\\') || firstLine.endsWith('EOF')
  // If not multiline, return the single line snippet with leading '$ ' removed
  if (!isMultiLine) return firstLine.replace('$ ', '')
  // Else, return the multiline snippet formatted with shellwords escape & split
  const multiLineFmt = shellwords.escape(snippet).replace('\\$\\', '')
  return shellwords.split(multiLineFmt)
}

export default processSnippet
