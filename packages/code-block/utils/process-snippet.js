import shellwords from 'shellwords'

/**
 * Given a snippet of code,
 * process it based on the detected language,
 * returning a modified snippet that has is
 * more suited to direct execution
 * @param {string | null} [snippet]
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
  // @TODO - re-assess use of shellwords.split() here. What are we trying to accomplish?
  // It seems this splits commands into distinct tokens - but we want to copy all
  // tokens of the command in their original format, don't we?
  // ref: https://github.com/jimmycuadra/shellwords (really light on docs)
  // ref: https://ruby-doc.org/stdlib-1.9.3/libdoc/shellwords/rdoc/Shellwords.html (ruby module of same name, has better docs)
  // asana task: https://app.asana.com/0/1100423001970639/1199504357822173/f
  return shellwords.split(multiLineFmt).join(' ')
}

export default processSnippet
