import React from 'react'
import CodeBlock from '..'
import CodeTabs from '../partials/code-tabs'
import CodeBlockConfig from '../partials/code-block-config'
import normalizePlainCode from '../utils/normalize-plain-code'
import classNames from 'classnames'
import s from './style.module.css'

const DEFAULT_THEME = 'dark'
const IS_DEV = process.env.NODE_ENV !== 'production'

export function pre({ children, hasBarAbove }) {
  // For use cases in code tabs, return children directly in a fragment,
  // passing on the hasBarAbove prop
  if (hasBarAbove) {
    const childrenWithProps = React.Children.toArray(children).map((child) => {
      return React.cloneElement(child, { hasBarAbove })
    })
    return <>{childrenWithProps}</>
  }
  // In all other cases, ie plain fenced code, add margin
  return <div className={s.codeMargin}>{children}</div>
}

export function code({
  children,
  className,
  metastring,
  hasBarAbove,
  theme = DEFAULT_THEME,
}) {
  // Non-highlighted code, which appears when children are a string,
  // needs to have its HTML entities escaped.
  // Highlighted code is not affected.
  const code = normalizePlainCode(children)
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
      className={className}
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

export function CodeBlockWithMargin({ theme = DEFAULT_THEME, ...rest }) {
  return (
    <CodeBlock
      className={classNames({ [s.codeMargin]: !rest.hasBarAbove })}
      {...rest}
      theme={theme}
    />
  )
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
    code: function themedCode(p) {
      return code({ theme, ...p })
    },
    CodeBlock: function themedCodeBlock(p) {
      return CodeBlockWithMargin({ theme, ...p })
    },
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
