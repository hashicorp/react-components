import { Children, cloneElement } from 'react'
import splitTextNode from './split-text-node'

function surfaceNewlines(tokens, depth = 0) {
  const tokensArray = Children.toArray(tokens)
  return tokensArray.reduce((acc, token, tokenIdx) => {
    // return text tokens
    const isTextToken = typeof token === 'string'
    if (isTextToken) return acc.concat(splitTextNode(token))
    // otherwise, assumed to be a JSX token.
    // We must process JSX tokens' children
    const processedChildren = surfaceNewlines(token.props.children, depth + 1)
    const processedTokens = processedChildren.reduce(
      (acc, child, childIdx) => {
        // Set up a unique value to be used as a key for this child
        // (included "codeLines" in key to make this easier to trace if
        // it does happen to cause issues somehow)
        const uniqueKey = `codeLines.${depth}.${tokenIdx}.${childIdx}`
        // On newlines, wrap up the current ancestor, and start a new one
        const isNewline = child === '\n'
        if (isNewline) {
          // If there are any, push grouped (non-newline) tokens
          // wrapped in the parent element
          if (acc.currentGroup.length > 0) {
            const processedToken = cloneElement(token, {
              children: acc.currentGroup,
              key: uniqueKey,
            })
            acc.tokens.push(processedToken)
          }
          // Reset the non-breaking children
          acc.currentGroup = []
          // Push the newline text token, and continue
          acc.tokens.push(child)
          return acc
        }
        // All other tokens are guaranteed to not contain newlines,
        // as we've done a depth-first traversal using surfaceNewLines.
        // We avoid creating duplicative parent elements by grouping
        // these tokens together
        acc.currentGroup.push(child)
        // If this is the last child, we need to ensure
        // the currentGroup is rendered
        if (childIdx == processedChildren.length - 1) {
          const processedToken = cloneElement(token, {
            children: acc.currentGroup,
            key: uniqueKey,
          })
          acc.tokens.push(processedToken)
        }
        return acc
      },
      { tokens: [], currentGroup: [] }
    ).tokens
    return acc.concat(processedTokens)
  }, [])
}

export default surfaceNewlines
