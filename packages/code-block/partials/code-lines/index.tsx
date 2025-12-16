/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

/**
 * Note: lines of code are expected to be stable. If we need to work with
 * dynamic code blocks in the future, we could assign random unique IDs
 * to each line during the `linesOfCode` `useMemo` function.
 *
 * For now, we disable react/no-array-index key for the entire file.
 */
/* eslint-disable react/no-array-index-key */

import React, { PropsWithChildren, ReactElement, useMemo } from 'react'
import classNames from 'classnames'
import parseHighlightedLines from '../../utils/parse-highlighted-lines'
import splitJsxIntoLines from './utils/split-jsx-into-lines'
import splitHtmlIntoLines from './utils/split-html-into-lines'
import s from './code-lines.module.css'

interface CodeLinesProps {
  code: string | ReactElement
  language?: string
  lineNumbers?: boolean
  highlight?: string
  hasFloatingCopyButton?: boolean
  wrapCode?: boolean
}

/**
 * Render the provided code into separate line elements,
 * accounting for all provided options.
 */
function CodeLines({
  code,
  language,
  lineNumbers,
  highlight,
  hasFloatingCopyButton,
  wrapCode,
}: CodeLinesProps) {
  // Parse out an array of integers representing which lines to highlight
  const highlightedLines = parseHighlightedLines(highlight) as number[]

  /**
   * Split the incoming code into lines.
   * We need to do this in order to render each line of code in a
   * separate element, which is necessary for features such as highlighting
   * specific lines and allowing code to wrap.
   */
  const linesOfCode = useMemo(() => {
    const isHtmlString = typeof code === 'string'
    const lineElements = isHtmlString
      ? splitHtmlIntoLines(code)
      : splitJsxIntoLines(code)
    const lineCount = lineElements.length
    const padLevel = Math.max(lineCount.toString().length, 1)
    return lineElements.map((children, index) => {
      const number = index + 1
      const numberPadded = number.toString().padEnd(padLevel)
      const highlight = highlightedLines.indexOf(number) !== -1
      const dim = highlightedLines.length > 0 && !highlight
      return { children, number: numberPadded, highlight, dim }
    })
  }, [code, highlightedLines])

  // When rendering wrapped code with line numbers shown, we need a spacer value
  // that matches the padding inset of all other line numbers
  let numberSpacer: string | null = null
  if (lineNumbers) {
    const padLevel = Math.max(linesOfCode.length.toString().length, 1)
    numberSpacer = ''.padEnd(padLevel)
  }

  // When the floating copy button is present, we add padding to many lines
  const padRight = Boolean(hasFloatingCopyButton)

  if (wrapCode) {
    /**
     * For wrapped code, we use a single-column flex layout.
     * Lines of code are stacked in a single container, and each line row renders
     * its own line number, which ensures that when lines wrap, the line numbers
     * are aligned as expected
     */
    return (
      <PreCode language={language}>
        <div className={s.wrappedLinesContainer}>
          <WrappedLinesSpacer number={numberSpacer} padRight={padRight} />
          {linesOfCode.map(({ number, children, highlight, dim }, idx) => (
            <div className={s.wrappedLine} key={idx}>
              {lineNumbers ? (
                <LineNumber {...{ number, highlight, dim }} wrap />
              ) : null}
              <LineOfCode {...{ highlight, dim, padRight }} wrap>
                {children}
                {'\n'}
              </LineOfCode>
            </div>
          ))}
          <WrappedLinesSpacer number={numberSpacer} padRight={padRight} />
        </div>
      </PreCode>
    )
  } else {
    /**
     * For overflowing code, we use a two-column layout.
     * The first column contains line numbers, and is effectively fixed.
     * The second column contains the lines themselves, and is an overflow
     * container to allow extra long lines to scroll as needed.
     */
    return (
      <PreCode language={language}>
        {lineNumbers ? (
          <span className={s.numbersColumn}>
            {linesOfCode.map(({ number, highlight, dim }, idx) => (
              <LineNumber key={idx} {...{ number, highlight, dim }} />
            ))}
          </span>
        ) : null}
        <span className={classNames(s.linesColumn, s.styledScrollbars)}>
          <span className={s.linesScrollableContent}>
            {linesOfCode.map(({ children, highlight, dim }, idx) => (
              <LineOfCode key={idx} {...{ highlight, dim, padRight }}>
                {children}
                {'\n'}
              </LineOfCode>
            ))}
          </span>
        </span>
      </PreCode>
    )
  }
}

/**
 * Set up the `<pre>` + `<code>` container
 * which is necessary for language-specific syntax highlighting styles
 */
function PreCode({
  children,
  language,
}: PropsWithChildren<{ language?: string }>) {
  return (
    <pre className={classNames(s.pre, `language-${language}`)}>
      <code className={classNames(s.code, `language-${language}`)}>
        {children}
      </code>
    </pre>
  )
}

/**
 * Provides "padding" at the top and bottom of a code block with wrapping lines
 * while retaining the "numbers" and "lines" separation border.
 *
 * For context, with wrapped code, we don't have separate "numbers" and "lines"
 * columns as we would with overflowing code. So, we can't add padding
 * to those columns as we do with overflowing code.
 *
 * To create padding-equivalent space, while also rendering a continuous border
 * between the "numbers" and "lines" columns, we use this component,
 * which is essentially and empty line of code that's been shortened a bit.
 */
function WrappedLinesSpacer({
  number,
  padRight,
}: {
  number: string | null
  padRight: boolean
}) {
  return (
    <div className={s.wrappedLinesSpacer}>
      {number ? <LineNumber number={number} wrap /> : null}
      <LineOfCode padRight={padRight}>{'\n'}</LineOfCode>
    </div>
  )
}

/**
 * Renders a line number.
 *
 * Note the `number` is rendered in monospace in a whitespace-sensitive way,
 * so that if a padded string is passed, we can allow for table-like alignment
 * of line numbers, and consistent horizontal width of numbers across all lines.
 */
function LineNumber({
  number,
  highlight,
  dim,
  wrap,
}: {
  number: number | string
  highlight?: boolean
  dim?: boolean
  wrap?: boolean
}) {
  return (
    <span
      className={classNames(s.LineNumber, {
        [s.highlight]: highlight,
        [s.dim]: dim,
        [s.wrap]: wrap,
      })}
    >
      {number}
    </span>
  )
}

/**
 * Renders a line of code
 */
function LineOfCode({
  children,
  highlight,
  dim,
  padRight,
  wrap,
}: PropsWithChildren<{
  highlight?: boolean
  dim?: boolean
  padRight?: boolean
  wrap?: boolean
}>) {
  return (
    <span
      className={classNames(s.LineOfCode, {
        [s.highlight]: highlight,
        [s.dim]: dim,
        [s.padRight]: padRight,
        [s.wrap]: wrap,
      })}
    >
      {children}
    </span>
  )
}

export default CodeLines
