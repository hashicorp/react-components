import React from 'react'
import CodeBlockRaw from '..'
import CodeTabsRaw from '../partials/code-tabs'
import CodeBlockConfigRaw from '../partials/code-block-config'
import classNames from 'classnames'
import s from './style.module.css'

const DEFAULT_THEME = 'dark'
const IS_DEV = process.env.NODE_ENV !== 'production'

export function inlineCode(props) {
  return <code className={s.inlineCode} {...props} />
}

export function pre({ children, className, isNested }) {
  // For direct use cases, ie plain fenced code, add margin
  if (!isNested) return <div className={s.codeMargin}>{children}</div>
  // For other use cases, ie in code tabs, forward className to
  // children, and do not add margin
  const childrenWithClassName = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { className })
    }
    return child
  })
  return <>{childrenWithClassName}</>
}

export function code({
  children,
  className,
  metastring,
  theme = DEFAULT_THEME,
}) {
  // Non-highlighted code, which appears when children are a string,
  // seems to have an extra trailing newline. We remove it.
  // Highlighted code is not affected.
  const code =
    typeof children == 'string' ? children.replace(/\n$/, '') : children
  // We determine whether to showClipboard from the hideClipboard metastring
  const hideClipboard = metastring && metastring.includes('hideClipboard')
  /* @TODO add deprecation warning for hideClipboard in metastring */
  if (hideClipboard && IS_DEV) {
    console.warn(
      `The hideClipboard option on fenced code metastring is deprecated. Please wrap your fenced code in <CodeBlockConfig hideClipboard> instead.`
    )
  }
  // We parse the language from the className, which our
  // rehype-prism plugin adds.
  const language = className ? className.replace('language-', '') : undefined
  return (
    <CodeBlockRaw
      className={className}
      code={code}
      language={language}
      options={{ showClipboard: !hideClipboard }}
      theme={theme}
    />
  )
}

export function CodeTabs({ theme = DEFAULT_THEME, ...props }) {
  return <CodeTabsRaw className={s.codeMargin} {...props} theme={theme} />
}

export function CodeBlock({ className, theme = DEFAULT_THEME, ...rest }) {
  return (
    <CodeBlockRaw
      className={classNames(s.codeMargin, className)}
      {...rest}
      theme={theme}
    />
  )
}

export function CodeBlockConfig({ theme = DEFAULT_THEME, ...props }) {
  return (
    <CodeBlockConfigRaw className={s.codeMargin} {...props} theme={theme} />
  )
}

export default function codeMdxPrimitives({ theme = DEFAULT_THEME } = {}) {
  return {
    code: function themedCode(p) {
      return code({ ...p, theme })
    },
    CodeBlock: function themedCodeBlock(p) {
      return CodeBlock({ ...p, theme })
    },
    CodeBlockConfig: function themedCodeBlockConfig(p) {
      return CodeBlockConfig({ ...p, theme })
    },
    CodeTabs: function themedCodeTabs(p) {
      return CodeTabs({ ...p, theme })
    },
    inlineCode,
    pre: function themedPre(p) {
      return pre({ ...p, theme })
    },
  }
}
