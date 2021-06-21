import React from 'react'
import CodeBlock from '..'
import CodeTabs from '../partials/code-tabs'
import CodeBlockConfig from '../partials/code-block-config'
import normalizePlainCode from '../utils/normalize-plain-code'
import classNames from 'classnames'
import s from './style.module.css'

const DEFAULT_THEME = 'dark'
const IS_DEV = process.env.NODE_ENV !== 'production'

export function pre({
  children,
  className,
  metastring,
  hasBarAbove,
  theme = DEFAULT_THEME,
}) {
  // Assert that there is exactly one valid child
  const childArray = React.Children.toArray(children)
  if (childArray.length !== 1) {
    throw new Error(
      `Found <pre> element in MDX with more than one child: ${JSON.stringify(
        childArray
      )}. Ensure <pre> and fenced code blocks contain text elements only.`
    )
  }
  // Assert that the one valid child is a <code> element
  const codeChild = childArray[0]
  if (codeChild.props.mdxType !== 'code') {
    throw new Error(
      `Found <pre> element in MDX with more non-<code> child: ${JSON.stringify(
        codeChild
      )}. Ensure <pre> and fenced code blocks contain text elements only.`
    )
  }
  const codeTokens = codeChild.props.children
  // Non-highlighted code, which appears when children are a string,
  // needs to have its HTML entities escaped.
  // Highlighted code is not affected.
  const code = normalizePlainCode(codeTokens)
  // We determine whether to showClipboard from the hideClipboard metastring
  const hideClipboard = metastring && metastring.includes('hideClipboard')
  // Deprecation warning for hideClipboard in metastring
  // Note: the hideClipboard metastring option is currently only used on Learn.
  // The next major version of code-block should remove support for this option,
  // and throw an error here instead of a warning (even when IS_DEV == false)
  if (hideClipboard && IS_DEV) {
    console.warn(
      `The hideClipboard option on fenced code metastring is deprecated. Please wrap your fenced code in <CodeBlockConfig hideClipboard> instead.`
    )
  }
  // We parse the language from the className, which our
  // rehype-prism plugin adds.
  const language = className ? className.replace('language-', '') : undefined
  return (
    <CodeBlock
      className={classNames(className, { [s.codeMargin]: !hasBarAbove })}
      code={code}
      language={language}
      options={{ showClipboard: !hideClipboard }}
      theme={theme}
      hasBarAbove={hasBarAbove}
    />
  )
}

export function CodeTabsWithMargin({ theme = DEFAULT_THEME, ...props }) {
  return <CodeTabs className={s.codeMargin} {...props} theme={theme} />
}

export function CodeBlockConfigWithMargin({ theme = DEFAULT_THEME, ...rest }) {
  return (
    <CodeBlockConfig
      className={classNames({ [s.codeMargin]: !rest.hasBarAbove })}
      {...rest}
      theme={theme}
    />
  )
}

export default function codeMdxPrimitives({ theme = DEFAULT_THEME } = {}) {
  return {
    CodeBlockConfig: function themedCodeBlockConfig(p) {
      return CodeBlockConfigWithMargin({ theme, ...p })
    },
    CodeTabs: function themedCodeTabs(p) {
      return CodeTabsWithMargin({ theme, ...p })
    },
    pre: function themedPre(p) {
      return pre({ theme, ...p })
    },
  }
}
