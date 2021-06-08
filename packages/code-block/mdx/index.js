import React from 'react'
import CodeBlockRaw from '..'
import CodeTabsRaw from '../partials/code-tabs'
import CodeBlockConfigRaw from '../partials/code-block-config'
import normalizePlainCode from '../utils/normalize-plain-code'
import classNames from 'classnames'
import s from './style.module.css'

const DEFAULT_THEME = 'dark'
const IS_DEV = process.env.NODE_ENV !== 'production'

export function pre({ children, hasBarAbove }) {
  // For use cases in code tabs, return children directly in a fragment
  if (hasBarAbove) return <>{children}</>
  // In all other cases, ie plain fenced code, add margin
  return <div className={s.codeMargin}>{children}</div>
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
  const code = normalizePlainCode(children)
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

export function CodeBlock({ theme = DEFAULT_THEME, ...rest }) {
  return (
    <CodeBlockRaw
      className={classNames({ [s.codeMargin]: !rest.hasBarAbove })}
      {...rest}
      theme={theme}
    />
  )
}

export function CodeBlockConfig({ theme = DEFAULT_THEME, ...rest }) {
  return (
    <CodeBlockConfigRaw
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
      return CodeBlock({ theme, ...p })
    },
    CodeBlockConfig: function themedCodeBlockConfig(p) {
      return CodeBlockConfig({ theme, ...p })
    },
    CodeTabs: function themedCodeTabs(p) {
      return CodeTabs({ theme, ...p })
    },
    pre: function themedPre(p) {
      return pre({ theme, ...p })
    },
  }
}
