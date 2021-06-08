import React, { Children } from 'react'
import CodeBlock from '../../index.js'
import normalizePlainCode from '../../utils/normalize-plain-code'

function CodeBlockConfig({
  className,
  children,
  filename,
  heading,
  hideClipboard,
  highlight,
  lineNumbers,
  theme,
}) {
  // Ensure there is exactly one valid child element
  const validChildren = Children.toArray(children)
  const childCount = Children.count(children)
  if (childCount !== 1 || validChildren.length !== 1) {
    throw new Error(
      `In CodeBlockConfig, found ${childCount} total children and ${validChildren.length} valid children. Please ensure that CodeBlockConfig has exactly one child element, and ensure it is a valid.`
    )
  }
  // Validate that the first child is a code block
  const onlyChild = validChildren[0]
  const childType = onlyChild.props.mdxType || onlyChild.type
  if (childType !== 'pre') {
    throw new Error(
      `In CodeBlockConfig, found a child with type ${childType}. Please ensure a fenced code block, which corresponds to the MDX type "pre", is passed to CodeBlockConfig instead.`
    )
  }
  // Extract the language and code from the block
  const languageClass = onlyChild.props.className
  const language = languageClass
    ? languageClass.replace('language-', '')
    : undefined
  const codeChildren = onlyChild.props.children.props.children
  const code = normalizePlainCode(codeChildren)

  // Render the code block, using options passed to CodeBlockConfig
  return (
    <CodeBlock
      className={className}
      code={code}
      language={language}
      theme={theme}
      options={{
        filename,
        highlight,
        heading,
        lineNumbers,
        showClipboard: !hideClipboard,
      }}
    />
  )
}

export default CodeBlockConfig
