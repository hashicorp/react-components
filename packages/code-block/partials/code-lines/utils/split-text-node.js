function splitTextNode(string) {
  const noNewlines = string.indexOf('\n') === -1
  if (noNewlines) return [string]
  // if the string is literally just a newline,
  // then return a newline to avoid messy logic later
  if (string === '\n') return [string]
  // split into parts on newlines,
  // and interleave the resulting array with newlines
  const parts = string.split('\n')
  for (let i = parts.length - 1; i > 0; i--) {
    parts.splice(i, 0, '\n')
  }
  // filter out empty strings, no point in rendering these
  const filteredParts = parts.filter((p) => p !== '')
  // return the array
  return filteredParts
}

export default splitTextNode
