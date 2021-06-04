// import surfaceNewlines from './surface-newlines'
import { Children } from 'react'

function splitJsxIntoLines(codeJsx) {
  // Newlines should appear at the top level only,
  // in MDX contents we achieve this via a rehype plugin
  const withSurfacedNewlines = Children.toArray(codeJsx)
  // Filter out any surfaces newlines, that are "in between"
  // other lines of code. Special exceptions should be made for:
  // 1. newlines at start or end of array - should be rendered as blank lines
  // 2. consecutive newlines - "n" consecutive newlines should be rendered
  //    as "n - 1" blank lines.
  const accumulatedLines = withSurfacedNewlines.reduce(
    (acc, token, idx) => {
      const isLastLine = idx === withSurfacedNewlines.length - 1
      const isNewline = token === '\n'
      const isInlineToken = token !== '\n'
      // For newlines, increment the consecutive newline counter
      if (isNewline) acc.consecutiveNewlines++
      // If this token is an inline token, and we have
      // pending newlines, then start a new line,
      // adding blank lines for consecutive newlines as needed
      const isFinalNewline = isNewline && isLastLine
      const hasNewlines = acc.consecutiveNewlines > 0
      const needsNewlines = (isInlineToken || isFinalNewline) && hasNewlines
      if (needsNewlines) {
        acc.lines.push(acc.currentLine)
        for (let i = 1; i < acc.consecutiveNewlines; i++) {
          acc.lines.push('')
        }
        acc.currentLine = []
        acc.consecutiveNewlines = 0
      }
      // If this token is an inline token,
      // append it to the current line
      if (isInlineToken) {
        acc.currentLine.push(token)
        // If this is the last line,
        // then ensure the current line
        // has been pushed to the lines array
        if (isLastLine) acc.lines.push(acc.currentLine)
      }
      return acc
    },
    { lines: [], currentLine: [], consecutiveNewlines: 0 }
  )
  return accumulatedLines.lines
}

export default splitJsxIntoLines
